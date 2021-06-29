import React, { useState, useEffect, useRef } from 'react';
import Menu from "./Menu"
import Options from "./Options"
import ImageUpload from './ImageUpload';
import Uploader from './Uploader'
import Delete from './Delete'
import "./../node_modules/normalize.css/normalize.css"
import "./css/app.css";


function App() {
  const canva = useRef(null);
  const image = useRef(null);
  const list = useRef(null)
  
  const [file, setFile] = useState(null);
  const [val, setVal] = useState(0);
  const [cont, setCont] = useState(0);
  const [menus, setMenus] = useState("0")
  let a;

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
  
  var factor = (259.0 * (cont + 255.0)) / (255.0 * (259.0 - cont));

  for (var i = 0; i < dA.length; i+= 4) {
    dA[i] = (factor * (dA[i] - 128.0) + 128.0);
    dA[i+1] = (factor * (dA[i+1] - 128.0) + 128.0);
    dA[i+2] = (factor * (dA[i+2] - 128.0) + 128.0);
  }

  canvas.getContext('2d').putImageData(iD, 0, 0);
  
  }

  function checkvanvs() {
    setFile(null)
    var cnv = canva.current
    const ctx = cnv.getContext("2d")
    if (isCanvasEmpty(cnv))
        alert('Empty!');
    else
    ctx.clearRect(0, 0, cnv.width, cnv.height)
        
};

function isCanvasEmpty(cnv) {
    const blank = document.createElement('canvas');

    blank.width = cnv.width;
    blank.height = cnv.height;

    return cnv.toDataURL() === blank.toDataURL();
}

function menu(e){
  a=e.target.dataset.value;
  
  for(let i=0; i<list.current.childNodes.length; i++){
    list.current.childNodes[i].classList.remove("clicked")
   if(a==i){
      e.target.parentNode.classList.add("clicked")
   }
   setMenus(a)
  }
  
  
  // switch(a){
  //   case "0":
  //     setMenus("0")
  //     break;
  // }
}

function opt(e){
  if (a=="0"){
    console.log("chyba dziala")
    return "none"
  }
}
    return (
      <div className="app">
        <Menu menuRef={list}  onClick={menu} />
        <Options test="1" >
        <Uploader op={menus}   onChange={addFile}/>
        <Delete op={menus} onClick={checkvanvs}/>
          
        </Options>
        <ImageUpload canvaRef={canva} imageRef={image} src={file} />
      </div>
    );
  
}

export default App;

// value={val} slide={()=>{setVal(val)}}onClickRight={()=>{setVal(val+3); setBrightness()}} onClickLeft={()=>{setVal(val-3); setBrightness()}} 
          // value2={cont} slide={()=>{setCont(cont)}}onClickRight2={()=>{setCont(cont+3); setBrightness()}} onClickLeft2={()=>{setCont(cont-3);setBrightness()}}