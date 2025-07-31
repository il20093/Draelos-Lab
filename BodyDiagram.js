import React, { useEffect, useRef } from 'react';  //use effect lets you run code after a component appears on a page (side-effrects) (do this after you do this), useref is like a sticknote to reference a specific part of the webpage
import { ReactComponent as Svg } from './muscles_front_and_back_cleaned_for_react.svg';

function BodyDiagram({ onSelect }) { //the function taskes in a prop, inputs to a component, like a function parameters, props customize it, in the questions page, on selct gets called by handleselct function
  const svgRef = useRef(); //creates a referance to attach the svg 

  useEffect(() => { //run code after svg is on the page 
    const svgElement = svgRef.current; //the svg element is the place on the page that is refrenced 
    if (!svgElement) return; //if there is no element return nothing dont crash 

    const clickableElements = svgElement.querySelectorAll(
      'path[id]'); //makes the path clickable, query selct all retunrs a list of these elements to make them clockable 

    clickableElements.forEach((el) => { ///loops through the list of clickable elemts (paths)
      const id = el.getAttribute('id'); //gets the elements id for the paths 
      if (id && !id.startsWith('g')) { //makes sure id does not have a g(group)
        el.style.cursor = 'pointer'; ///makes mouse a hand icon, the element, style for its cursor 
        el.addEventListener('click', () => onSelect(id)); //when clickable element is clicked, the onselct function is called with the input as id, in the questions.js onselect is set equal to handleselctbodyparty
      }
    });

    return () => {
      clickableElements.forEach((el) => { 
        el.replaceWith(el.cloneNode(true)); //removes all event listerns and replaces each element with clones, clones remove all event listerns 
      });
    };
  }, [onSelect]); //run this only when the onselect changes, prevents running unnecessaroty 

  return (
    <div style={{ width: '1100px', textAlign:'center', margin: '0 auto'}}> 
      <Svg ref={svgRef} style={{width: '100%', height: 'auto' }} /> 
    </div> //svg is rendered in a div, centerd on a pahge, full width of the container 
  );
}

export default BodyDiagram;



