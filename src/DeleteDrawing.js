import React from "react"
import './css/shapes.css'

function DeleteDrawing(props){
    if(props.op=="3"){
        return(
            <button className="shape-button" onClick={props.onClick}>
            {props.name}            
             </button>
        )
    }
    else{
        return(
            <div></div>
        )
    }


}

export default DeleteDrawing