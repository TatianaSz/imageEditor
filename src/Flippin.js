import React from "react"
import './css/slider.css'
function Flippin(props){
    if(props.op=="2"){
        return(
           <div className="slider-container">
                <label >{props.name}</label>
                <div className="slider flip-slider">
                   <button className="flip" onClick={props.hor}>{props.horr}</button>
                   <button className="flip" onClick={props.ver}>{props.verr}</button>
                </div>
           </div>
        )   
    }

    else{
        return (null)
    }
}
export default Flippin