import React from 'react'
import './css/shapes.css'

function Shapes(props){
if(props.op=="4"){
    return(
        <button className="shape-button" onClick={props.onClick}>
                coś do klikniecia
        </button>
    )
}
else{
    return (
        <div></div>
    )
}
}

export default Shapes