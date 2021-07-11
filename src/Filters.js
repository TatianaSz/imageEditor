import React from "react"
import './css/filters.css'
import './css/slider.css'

function Filters(props){
    if(props.op=="1"){
    return(
        <div className="slider-container">
            <div>Choose a filter:</div>
            <div ref={props.filterCanvaRef}  className="filters">
                {props.children}
            </div>
        </div>
    )
    }
    else{
        return (null)
    }
}

export default Filters