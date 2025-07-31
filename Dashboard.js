import React, { useState, useEffect } from 'react';
import axios from 'axios'; //helps make request to the backend like talk to the ai and return its repsonse to the frontend 
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ProgressRing({ radius, stroke, progress }) {
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}> {/*make an svg box like a plain canvas, height and width being radious times 2 means the circle will be centerd in the box*/}
      <circle
        stroke="#eee" //circle outline
        fill="transparent" //nothing inside circle
        strokeWidth={stroke} //how thick the outline is, we want it to be the same, basically default
        r={normalizedRadius} //makes the radius of the circle a little smaller so the outline stroke can fit inside the circle
        cx={radius} //the center of the circle is the radious, so the middle of the svg is hte center of the circle *
        cy={radius}
      />
      <circle //this is the progress ring*
        stroke="#4caf50"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + ' ' + circumference} //the ring this long, the full circumfernece, this will allow of to control how mucnb of rht ecircle is shown
        style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.35s' }} //hides part of the ring, lower values = more filled
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%" //circle positioning
        y="40%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="1.5rem"
        fill="#37474F"
        marginTop=  '2'
      >
        <tspan x="50%" dy="0">{progress}%</tspan>
        <tspan x="50%" dy="1.2em">Completed</tspan>
      </text>
    </svg>
  );
}


