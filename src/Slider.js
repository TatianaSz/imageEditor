import React from "react"
import "./css/slider.css"
import {BiChevronsLeft} from "react-icons/bi"
import {BiChevronsRight} from "react-icons/bi"


function Slider(props){
    if(props.op=="1"){
        return(
        <div className="slider-container">
        <label >{props.name}</label>
        <div className="slider">
        <button onClick={props.onClickLeft}  ><BiChevronsLeft/></button>
        <input type="range" value={props.value} min={props.min} max={props.max} readOnly/> 
        <button onClick={props.onClickRight} ><BiChevronsRight/></button>
        <br/>
        </div>
        </div>
        )
    }
    else{
        return( <div></div>)
    }
}

export default Slider