import React from "react"


function Slider(props){

return(
<div className="slider">
    <button onClick={props.onClickLeft}>left</button>
<input type="range" value={props.value} min="-70" max="70" id="myRange" onChange={props.onChange}/> 
<button onClick={props.onClickRight}>right</button>
</div>
)


}

export default Slider