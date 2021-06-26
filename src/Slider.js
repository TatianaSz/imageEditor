import React from "react"


function Slider(props){

return(
<div className="slider">
<input type="range" min="0" max="200" id="myRange" onChange={props.onChange}/> 
<p>{}</p>
</div>
)


}

export default Slider