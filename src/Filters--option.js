import React from "react"
import './css/filters.css'
import './css/slider.css'

function FiltersOpt(props){
    if(props.op=="1"){
    return(
      <div className="filters--option" onClick={props.onClick}><canvas className="filters--option__canva" /><div>{props.title}</div></div>  
    )
    }
    else{
        return <div></div>
    }
}

export default FiltersOpt