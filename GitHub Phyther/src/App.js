import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from './Home';
import Assessment from './Assessment';
import Questionaire from './Questionaire';
import Questions from './Questions';
function App() {
    return(
        <Routes>
            <Route path= "/" element= {<Home />} />
            <Route path= "/assessment" element= {<Assessment />} />
            <Route path ="/questionaire" element= {<Questionaire />}/>
            <Route path= "/questions" element= {<Questions />}/>
        </Routes>
    );
} export default App;
