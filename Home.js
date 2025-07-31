import React from 'react';
import { Link, NavLink } from 'react-router-dom'; //link lets u move pages, NAVlink knows what page you are on, this helps you style like if you wanted the nav bar to highlkight what page you are on 
import logo from './Phyther_logo.jpg'; // Replace with your actual logo path

function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1E90FF 0%, #D6E9FF 100%)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#003366',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '80px',
      paddingBottom: '40px',
      boxSizing: 'border-box',
    }}>

     {/*This is all for the navigation bar, the main container for it*/}
      <nav 
        style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',       
        backdropFilter: 'blur(10px)',                         
        boxShadow: 'inset 0 -2px 6px rgba(0, 0, 0, 0.1)',     
        borderBottom: '1px solid rgba(255, 255, 255, 0.5)',   
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
        padding: '15px 0',
        zIndex: 1000,
        fontWeight: '600',
        fontSize: '18px',
        color: '#003366',                                      
        userSelect: 'none',
      }}>


        <NavLink 
          to="/" 
          style={({ isActive }) => ({  //its saying to check if page is active, nav does that 
            textDecoration: 'none',
            color: isActive ? '#1E90FF' : '#555',
            borderBottom: isActive ? '2px solid #1E90FF' : 'none',
            paddingBottom: '2px',
            transition: 'color 0.3s ease',
          })}
        >
          Home
        </NavLink>
        
        <NavLink 
          to="/about" 
          style={({ isActive }) => ({
            textDecoration: 'none',
            color: isActive ? '#1E90FF' : '#555',
            borderBottom: isActive ? '2px solid #1E90FF' : 'none',
            paddingBottom: '2px',
            transition: 'color 0.3s ease',
          })}
        >
          About
        </NavLink>
        
        <NavLink 
          to="/dashboard" 
          style={({ isActive }) => ({
            textDecoration: 'none',
            color: isActive ? '#1E90FF' : '#555',
            borderBottom: isActive ? '2px solid #1E90FF' : 'none',
            paddingBottom: '2px',
            transition: 'color 0.3s ease',
          })}
        >
          Dashboard
        </NavLink>
      </nav>

      
      {/* Logo container */}
      
      <div style={{
        marginTop: '40px',
        marginBottom: '40px',
        padding: '20px 40px',
        borderRadius: '24px',
        backgroundColor: 'rgba(255, 255, 255, 0.18)',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
        display: 'inline-block',
        transition: 'transform 0.3s ease',
        cursor: 'default',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <img
          src={logo}
          alt="PhyTher Logo"
          style={{ height: '220px', display: 'block', margin: '0 auto' }}
        />
      </div>

      {/* Heading & Description */}
      <h1 style={{ fontSize: '3.2rem', marginBottom: '20px', fontWeight: '700' }}>
        Welcome to PhyTher!
      </h1>
      <p style={{ 
        fontSize: '1.6rem', 
        maxWidth: '1600px', 
        lineHeight: '1.5', 
        textAlign: 'center', 
        color: '#034078',
        marginTop: '50px'
      }}>
        An AI-powered physical therapist. Just tap where it hurts, chat about your pain, <br />
        and let our system guide you through personalized exercises, video assessments, and smart recovery plans.
      </p>

      {/* Get Started Button */}
      <Link to="/questions" style={{ textDecoration: 'none' }}>
        <button
          style={{
            background: 'linear-gradient(90deg, #1E90FF 0%, #D6E9FF 100%)',
            color: '#003366',
            borderRadius: '16px',
            padding: '18px 600px',
            fontSize: '1.3rem',
            fontWeight: '700',
            border: 'none',
            boxShadow: '0 6px 15px rgba(30, 144, 255, 0.6)',
            cursor: 'pointer',
            transition: 'background 0.3s ease',
            marginTop: '100px'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(90deg, #005FCC 0%, #A8CFFF 100%)'}
          onMouseLeave={e => e.currentTarget.style.background = 'linear-gradient(90deg, #1E90FF 0%, #D6E9FF 100%)'}
        >
          Let’s Get Started!
        </button>
      </Link>

    </div>
  );
}

export default Home;