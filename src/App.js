import React, { useState, useEffect, useRef } from 'react';
import Menu from "./Menu"
import Options from "./Options"
import ImageUpload from './ImageUpload';
import "./../node_modules/normalize.css/normalize.css"
import "./css/app.css";


function App() {
  const canva = useRef(null);
  const image = useRef(null);
  
  const [file, setFile] = useState(null);
  const [val, setVal] = useState(0);

 function addFile(e){
  URL.revokeObjectURL(file)
   setFile(
    URL.createObjectURL(e.target.files[0])
    )
 
  }

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

    
  //  ctx.clearRect(0, 0, canvas.width, canvas.height);
 });
 
  function setBrightness(){
    
   
    const canvas = canva.current;
    const img = image.current;
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
      var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
      var x = (canvas.width / 2) - (img.width / 2) * scale;
      var y = (canvas.height / 2) - (img.height / 2) * scale;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
   
     
    
  var iD = canvas.getContext('2d').getImageData(0, 0, img.width, img.height);
  var dA = iD.data; 

   for(var i = 0; i < dA.length; i += 4)
     {
      dA[i] += 255 * (val / 100);
      dA[i+1] += 255 * (val / 100);
     dA[i+2] += 255 * (val / 100);
  }
  
  canvas.getContext('2d').putImageData(iD, 0, 0);
  
  }

    return (
      <div className="app">
        <Menu clicked="menu-clicked"/>
        <Options onChange={addFile} value={val} slide={()=>{setVal(val)}}onClickRight={()=>{setVal(val+3); setBrightness()}} onClickLeft={()=>{setVal(val-3); setBrightness()}} />
        <ImageUpload canvaRef={canva} imageRef={image} src={file} />
      </div>
    );
  
}

export default App;