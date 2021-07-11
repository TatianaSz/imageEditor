import React from "react"
import './css/filters.css'
import './css/slider.css'

function FiltersOpt(props){
    if(props.op=="1"){
      return(
        <div className="filters--option"  onClick={props.onClick}><canvas width="130" height="120" className={`filters--option__canva filter--option__${props.class}`} /><div>{props.title}</div></div>  
      )
    }
    else{
      return (null)
    }
}

export default FiltersOpt