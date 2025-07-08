import { Center } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
function Assessment(){
    return(
    <div style= {{ 
        position: 'relative',
        textAlign:'center',
        marginTop: '50px',
        height: '250px',
        backgroundColor: '#1E90FF'
        }}>
        <p>Tell us more about the pain so we can help you!</p>
        <Link to= "/questions" style= {{textDecoration: 'none' }}>
                <button style={{
                position: 'relative',
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',
                borderRadius: '5px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                marginTop: '20px',
             }}>Start Evaluation</button>
        </Link>
        <div style={{
            position: 'absolute',
            top: '-25px',
            right: '50px'

        }}>
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
 </div>
    );
}
export default Assessment;