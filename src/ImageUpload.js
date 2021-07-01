import React from 'react';
import "./css/image.css"

function ImageUpload(props){
  
    return (
    <div className="image" >
        <div className="image-max">
            <canvas ref={props.canvaRef} width={600} height={600} />
            <img  ref={props.imageRef} id="myImg" src={props.src} />
            {props.children}
        </div>
    </div>
    )
}
export default ImageUpload