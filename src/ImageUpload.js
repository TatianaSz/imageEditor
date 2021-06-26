import React from "react"
import "./css/image.css"

function ImageUpload(props){
    return (
<div className="image">
<img src={props.src}/>

</div>
    )
}
export default ImageUpload