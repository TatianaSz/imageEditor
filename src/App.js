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
  const [filtr, setFiltr] = useState(100);

  function addValue(e){
  setFiltr(e.target.value)
  console.log(filtr)
  }
 
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
 });
  
    return (
      <div className="app">
        <Menu clicked="menu-clicked"/>
        <Options onChange={addFile} slider={addValue}/>
        <ImageUpload canvaRef={canva} imageRef={image} src={file} val={filtr}/>
      </div>
    );
  
}

export default App;