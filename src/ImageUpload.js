import React, { useEffect, useRef } from 'react';
import "./css/image.css"

function ImageUpload(props){
  
    return (
    <div className="image" >
        <div className="image-max">
            <canvas ref={props.canvaRef} width={640} height={425} />
            <img  ref={props.imageRef} id="myImg" src={props.src} />
        </div>
    </div>
    )
}
export default ImageUpload