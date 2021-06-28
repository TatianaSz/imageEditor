import React from "react"


function Slider(props){

return(
<div className="slider">
    <button onClick={props.onClickLeft}>left</button>
    <input type="range" value={props.value} min={props.min} max={props.max}  onChange={props.onChange}/> 
    <button onClick={props.onClickRight}>right</button>
<br/>
</div>
)


}

export default Slider