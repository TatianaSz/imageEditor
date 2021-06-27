import React from "react"


function Slider(props){

return(
<div className="slider">
    <button onClick={props.onClick}>rozjaśnij</button>
<input type="range" min="0" max="200" id="myRange" /> 
<p>{}</p>
</div>
)


}

export default Slider