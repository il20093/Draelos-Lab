import React, { useState, useEffect } from 'react'; // react allows components (reusable UI building blocks (ex button), usetate, add state(memory) to a component, ex remebering which question were on
import { Link } from 'react-router-dom'; //link lets users navigate without reloading the page 
import { ReactComponent as Svg } from './muscles_front_and_back_cleaned_for_react.svg' //reactcomponent turns the svg file into a react component 
import BodyDiagram from './BodyDiagram'; //bodydiagrm is custom react component (building block), contains logic to display an svg 
import { PlanContext } from './PlanContext'; 


function Questions() {  // functions are blocks of resuable code that preforms a task when called, when called the function ir run 
    const [isFocused, setIsFocused] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0) //const, a variable that cant be reasagned, current questions is a new state value (it can remeber stuff), set lets u update  
    const [answers, setAnswers] = useState ({}); // {} is an empty object, a container with no data yet, an object holds key-value pairs, answers starts as an empty object, [answers] holds answers, , holds index and input value together then stores it
    const [inputValue, setInputValue] = useState('') //create a state variable, when the user types, the value changes, it is stores as a strong, input is current answers is all answers, inpout value is only one string of text
    
    
    const questions= [ //created a list that stores questions 
        'Where do you feel the pain?',
        'How severe is your pain on a scale of 1-10?',
        'How long have you had this pain?',
        'What kind of pain is it (sharp, dull, throbbing, etc.)?',
        'Have you had any injuries that could be related, or are there certain activities that cause pain?'
    ];
    
    
    const [selectedPart, setSelectedPart] = useState('') //what we used to change to the readable name, the function that remebers what was selected as a string 
   
    const handleSelectBodyPart = (part) => { //arrow function, takes input and does something, parameter is part, recives data insude a function, the function takes one input called part, runs whenever the user clicks on a bodypart, part says which part was clicked
         if (part.toLowerCase().includes("path") || /^\d+$/.test(part)) { //checks to see if path is in the part value, it gets tested 
        console.log("Ignored invalid body part ID:", part);  return;}
       
        const readableName = part.replaceAll('-', ' '); //new name without -
        console.log('Selected:', readableName);
        setSelectedPart(readableName) //calling a function, changes the state value, updates the selected part, now stored in the usestate as a diff sting 
        if (currentQuestion === 0) {
        setInputValue (readableName); //we only want to input to change on the first question, we are doing th same thing, calling the set inputvalue funvtion, setting userstate as name
        setAnswers(prev => ({ ...prev, [currentQuestion]: part }));  //copies all prev answer, add another in the form of [1:quad muscle]
        }
    };



    const handleNext = (answer) => { //input of the function is the answer
        setAnswers(prev => ({...prev, [currentQuestion]: answer})); //the answer was set to the part, for the first question, the new answer is stored, remember all the prev ones 
    if (currentQuestion < questions.length - 1) {  //if the question index is less than 2 basically, it allows the code to move on
        setCurrentQuestion (prev => prev + 1) //keep going so the ending program will run
        setInputValue('')} //clear the box
   else {
    setCurrentQuestion(prev => prev+1);
    }}
    
 
    
    const handleBack = () => {
        if (currentQuestion > 0){    //cant go back from 
            const newIndex = currentQuestion -1;
            const previousAnswer = answers[newIndex] ?? 'Type your answer here and press Enter'; //trying to get answer from prev question, if there is none it displays the promt 
            setCurrentQuestion(newIndex); //new index is index of prev question, we want that now to be current question, so then the enire function runs like that, it sets the question
            setInputValue(previousAnswer); //if there is an input value before, make that the same input value
        }
    };
    
    
    if (currentQuestion >= questions.length){ //past the last question
        return (
            <div style={{ textAlign: 'center', paddingTop: '80px', fontSize:'30px' }}>
                <h2>Thanks for completing the assessment!</h2>
                    <div style={{display: 'inline-block', marginTop:'40px' }}>
                        {questions.map((question, index) => (
                            <div key={index} style={{ marginBottom: '30px', fontSize:'20px' }}>
                                <strong>{index + 1}. {question}</strong>
                                <p>➡️ {answers[index] || 'No answer given'}</p>
                            </div>))}
                    </div>
                
               
                <div style={{marginTop:'40px'}}>
                    <Link to= '/recommendations' state={{ answers}} style={{ textDecoration: 'none'}}> 
                        <button
                            style={{
                            padding: '20px 70px',
                            fontSize: '18px',
                            cursor: 'pointer',
                            borderRadius: '5px',
                            backgroundColor: '#FFFFFF',
                            color: '#0f0f0f',
                            border: 'none',
                            }}> Speak with AI Physcial Therapist
                        </button>
                    </Link> 
                    
                    
                    <div style={{marginTop:'40px'}}>
                        <button
                            onClick={() => {
                                setCurrentQuestion(questions.length - 1)
                                setInputValue(answers[questions.length - 1]|| '');
                            }}
                            style={{
                            padding: '20px 70px',
                            fontSize: '18px',
                            cursor: 'pointer',
                            borderRadius: '5px',
                            backgroundColor: '#FFFFFF',
                            color: '#0f0f0f',
                            border: 'none',
                            }}> Back to Last Question
                        </button>
                    </div>

                </div>
            </div>
        )
    };
        return ( 
        <div 
            style= {{ 
                textAlign: 'center', 
                marginTop: 50, 
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"}}>

            <h1>Welcome to PhyTher!</h1> <h2>Question {currentQuestion + 1} </h2>
            <p style={{fontSize: '20px', marginTop: '40px'}}> {questions [currentQuestion]}</p>
            {currentQuestion === 0 && ( <p style ={{fontSize: '20px', marginTop: '10px'}}> (Select area on diagram)</p>)}

            <input //this is import for our inputvalue and setinput value funvtion
                autoFocus
                style={{
                    width: '350px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    marginTop: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '12px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(5px)',
                    outline: 'none',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                    textAlign: 'center'}}
                
                type="text"
                placeholder={isFocused ? '' : 'Type your answer here and press Enter'}
                value={inputValue} //whatever the value of the input value is now our inputvalue constant 
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                if (e.key === 'Enter' && inputValue.trim() !== '') {
                    handleNext(inputValue); //run the handlenext program with the input value as the input which is read as the answer
                }
                }} />
            
            
                    <div style={{ marginTop: '30px' }}>
                        <button
                            onClick={handleBack}
                            style={{
                                marginRight: '10px',
                                padding: '10px 20px',
                                fontSize: '16px',
                                cursor: 'pointer',
                                borderRadius: '5px',
                                background: 'linear-gradient(90deg, #1E90FF 0%, #D6E9FF 100%)',
                                color: 'white',
                                border: '2px solid #003366'}}
                            disabled= {currentQuestion === 0}>
                            Back
                        </button>
                
                        <button 
                            onClick= {() => {
                                if (inputValue.trim() !== '') {
                                    handleNext(inputValue);
                                }
                                }}
                            style={{
                                marginRight: '10px',
                                padding: '10px 20px',
                                fontSize: '16px',
                                cursor: 'pointer',
                                borderRadius: '5px',
                                background: 'linear-gradient(90deg, #1E90FF 0%, #D6E9FF 100%)',
                                color: 'white',
                                border: '2px solid #003366'}}>
                            {currentQuestion === questions.length -1 ? 'Finish' : 'Next'} 
                        </button>
                    </div>
 
 
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
            
            {!/^path\d*$/i.test(selectedPart) && !/^\d+$/.test(selectedPart) && ( // only show if the path isnt like a number like 123 it needs to start with the word path in the first place
                <p style={{
                    position: 'absolute', 
                    left: '50%', 
                    fontSize: '20px', 
                    marginTop:'40px', 
                    textAlign: 'center', 
                    transform: 'translateX(-50%)'}}>
                Selected Body Part: {selectedPart} </p>
                )}
            <BodyDiagram onSelect={handleSelectBodyPart} />    
        </div>     // when sonomeone clicks run the function handleSelectBodyPart, now inside bodydiagram, when onselct is called, react will run the handleSelectBodyPart
    );
}
export default Questions