function Dashboard() {
  
const [messages, setMessages] = useState([]); //creates variable messages, starts saving with no message so it doesnt render the syste=m message 
const [input, setInput] = useState(''); //tracks when the user types in the text box, the input value is what was in the textbox before, so we start with '' becasue there is nothing to store in memory yet, but it gets updated live as user texts,
const [isLoading, setIsLoading] = useState(false); //Keeps track of if ai is thinking, at first the ai is not loading, byt when it is thinking the state then becomes true 
const newMessage = { from: 'user', text: input }; //store what user just typed, create it as objects that need a from and a text 
const updatedMessages = [...messages, newMessage]; //made the updated message it sends to the ai everything plus what was said before 
const [plan, setPlan] = useState('')
useEffect(() => {
  setPlan(localStorage.getItem('plan'))})

 const [newAiText, setNewAiText] = useState('')  //the aitext that we made for the current reponse that comes from the is apart of the handlesend function but we want it to be a globally stored variable
     const planTrigPhrase = "Use this plan"
  const navigate = useNavigate();
  const [showPlanButton, setShowPlanButton] = useState(false)
    const parsedExercises = [] //tracks all parsed exercise objetcs
    let currentExercise = null //exercises currently being built by the code, what is being parsed, let is a variable that can be changed, not like a constant, right now there is nothing being parsed, it will hold the title and instructions of the exercise being built
    let collectingInstructions = false //this helps the code know that it can keep going after a certain line while its collecting instructions bevause sometimes the instructions are not just one line 
    let instructionsLines = [] //this is where we will store each line when we are on a certain set of instructions 
    const lines = plan.split('\n') //the ai writes in \n when it seperates the lines in the plan, ex it seperates the ttile and the instructions on its own, we are looking for that line break the ai uses, and were naming each thing that is split on either side a line
    lines.forEach(line => { //line is a temporary variablke tnat reporesents what line the code is on 
        const exerciseTitleMatch = line.match(/^Exercise:\s*(.+)$/i) //checks if line starts wwith a exercise and colonm see if there is a space, and then it captures everything afte and including the exercise title
       
        if (exerciseTitleMatch) {
            collectingInstructions = false
            instructionsLines = [] //resets the instructions being collected at the moment 
            if (currentExercise) parsedExercises.push(currentExercise); //so if you are alredy in a current exercise, push whatever is stored in the current exercise into the parsede xercise array first, its saying if it sees another title while its still looking at instruction lines then save everything before 
            
            currentExercise = { //now that we have saved everything before we want to start a new exercise, this holds the exercise we are working on at the moment 
                title: exerciseTitleMatch[1].trim(), //use the first mathced group as the title, the first group is after the Exercise: and the space, the first group is (.+), that is being saved as the title, extra space if removed 
                instructions: '' //start instructions with an empty string 
            };
        } else if (currentExercise && line.toLowerCase().startsWith('instructions:')) { //if we are on a line that does not match the title but the line does start with the word instruction 
        collectingInstructions = true
           instructionsLines = [line.trim()]
           currentExercise.instructions= instructionsLines.join('\n');} //makes the instrcutions value all the lins oput together as one lone string
        
         else if (collectingInstructions) {
            if (line.trim().toLowerCase().startsWith('Overview') || line.toLowerCase().includes('use this plan')  || line.toLowerCase().includes('')) {
                collectingInstructions = false;}
            else {instructionsLines.push(line.trim())}}})
     

    if (currentExercise) {
        currentExercise.instructions = instructionsLines.join('\n'); //make sure you add the instructio lines that were oushged to instruction lins end up in the actual exercise because the part of out code only does that when we see the word instructions 
        parsedExercises.push(currentExercise);}//so when we are done with the loop of counting lines, where there are no more lines to count, we make sure to still save what was left in the current exercise to the parsed exercicses 
    
    const [completedExercises, setCompletedExercises] = useState(() =>{   //this type of initializer means the function will only run once the first component loads, only runs the first time the page is set up, not rerendering every time, it never runs the function again of pulling stuff unless the pahe is relaoded 
        const saved = localStorage.getItem('completedExercises')  //this is trying to pull saved data from the browsers local memormy, stuff that was saved from the past session 
        return saved ? JSON.parse(saved) : []}) //if saves stuff is found, turn it from a string of text into an object, if nothing is found, start with an ampty object as the beggining value of the completedexercises, it starts as an array 
    
    useEffect(() => {   //every time the completed exercise changes run the code inside 
        localStorage.setItem('completedExercises', JSON.stringify(completedExercises))}, [completedExercises]) //saves info to the browser local storage called completexersizes, we want to turn it all into a string for local storage, everytime CompletedExercies changes we run the code
    
    const [dailyStreak, setDailyStreak] = useState(3) //hardcoded daily streak for now 
    
    const total = parsedExercises.length //the length of the array that holds all the "current exercises" as arrays 
    const done = completedExercises.length //counts how many exercises total the user has check off, how many values are in that array 
    const progressPercent = total === 0 ?0 : Math.round((done/total)*100) //if there are no exercises then return 0, if there are, then devide the amount done by the amount of exercises 

    function toggleCompleted(index) {  //this is a function that takes an index(the exercises position in a list), it doesnt really care about the exercise name, its more simple 
        if (completedExercises.includes(index)){   //if it has the index value in the list we are passing in, as in if we are toggling something that is already in the list 
            setCompletedExercises(completedExercises.filter(i => i !== index))  //filter creates a new array with the everything that was in the complete exercises array but onluy with the values that satisfy the index, i (item) when i does not equal index, so it keeps every item except the index, this is for when something is unchecked, it takes it out of the completed array 
        }else {
            setCompletedExercises([...completedExercises, index])} //if the index is not in the list, then we want to add it, so all the values of indexes before plus the new index 
    }

     const systemMessage = { //first message sent to start up the ai 
        role: 'system', //a key (label or name) that we made and the value is system, not java but something the ai expects, ai expects messages in the format role:, content:
        content: `You are an ai physical therapist. Do not use Markdown formatting of any kind. No asterisks (*), no hashtags (#), no bold text, and no bullet points. Use only plain text." A user asked you to provide a workout plan to help them with pain in their body. The plan you made for them was based on questions they answered,like where their pain was, how bad is it, etc. This is the plan you gave them based on the information you received, ${plan}. Your first prompt should be something along the lines of Hey there! My name is PhyTher, I am your AI physical therapist. I am not a professional, so if you need real medical advice, contact a doctor, or for emergencies, call 911. How would you like me to help? I can change the plan or give you some tips on some of the exercises. This is all you say until the user responds no matter what. The user may ask you to make changes to the plan or give them some advice on how to do certain exercises. That is all you say in the first prompt, nothing else. If they ask you to change any part of the plan, you will make the changes they ask and send the new plan in the same format with the same number of workouts unless they ask for less workouts. If they ask to remove a workout, replace it with a different one. Make sure you do not include any asterisks (*) at all or hashtags(#) in any message that you send. After the last workout instruction for the message with the updated plan, start the next line with 'overview:'. Then, tell the user: If you like this plan, please press the button below titled ‘Use this plan’ which will take you to your recovery dashboard. If you would like me to make any changes to this plan, please say so in the chat box. (only display this message after you have received the user prompt and given them a new plan) When giving responses, write it in plain, friendly language without using Markdown (like **bold** or ### headers). Do not use asterisks *, hashtags #, or bullet points, this is very important. DO NOT DO THIS Exercise: **Seated Rows**. It should be written like this Exercise: Seated Row. Write clear sentences for each step and separate each exercise with a blank line. If the exercise you ask them to do in either the recovery or the evaluation requires equipment, make sure you tell the user they may request a different exercise if they do not have the equipment. Make sure you say the name of the button (use this plan) is in your final sentence. Make sure you don't just say do exercises but you tell the user what exercises to do with instructions (same format as previous plan). You do not need to send the previous plan in the first message you send (your response to this), if you are asked to change the plan only send the new version`

    };

    useEffect(() => { //as soon as the page appears run this code 
        sendSystemMessage(); //this makes it so that as soon as the system loads it sends the system message which is the role and content 
        }, []); //[]this means only run once when the page appeared, if we put varibales in this it would rerun everytime the veribales changed and would send the system message again

    
    
        const sendSystemMessage = async () => { //new constant sendsystemMessage, then being assigned to function, async means that their will be an await inside, we need async to use await, and await is needed to wait for a reply from the ai backend, we want something to 
        setIsLoading(true); //while we wait on a reply, so right when we send the message we make it so that the ai is thinking 
        
        
        try {  //basicallt means try to run this code and if rthere is an error, catch it and handle it, if it breaks dont crash try to handle it properly
            const response = await axios.post('http://localhost:3001/chat', {  //sends a post request (just like a letter of info) to the backend at that link, await is basically wait for the response to come back from this post ions 
            messages: [systemMessage]}); //this is the data we are sending inside the post, server expects data in this format, an object with a key 
            const aiReply = response.data.reply; //pulls the reply from the ai backend, generated by openAI
            const aiText = aiReply.content; //this is the content of that reply
        setMessages(prev => [...prev, { from: 'ai', text: aiText }]); //set the message to all he previous messaghes (stored in the UseState, and then add the key value pair whihc is from ai and then its reply which is the text)
            }    
    
        
        catch (error) { //if soemthing goes wrong 
            console.error('Error sending system message:', error); //if the error is from the console so from the user then say error sending message 
            setMessages(prev => [...prev, { from: 'ai', text: "Sorry, I couldn't get a response from the server." }]); //if a message couldnt be sent to the backend then add the text bubble that the ai couldnt get a response
                    }
        finally {
            setIsLoading(false); //runs no matter what, work or fail, whemn the response comes back, stop displaying the thinking thing 
                }
        };

    const handleSend = async () => { //new const handlesned, when send button is pressed, needs asysn cs of rhe await, basicallt tells java that this function might pause, async tell it the function can wait for things 
    
        if (!input.trim()) return; //if the input is empty do nothing 
        setMessages(updatedMessages); //make the messgages the updated message with the new messages and previous
        setIsLoading(true); //make it say thinking until we get a response from the backend 
        setInput(''); //clear the input box for what the person can type next
        try { //meant to handle error safely 
            const fullMessages = [  //a new constant that has the entire chat history to send to the ai becaus the ai doesnt remember previous chats on its own
            systemMessage, ...updatedMessages  //start with the system message, then add updated message which is all theopld messages and the new messages
            .filter(msg => typeof msg.text === 'string' && msg.text.trim() !== '') //skip any weird/null/empty phrases 
            .map(msg => ({ //format all messages in the full messages constant the way openai wants role: and content:
                role: msg.from === 'user' ? 'user' : 'assistant', //if the msg and the text inside is from the user then its user if not then its the assirtant 
                content: msg.text //content us the message 
            }))
            ];
            const response = await axios.post('http://localhost:3001/chat', { messages: fullMessages });
            const aiReply = response.data.reply
            const aiText = aiReply.content
             setNewAiText(aiText) //makes the ai text globally stored so it can be used outside the function 

      setMessages(prev => [...prev, { from: 'ai', text: aiText }]); //sets the messages to everything plus the new ai reply 
       if (aiText.toLowerCase().includes(planTrigPhrase.toLowerCase())) { //makes sure the trigger quote matches 
        setShowPlanButton(true)}
       else {
            setShowPlanButton(false);}
    
    } catch (error) {
      console.error('Error talking to AI:', error);
      setMessages(prev => [...prev, { from: 'ai', text: "Sorry, I couldn't get a response from the server." }]); //same error catch as above 
    } finally {
      setIsLoading(false);}}
     
      const handleUsePlan = () => {
        localStorage.setItem('plan', newAiText)
        setCompletedExercises([])
        navigate('/dashboard')}
    
    
    
    
    
    return(
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif', flex: 1, padding: '2rem', overflowY: 'auto', background: 'linear-gradient(90deg, #1E90FF 0%, #D6E9FF 100%)', }}>
  
    
      <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'Arial, sans-serif', marginTop:'50px' }}>
       
       
       
       
       <div style= {{textAlign: 'center', fontSize:'20px'}}>
        <h2>Today's Workout</h2>
        </div>
 
        <div style={{ marginBottom: '1rem', fontWeight: 'bold', fontSize: '1.2rem', textAlign:'center'}}>
            Daily Streak: {dailyStreak} {dailyStreak === 1 ? 'day' : 'days'} 🔥  {/*if it equals 1 then day if not days*/}
        </div>

        {/* Progress Ring */}
         <div style={{  width: 120,
                        margin: '0 auto', 
                        marginTop: '1rem', 
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column', }}>
            <ProgressRing radius={90} stroke={10} progress={progressPercent} /> {/*progress is used a lot to make the circle character, its the same as progress percent which is done/total*100*/}
        </div>

    {/* Checklist of workouts */}
        <div style={{ marginTop: '20px'}}>
            {parsedExercises.length === 0 ? ( //if there were no exercises that were created, no titlematch at all, then there is no workout 
            <p>No workouts planned for today.</p>
        ) : (
            parsedExercises.map((exercise, index) => (  //go through each one and create a div for each that marks what each ones index is
             <div
                key={index}
                style={{
                border: '1px solid #ddd',
                borderRadius: 8,
                padding: '1rem',
                marginBottom: '0.8rem',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                backgroundColor: completedExercises.includes(index) ? '#e0ffe0' : 'white',  //if it is one that is completed then it is a diff color 
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
                }}
                onClick={() => toggleCompleted(index)}> {/* add the index to completed exercises if its already there then move it */}
            
            <input
              type="checkbox"
              checked={completedExercises.includes(index)} //the box will be checked if the index is in the array
              onChange={() => toggleCompleted(index)}  //same as pressing the entire object 
              style={{ marginRight: '1rem' }}
            />
            
                <div> {/* new division within the divisons created by the map function, for each one disple the title and instructions*/}
                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{exercise.title}</div>
                    <div style={{ fontSize: '0.9rem', color: '#555' }}>{exercise.instructions}</div>
                </div>
            </div>
        ))
      )}
        </div>
    </div>
    <div style={{
      flex: 1,
      borderLeft: '1px solid #ccc',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      maxWidth:'800px'
    }}>
      <Link to= "/" style={{ textDecoration: 'none'}}>
                <button  style= {{ 
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    background: 'linear-gradient(90deg, #1E90FF 0%, #D6E9FF 100%)',
                    color: 'white',
                    border: '2px solid #003366',
                    marginTop: '30px',
                    right: '1000px'}}>
                    Home
                </button>
            </Link>
      <h2>💬 Speak with PhyTher AI</h2>
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem' }}>
              <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginTop: '20px'}}>
        {messages.map((msg, i) => (
    
            <div
                key={i} //index 
                    style={{
                    display: 'flex',
                    justifyContent: msg.from === 'ai' ? 'center' : 'flex-end',
                    margin: '10px 0',}}>
               
                <div style={{backgroundColor: msg.from === 'ai' ? '#f0f0f0' : '#007bff',
                    color: msg.from === 'ai' ? 'black' : 'white',
                    padding: '40px 60px',
                    borderRadius: '20px',
                    display: 'inline-block',
                    maxWidth: '80%',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    lineHeight: '1.8',
                    maxWidth: msg.from === 'ai' ? '100%' : '80%',
                    width: msg.from === 'ai' ? 'fit-content' : 'auto',}}>
                        {msg.text}
                </div>
            </div>
        ))}
        
        {isLoading && (
            <div
                style={{
                textAlign: 'left',
                margin: '10px 0',
                fontStyle: 'italic',
                color: '#666'
            }}>
            PhyTher is typing...
            </div>
        )}

         {showPlanButton && (
                <button
                    onClick={handleUsePlan}
                    style={{
                    marginTop: '10px',
                    padding: '12px 20px',
                    fontSize: '16px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer', }}>
                    Use This Plan
                </button>
            )}
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <input 
                style={{
                    flex: 1,
                    padding: '10px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    border: '1px solid #ccc', }}
                type="text"
                value={input} //this "input" is used in the input and setInput variabke 
                onChange={e => setInput(e.target.value)}
                placeholder="Type your message"
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                disabled={isLoading}/>
        
            <button
                onClick={handleSend}
                disabled={isLoading}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: isLoading ? 'not-allowed' : 'pointer',}}>
                Send
            </button>
         </div>
            </div>
             
    </div>
  </div>
);
}
export default Dashboard