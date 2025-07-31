import React, { useState, useEffect, useRef, useContext} from 'react'; //usestate holds memory, useeffect lets us run code after compnent render everytime said variable changes, like updating us when a state changes, useref keeps like an x marked to a specific part of the page, ex ur page code can grab it and scroll
import { useLocation } from 'react-router-dom';  //lets us access data passed from one page to the next 
import axios from 'axios'; //helps make request to the backend like talk to the ai and return its repsonse to the frontend 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Recommendations() {  //new react component (resuable peice of code that defines a specific part of the UI) 
  
  
    const location = useLocation();  //grabs the location object that holds data from prev screens 
    const answers = location.state?.answers || {};  //checks the state in the grabed location variable, looks to see if there is something named anser if not it used an empty object to avoid errors
    const planTrigPhrase = "Use this plan"
    const [showPlanButton, setShowPlanButton] = useState(false)
    const [messages, setMessages] = useState([]); //creates variable messages, starts saving with no message so it doesnt render the syste=m message 
    const [input, setInput] = useState(''); //tracks when the user types in the text box, the input value is what was in the textbox before, so we start with '' becasue there is nothing to store in memory yet, but it gets updated live as user texts,
    const [isLoading, setIsLoading] = useState(false); //Keeps track of if ai is thinking, at first the ai is not loading, byt when it is thinking the state then becomes true 
    const newMessage = { from: 'user', text: input }; //store what user just typed, create it as objects that need a from and a text 
    const updatedMessages = [...messages, newMessage]; //made the updated message it sends to the ai everything plus what was said before 
    const [plan, setPlan] = useState('') //open the planxontext and give whats inside, whats inside is plan,setplan, so we make those constants, are grabbing those 2 things, basically uses the plan provider to access it
    const navigate = useNavigate(); //move between pages and know which ones are active 
    const [newAiText, setNewAiText] = useState('')  //the aitext that we made for the current reponse that comes from the is apart of the handlesend function but we want it to be a globally stored variable
  
    const answerSummary = Object.entries(answers) //turns answer into key value pairs, {"0":"knee", "1":"leg"} turns into [["0", "knee"]], key value pairs 
        .map(([index, value]) => `Q${parseInt(index) + 1}: ${value}`) //.map loops through the pairs everytime something is rendered, it continues to loop through all of them and when a new answer comes it turns the index/key (a string) into an integer adding one so its corrsponds with the question, and it lists out the value
        .join('\n'); //stitiches strings together, and seperates them line by line not just constant in a row, just makes it look better and readable for ai

  
    const systemMessage = { //first message sent to start up the ai 
        role: 'system', //a key (label or name) that we made and the value is system, not java but something the ai expects, ai expects messages in the format role:, content:
        content: `You are a professional and friendly AI Physical Therapist. Your goal is to evaluate how to help a user cure their pain in a certain area. Make sure you greet the user and tell them that you are not a professional and can make mistakes. Also, tell them that if it is an emergency, please call a real doctor or 911. Your name is PhyTher. The user has answered a few questions before visiting you, similar to a doctor office. The questions and their answers are: ${answerSummary}. The goal in the beginning is to asses what is going on with the patient and how you can help. With the information from these questions, you are to give them a few slight stretches or simple exercises. Make sure you actually give them simple exercises, not just a blank message. Everytime you give exercicses (in the evaluation or the plan) make sure it is in the format exercise:... \n instructions:. Then you will ask for their feedback on the gentle exercises to further evaluate their pain, ex how they felt or where they felt pain. You will then wait until the user responds with their feedback on the few simple exercises. After they provide feedback you will give them your analysis on what seems to be wrong and why they are experiencing pain, tightness, etc, You will then create them a recovery plan that they can follow for the next 2-3 weeks. This plan should be a list of exercises around 4 that have been specifically catered to their inital evaluation and their exercises feedback. Make sure you give an evaluation and say why the exercies will help them before you list the exerices for the 2-3 week plan. After the last workout instruction for the plan message start the next line with 'overview:'  At the end of the message for the plan you created, tell the user: If you like this plan, please press the button below titled ‘Use this plan’ which will take you to your recovery dashboard. If you would like me to make any changes to this plan, please say so in the chat box. (only display this message after you have recieved the user feedback) If asked to tweak the plan make sure you respond with a new plan based off what they asked. When giving responses, write it in plain, friendly language without using Markdown (like **bold** or ### headers). Do not use asterisks, hashtags, or bullet points. Instead, write clear sentences for each step and separate each exercise with a blank line. If the exercise you ask them to do in either the recovery or the evaluation requires equipment, make sure you tell the user they may request a different exercise if they do not have the equiptmement. Make sure you say the name of the button in your final sentance. Make sure you do not send the evaluation exercises and the plan exercises in the same message, wait for the user feedback first. Make sure you dont just say do exercises but you tell the user what exercises to do.`

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
        setPlan (newAiText)  //makes it so that the plan it that is stored in the PlanContext, that all compnents can access, it changes the plan that is stored to the aiText 
        navigate('/dashboard')
        localStorage.setItem('plan', newAiText)}
        localStorage.setItem('completedExercises', JSON.stringify([]));

    

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        fontFamily: 'Arial',
        backgroundColor: '#82CAFF',
        padding: '20px',
        boxSizing: 'border-box',
        textAlign: 'center',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: 'linear-gradient(90deg, #1E90FF 0%, #D6E9FF 100%)',
  }}>
       
        <div style ={{fontSize: '18px'}}> <h1>Chat with your AI Physical Therapist</h1>
            <div style={{ marginBottom: '30px' }}>
                <h3>Your Answers:</h3>
                  <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: '12px', 
                        marginTop: '10px',
                        textAlign:'center', 
                        justifyContent: 'center'}}>
                    {Object.entries(answers).map(([index, value]) => (
                       
                       <div key={index} style={{
                                    backgroundColor: '#f0f0f0',
                                    borderRadius: '8px',
                                    padding: '10px 15px',
                                    fontSize: '16px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                             <strong>Q{parseInt(index) + 1}:</strong> {value}
                        </div>
                ))}</div>
            </div>
        </div>
        
        
        <div style={{ marginTop: '0px', textAlign: 'center' }}>
            <Link to="/questions">
                <button style={{
                        padding: '0.75rem 1.5rem',
                        fontSize: '1rem',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        cursor: 'pointer' }}> Restart Questions
                </button>
            </Link>
        </div>
      
      
        <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            background: 'linear-gradient(90deg, #1E90FF 0%, #D6E9FF 100%)',
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
  );
}

export default Recommendations;

