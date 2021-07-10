import React from "react"
import "./css/dimension.css"

function TextDimnesion(props){
    if(props.op=="3"){
    return(
    <div ref={props.dimRef} className="dimensionn">
    </div>
    )
    }
    else{
        return <div className="dimensionn"></div>
    }
}

export default TextDimnesion