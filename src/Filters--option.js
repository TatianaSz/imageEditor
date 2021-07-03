import React from "react"
import './css/filters.css'
import './css/slider.css'

function FiltersOpt(props){
    if(props.op=="1"){
    return(
      <div className="filters--option"><canvas id="1" className="filters--option__canva" /><div>Tytuł</div></div>  
    )
    }
    else{
        return <div></div>
    }
}

export default FiltersOpt