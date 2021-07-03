import React from "react"
import './css/filters.css'
import './css/slider.css'

function Filters(props){
    if(props.op=="1"){
    return(
        <div className="slider-container">
            <div>Choose a filter:</div>
            <div ref={props.filterCanvaRef} className="filters">
                <div className="filters--option"><canvas id="1" className="filters--option__canva" /></div>
                <div className="filters--option"><canvas id="2" className="filters--option__canva" /></div>
                <div className="filters--option"><canvas id="2" className="filters--option__canva" /></div>
                <div className="filters--option"><canvas id="2" className="filters--option__canva" /></div>
            </div>
        </div>
    )
    }
    else{
        return <div></div>
    }
}

export default Filters