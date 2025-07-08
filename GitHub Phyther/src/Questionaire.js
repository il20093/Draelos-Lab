import React from 'react';
import { Link } from 'react-router-dom';
function Questionaire() {
    return(
        <div style= {{ textAlign: 'center', marginTop: '50px'}}>
            <h2>Questionnaire Page</h2>
            <p>This is where the pain-related questions will appear.</p>
            <Link to="/assessment">
                <button>Back to Assesment</button>
            
            </Link>
        </div>
    );
}
export default Questionaire;