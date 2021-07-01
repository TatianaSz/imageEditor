import React, { useState, useEffect, useRef } from 'react';
import Menu from "./Menu"
import Options from "./Options"
import ImageUpload from './ImageUpload';
import Uploader from './Uploader'
import Delete from './Delete'
import Slider from './Slider'
import Flippin from './Flippin'
import CropDrag from "./CropDrag"
import "./../node_modules/normalize.css/normalize.css"
import "./css/app.css";



function App() {
  const canva = useRef(null);
  const image = useRef(null);
  const list = useRef(null);

  const [file, setFile] = useState(null);
  const [val, setVal] = useState(0);
  const [cont, setCont] = useState(0);
  const [sat, setSat] = useState(100);
  const [menus, setMenus] = useState("0")
 const [test, setTest] =useState([])
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

 });
 const canvas = canva.current;
 const img = image.current;
 let iD;
 let dA;
 function reDraw(){
   canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
   var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
   var x = (canvas.width / 2) - (img.width / 2) * scale;
   var y = (canvas.height / 2) - (img.height / 2) * scale;
   canvas.getContext("2d").drawImage(img, x, y, img.width * scale, img.height * scale);
 }
 
  function setBrightness(e){
   if(img.width){ //checks if image is even there in case someone tried to lighten nothing
 
   reDraw()
   iD = canvas.getContext('2d').getImageData(0, 0, img.width, img.height);
   dA = iD.data;
   

  var sv = (sat/100); // saturation value. 0 = grayscale, 1 = original, 2=max saturation

  var az = (1 - sv)*0.3086 + sv;
  var bz = (1 - sv)*0.6094;
  var cz = (1 - sv)*0.0820;
  var dz = (1 - sv)*0.3086;
  var ez = (1 - sv)*0.6094 + sv;
  var fz = (1 - sv)*0.0820;
  var gz = (1 - sv)*0.3086;
  var hz = (1 - sv)*0.6094;
  var iz = (1 - sv)*0.0820 + sv;
  
  for(var i = 0; i < dA.length; i += 4)
  {
      var red = dA[i]; // Extract original red color [0 to 255]. Similarly for green and blue below
      var green = dA[i + 1];
      var blue = dA[i + 2];
  
      var saturatedRed = (az*red + bz*green + cz*blue);
      var saturatedGreen = (dz*red + ez*green + fz*blue);
      var saturateddBlue = (gz*red + hz*green + iz*blue);
  
      dA[i] = saturatedRed;
      dA[i + 1] = saturatedGreen;
      dA[i + 2] = saturateddBlue;
  }
     
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
}

function flippinTime(wziu, bziu){
   const ctx = canvas.getContext("2d")
   var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
   var y = (canvas.height / 2) - (img.height / 2) * scale;
   var x = (canvas.width / 2) - (img.width / 2) * scale;
   if(wziu==1){
   ctx.translate(0,canvas.height); 
   ctx.scale(wziu,bziu)
   ctx.drawImage(img, 0, y, img.width * scale, img.height * scale);}
   else if(wziu==-1){
    ctx.translate(canvas.width,0); 
    ctx.scale(wziu,bziu)
    ctx.drawImage(img, x, 0, img.width * scale, img.height * scale);
   }
   else if(wziu=="left"){
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width*0.5, canvas.height*0.5)
    ctx.rotate((Math.PI / -180) * 90)
    ctx.translate(-canvas.width*0.5, -canvas.height*0.5)
   }
   else{
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width*0.5, canvas.height*0.5)
    ctx.rotate((Math.PI / 180) * 90)
    ctx.translate(-canvas.width*0.5, -canvas.height*0.5)
   }
   setBrightness()
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

function menu(e){ //ads background colors and sets menu state that allows to detect which was cliccked
  a=e.target.dataset.value;
  for(let i=0; i<list.current.childNodes.length; i++){
    list.current.childNodes[i].classList.remove("clicked")
    if(a==i){
      e.target.parentNode.classList.add("clicked")
    }
    setMenus(a)
  }
}

    return (
      <div className="app">
        <Menu menuRef={list}  onClick={menu} />
        <Options>
        <Uploader op={menus}   onChange={addFile}/>
        <Delete op={menus} onClick={checkvanvs}/>
        <Slider op={menus}  name="Brightness" value={val} min={"-70"} max={"70"} onClickRight={function(){setVal(val+3); setBrightness()}} onClickLeft={()=>{setVal(val-3); setBrightness()}} />
        <Slider op={menus} name="Contrast" value={cont} min={"-70"} max={"70"} onClickRight={()=>{setCont(cont+3); setBrightness()}} onClickLeft={()=>{setCont(cont-3); setBrightness()}}/> 
        <Slider op={menus}  name="Saturation" value={sat} min={"0"} max={"200"} onClickRight={()=>{setSat(sat+3); setBrightness()}} onClickLeft={()=>{setSat(sat-3); setBrightness()}}/>
        <Flippin op={menus} name="Flip" horr="Horizontally" verr="Vertically" hor={function(){flippinTime(1,-1)}} ver={function(){flippinTime(-1,1)}}/>
        <Flippin op={menus} name="Rotate" horr="Left" verr="Right" hor={function(){flippinTime("left",-1)}} ver={function(){flippinTime("right",1)}}/> 
        </Options>
        
        <ImageUpload canvaRef={canva} imageRef={image} src={file} >
        <CropDrag />
          </ImageUpload>
      </div>
    );
  
}

export default App;

