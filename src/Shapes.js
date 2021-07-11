import React from 'react'
import './css/shapes.css'

function Shapes(props){
    if(props.op==props.generic){
        return(
         <button className="shape-button" onClick={props.onClick}>
            {props.name}            
         </button>
        )
    }
    else{
        return (
            null
        )
    }
}

export default Shapes