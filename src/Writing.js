import React from "react"

function Writing(props){
    if(props.op=="3"){
        return(
         <button className="shape-button" onClick={props.onClick}>
            {props.name}            
         </button>
        )
    }
    else{
        return (
           <div></div>
        )
    }
}
export default Writing