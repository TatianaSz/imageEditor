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
  const [val, setVal] = useState(1.35);

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
 });
  
  function setBrightness(){
    const canvas = canva.current;
    const img = image.current;
  var iD = canvas.getContext('2d').getImageData(0, 0, img.width, img.height);
  var dA = iD.data; 

  var brightnessMul = 1.35; 

   for(var i = 0; i < dA.length; i += 4)
     {
     var red = dA[i]; 
     var green = dA[i + 1]; 
     var blue = dA[i + 2]; 
     let brightenedRed = brightnessMul * red;
     let brightenedGreen = brightnessMul * green;
     let brightenedBlue = brightnessMul * blue;
     dA[i] = brightenedRed;
     dA[i + 1] = brightenedGreen;
     dA[i + 2] = brightenedBlue;
  }
   
  canvas.getContext('2d').putImageData(iD, 0, 0);
  }

    return (
      <div className="app">
        <Menu clicked="menu-clicked"/>
        <Options onChange={addFile} slider={setBrightness}/>
        <ImageUpload canvaRef={canva} imageRef={image} src={file} />
      </div>
    );
  
}

export default App;