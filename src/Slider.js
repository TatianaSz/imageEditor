import React from "react"
import "./css/slider.css"

function Slider(props){
    if(props.op=="1"){
        return(
        <div className="slider">
        <button onClick={props.onClickLeft}>Darken</button>
        <input type="range" value={props.value} min={props.min} max={props.max} readOnly/> 
        <button onClick={props.onClickRight}>Lighten</button>
        <br/>
        </div>
        )
    }
    else{
        return( <div></div>)
    }
}

export default Slider