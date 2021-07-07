import React from 'react';
import "./css/image.css"

function ImageUpload(props){
  
    return (
     <div className="image" >
        <div className="image-max">
            <canvas ref={props.canvaRef} width={600} height={600}  />
            <canvas className="shapeCanva" ref={props.shapeCanvaRef} width="600" height="600" onMouseDown={props.onMouseDown}
            onMouseMove={props.onMouseMove}
            onMouseUp={props.onMouseUp}
            onMouseOut={props.onMouseOut}/>
            <img  ref={props.imageRef} id="myImg" src={props.src} />
        </div>
     </div>
    )
}
export default ImageUpload