import React from 'react'
import './css/shapes.css'

function Shapes(props){
    if(props.op==props.generic){
        return(
         <button className={`shape-button`} onClick={props.onClick}>
            {props.name}    
         </button>
        )
    }
    else if(props.name=="Download"){
        return(
            <a download="BestImageEditorEver.png" ref={props.downloadRef} className={`shape-button ${props.name}`} onClick={props.onClick}>
            {props.name}    
         </a>
        )
    }
    else{
        return (
            null
        )
    }
}

export default Shapes