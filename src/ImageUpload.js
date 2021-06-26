import React, { useEffect, useRef } from 'react';
import "./css/image.css"

function ImageUpload(props){
   const filterCss={filter: `brightness(${props.val}%)` }

   useEffect(() => {   
       const canvas = canva.current;
       const ctx = canvas.getContext("2d")
       const img = image.current;
       img.onload=()=>{
        var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        var x = (canvas.width / 2) - (img.width / 2) * scale;
    var y = (canvas.height / 2) - (img.height / 2) * scale;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        
       }
       
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    const canva = useRef(null);
    const image = useRef(null);

    return (
<div className="image" >
    <div className="image-max">
    <canvas ref={canva} width={640} height={425} />
    <img  ref={image} id="myImg" src={props.src} style={filterCss}/>
    </div>
</div>
    )
}
export default ImageUpload