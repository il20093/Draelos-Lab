import React, { createContext, useState } from 'react'; //making the memory backpack, shared acroess multiple components
export const PlanContext = createContext(); //creates a container called PlanConext with a lot of stuff, provider is able to change and acess whats inside 
export const PlanProvider = ({ children }) => { //plan provider stores the plan in its state and shares it with everythng wrapped inside it, in this case children which is everything
  const [plan, setPlan] = useState(''); //plan veriable starts with nothing 
return (
    <PlanContext.Provider value={{ plan, setPlan }}>  {/*basically like opening the backpack and putting these things inside of it, anything wrapped inside has access  */}
      {children} {/*gives plan access to childs of the plan provider*/}
    </PlanContext.Provider>
  );
};