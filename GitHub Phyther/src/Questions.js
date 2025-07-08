import React, {useState} from 'react'; 
import { Link } from 'react-router-dom';
function Questions() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState ({});
    const [inputValue, setInputValue] = useState('')
    const questions= [
        'Where do you feel the pain?',
        'How severe is your pain on a scale of 1-10?',
        'How long have you had this pain?'
    ];
    const handleSelectBodyPart = (part) => {
        setInputValue (part)
    };
    const handleNext = (answer) => {
        setAnswers(prev => ({...prev, [currentQuestion]: answer})); //store the prev and store the one that just was inputed
    if (currentQuestion < questions.length - 1) {  //if the question index is less than 2 basically, it allows the code to move on
        setCurrentQuestion (prev => prev + 1)
        setInputValue('')}
   else {
    setCurrentQuestion(prev => prev+1);}
 }
    const handleBack = () => {
        if (currentQuestion > 0){
            const newIndex = currentQuestion -1;
            const previousAnswer = answers[newIndex] ?? 'Type your answer here and press Enter';
            setCurrentQuestion(newIndex);
            setInputValue(previousAnswer);
        }
    };
    if (currentQuestion >= questions.length){
        return (
            <div style={{ textAlign: 'center', marginTop: 50 }}>
            <h2>Thanks for completing the assessment!</h2>
            <div style={{ textAlign: 'left', display: 'inline-block' }}>
            {questions.map((question, index) => (
                 <div key={index} style={{ marginBottom: '15px' }}>
                <strong>{index + 1}. {question}</strong>
                <p style={{ marginLeft: '10px' }}>➡️ {answers[index] || 'No answer given'}</p>
            </div>
         ))}
</div>
                <button
                onClick={() => {
                    setCurrentQuestion(questions.length - 1)
                    setInputValue(answers[questions.length - 1]|| '');
                 }}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',
                borderRadius: '5px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none'
              }}
            >
              Back to Last Question
            </button>
            </div>
        )
    }
        return ( 
        <div style= {{ textAlign: 'center', marginTop: 50 }}>
            {currentQuestion=== 0 && (
                <div style={{
                     border: '2px dashed #ccc',
                     padding: '20px',
                     marginBottom: '30px',
                     width: '80%',
                     margin: '0 auto',
                     textAlign: 'center'
             }}>
                <p><strong>Click the body part where you feel pain:</strong></p>
                <button
                    onClick= {() => handleSelectBodyPart ('Shoulder')} 
                    style={{ margin: '5px' }}>
                    Shoulder
                </button>
                <button 
                    onClick={() => handleSelectBodyPart ('Back')}
                    style={{ margin: '5px' }}>
                    Back
                </button>
                <button 
                    onClick={() => handleSelectBodyPart ('Leg')}
                    style={{ margin: '5px' }}>
                    Leg
                </button>
             </div>    
            )}
            <h2>Question {currentQuestion + 1}</h2>
            <p> {questions [currentQuestion]}</p>
            <input
            type= "text"
            placeholder= "Type your answer here and press Enter"
            style= {{
                 width: '300px',
                 padding: '10px',
                 fontSize: '16px',
                 marginTop: '10px'
            }}
            value= {inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown = {(e) => {
                if (e.key == 'Enter' && inputValue.trim() !== '') {
                    handleNext(inputValue);
                }
            }}
            autoFocus
            />
            <div style={{ marginTop: '15px' }}>
                <button
                onClick={handleBack}
                style={{
                marginRight: '10px',
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',
                borderRadius: '5px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none'}}
                disabled= {currentQuestion === 0}
                >Back</button>
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
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none'}}
                >
                    {currentQuestion === questions.length -1 ? 'Finish' : 'Next'}
                </button>
            </div>
 <Link to= "/" style={{ textDecoration: 'none'}}>
                <button  style= {{ 
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    marginTop: '0px',
                    right: '1000px'
                    }}>
                    Home
                </button>
            </Link>
        </div>
    );
}
export default Questions;