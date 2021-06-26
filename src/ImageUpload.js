import React from "react"
import "./css/image.css"

function ImageUpload(props){
   const filterCss={filter: `brightness(${props.val}%)` }
    return (
<div className="image" >
<img id="myImg" src={props.src} style={filterCss}/>

</div>
    )
}
export default ImageUpload