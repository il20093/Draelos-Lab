import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from './Home';
import Assessment from './Assessment';
import Questionaire from './Questionaire';
import Questions from './Questions';
import Recommendations from './Recommendations';
import Dashboard from './Dashboard';
import { PlanProvider } from './PlanContext';
function App() {
    return(
        <PlanProvider> {/*this provides plan and set p;lan to everything wrqapped insidde, so bsically all of these paths, makes these path children of the plan provider (the things that have access to the plan)*/}
            <Routes>
                <Route path= "/" element= {<Home />} />
                <Route path= "/assessment" element= {<Assessment />} />
                <Route path ="/questionaire" element= {<Questionaire />}/>
                <Route path= "/questions" element= {<Questions />}/>
                <Route path="/recommendations" element={<Recommendations />} />
                <Route path= "/dashboard" element= {<Dashboard />} />
            </Routes>
        </PlanProvider>
    );
} export default App;
