import React from 'react';
import { Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', backgroundColor: '#82CAFF', minHeight: '100vh' }}>
      <h1>Welcome to PhyTher!</h1>
      <p style={{ fontSize: '24px', marginTop: '50px'}}>
        An AI-powered physical therapist. Just tap where it hurts, chat about your pain, <br /> and let our system guide you through personalized exercises, video assessments, and a smart recovery plans.</p>
        <div style= {{ 
            position: 'relative',
            textAlign:'center',
            marginTop: '30px',
            height: '250px'
            }}>
            <Link to= "/questions" style= {{textDecoration: 'none' }}>
                    <button style={{
                    position: 'relative',
                    textAlign: 'center',
                    padding: '25px 100px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    marginTop: '20px',
                 }}>Lets Get Started!</button>
            </Link>
          </div>
    </div>
        );
    }
export default Home;