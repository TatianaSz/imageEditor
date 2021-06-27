import React from "react"


function Slider(props){

return(
<div className="slider">
    <button onClick={props.onClickLeft}>left</button>
<input type="range" value={props.value} min="-70" max="70" id="myRange" onChange={props.onChange}/> 
<button onClick={props.onClickRight}>right</button>
<br/>
<button onClick={props.onClickLeft2}>left</button>

<button onClick={props.onClickRight2}>right</button>

</div>
)


}

export default Slider