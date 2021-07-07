import React, { useState, useEffect, useRef } from 'react';
import Menu from "./Menu"
import Options from "./Options"
import ImageUpload from './ImageUpload';
import Uploader from './Uploader'
import Delete from './Delete'
import Slider from './Slider'
import Filters from "./Filters"
import FiltersOpt from "./Filters--option"
import Flippin from './Flippin'
import Writing from './Writing'
import Shapes from './Shapes'
import Inpute from './Inpute'
import DeleteDrawing from "./DeleteDrawing"
import CropDrag from "./CropDrag"
import "./../node_modules/normalize.css/normalize.css"
import "./css/app.css";
import Convolute from './Convolute';



function App() {
  const canva = useRef(null);
  const image = useRef(null);
  const list = useRef(null);
  const filterCanva = useRef(null)
  const shapeCanva = useRef(null)

  const [file, setFile] = useState(null);
  const [val, setVal] = useState(0);
  const [cont, setCont] = useState(0);
  const [sat, setSat] = useState(100);
  const [menus, setMenus] = useState("0")
  const [test, setTest] =useState([])
  const [scaleF, setScaleFill]=useState(0)
  const [dimensionArray, setDimensionArray]=useState([])
  let [inputVal, setInput] =useState("write smth")
  let [inputColor, setInputColor] =useState("black")
  let [font, setFont] = useState(null)
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
    //console.log(img)
    if(menus==1){
      const filterCanvas = filterCanva.current;
      for(let i=0; i<filterCanvas.children.length; i++){
        const filterCanvasCurrent=filterCanvas.children[i].children[0]
        const filterCanvasAll = filterCanvas.children[0].children[0]
        const fctx = filterCanvasCurrent.getContext("2d")
        var scaleToFill = Math.max(filterCanvasAll.width / img.width, filterCanvasAll.height / img.height)
        setScaleFill(scaleToFill)
        var x = (filterCanvasAll.width / 2) - (img.width / 2) * scaleF;
        var y = (filterCanvasAll.height / 2) - (img.height / 2) * scaleF;
       fctx.drawImage(img, x,y, img.width*scaleF, img.height*scaleF)
      // fctx.fillStyle= 'rgba(207,194,15,0.36)'
       //fctx.fillRect(x,y, img.width*scaleF, img.height*scaleF)
      }
    }
   
    img.onload=()=>{
     var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
     canvas.width=img.width*scale
     canvas.height=img.height*scale
     ctx.drawImage(img, 0, 0, img.width * scale, img.height * scale);
     setTest(scale)
     
    }
  });

  useEffect(()=>{setBrightness()},[val,sat,cont])
  useEffect(()=>{drawShapes()},[dimensionArray])

 const canvas = canva.current;
 const img = image.current;
 const shapeCanvas = shapeCanva.current;
 function reDraw(){
   canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
   canvas.getContext("2d").drawImage(img, 0, 0, img.width * test, img.height * test);
 }
 
  function setBrightness(van, conn, satn,iD){
   if(img!=null&&img.width){ //checks if image is even there in case someone tried to lighten nothing
   reDraw()
    let iD=(typeof iD ==="undefined"?canvas.getContext('2d').getImageData(0, 0, img.width, img.height):iD)
   //iD = canvas.getContext('2d').getImageData(0, 0, img.width, img.height);
   let dA = iD.data;
   // (typeof satn === "undefined"?sat:satn)   canvas.getContext('2d').getImageData(0, 0, img.width, img.height)

  var sv = ((typeof satn === "undefined"?sat:satn)/100); // saturation value. 0 = grayscale, 1 = original, 2=max saturation

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
    dA[i] += 255 * ((typeof van === "undefined"?val:van) / 100);
    dA[i+1] += 255 * ((typeof van === "undefined"?val:van) / 100);
    dA[i+2] += 255 * ((typeof van === "undefined"?val:van) / 100);
  }
  
  var factor = (259.0 * ((typeof conn === "undefined"?cont:conn) + 255.0)) / (255.0 * (259.0 - (typeof conn === "undefined"?cont:conn)));

  for (var i = 0; i < dA.length; i+= 4) {
    dA[i] = (factor * (dA[i] - 128.0) + 128.0);
    dA[i+1] = (factor * (dA[i+1] - 128.0) + 128.0);
    dA[i+2] = (factor * (dA[i+2] - 128.0) + 128.0);
  }
  canvas.getContext('2d').putImageData(iD, 0, 0);
//console.log(val, cont,sat)
  }
}
let dg=0;
function flippinTime(wziu, bziu, dg){
   const ctx = canvas.getContext("2d")
   if(wziu==1){
     if(dg==0||dg==360||dg==-360||dg==180||dg==-180){ 
       ctx.translate(0,canvas.height);
       ctx.scale(1,-1)
      }
     else if(dg==90||dg==-270||dg==270||dg==-90){
       ctx.translate(canvas.height,0); 
       ctx.scale(-1,1)
      }
    }
   else if(wziu==-1){
     if(dg==0||dg==360||dg==-360||dg==180||dg==-180){ 
       ctx.translate(canvas.width,0); 
       ctx.scale(-1,1)
      }
     else if(dg==90||dg==-270||dg==270||dg==-90){
       ctx.translate(0,canvas.width); 
       ctx.scale(1,-1)
      }
    }
   else {
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
   if(dg==90 ||dg==-270){
    canvas.setAttribute("width", img.height*test)
    canvas.setAttribute("height", img.width*test)
    ctx.translate(canvas.width,0)
    ctx.rotate(dg * Math.PI / 180)
   }
   else if(dg==180||dg==-180){
    canvas.setAttribute("width", img.width*test)
    canvas.setAttribute("height", img.height*test)
    ctx.translate(canvas.width,canvas.height)
    ctx.rotate(dg * Math.PI / 180)
   }
   else if(dg==270||dg==-90){
    canvas.setAttribute("width", img.height*test)
    canvas.setAttribute("height", img.width*test)
    ctx.translate(0,canvas.height)
    ctx.rotate(-90 * Math.PI / 180)
   }
   else if(dg==0 || dg==360 ||dg==-360){
    canvas.setAttribute("width", img.width*test)
    canvas.setAttribute("height", img.height*test)
    ctx.translate(0,0)
    ctx.rotate(dg * Math.PI / 180)
   }
   }
   setBrightness()
}

//    ctx.fillStyle = 'blue';
//ctx.fillRect(0, 0,600, 337);

  function checkvanvs() {
    setFile(null)
    var cnv = canva.current
    const ctx = cnv.getContext("2d")
    if (isCanvasEmpty(cnv))
        alert('Empty!');
    else
    ctx.clearRect(0, 0, cnv.width, cnv.height)
    cnv.width=600;
    cnv.height=600;
    setVal(0)
    setCont(0)
    setSat(100)
        
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
  if(a==4){
//shapeCanvas.width=canvas.width
  //shapeCanvas.height=canvas.height;
  }
}


function applyFilter(van, conn, satn){
setVal(van)
setCont(conn)
setSat(satn)
}

  let isDown = false;
  let dragTarget = null;
  let startX = null;
  let startY = null;
  
  
  function drawShapes(){
    if(shapeCanvas !==null) {
    shapeCanvas.getContext("2d").clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);
    dimensionArray.forEach(dim=>draw(dim))}
  }
function draw(dim){
  let ctx = shapeCanvas.getContext("2d")
  let {x,y,w,h,color,shape,text,ffont} = dim;
  switch(shape){
    
  }
  if(shape==="rectangle"){
    ctx.beginPath(); //rectangle
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);}
    else if(shape==="words"){
      ctx.beginPath(); //woords
     ctx.fillStyle = color;
      ctx.save();
      ctx.fillStyle = "rgba(255, 255, 255, 0.0)"
      ctx.fillRect(x, y, w, h);
      ctx.restore()
     ctx.font = "30px" + " " + ffont;
      ctx.fillText(text, x, y+(h/2));  
    }
  else{
    ctx.beginPath(); //triangle
    ctx.fillStyle = color;
    ctx.moveTo(x,y);
    ctx.lineTo(x+w,y);
    ctx.lineTo(x,y+h);
    ctx.fill();
  }

//   ctx.beginPath(); //woords
//   ctx.fillStyle = 'green';
//   ctx.save();
//    ctx.fillStyle = "rgba(255, 255, 255, 0.0)"
//     ctx.fillRect(x, y, 30, 50);
//     ctx.restore()
//     ctx.font = "30px Arial";
// ctx.fillText("Hello World", x, y);  
}

const hitBox = (x, y) => {
  let isTarget = true;
  console.log(dimensionArray)
  for (let i = 0; i <dimensionArray.length; i++) {
    const box = dimensionArray[i];
    if (x >= box.x && x <= box.x + box.w && y >= box.y && y <= box.y + box.h) {
      dragTarget = box; //currently dragged element
      isTarget = true;
      break;
    }
  }
  return isTarget;
}
const handleMouseDown = e => {
  startX = parseInt(e.nativeEvent.offsetX)// - shapeCanvas.clientLeft);
  startY = parseInt(e.nativeEvent.offsetY)
  isDown = hitBox(startX, startY);
}

const handleMouseMove = e => {
  if (!isDown) return;

  const mouseX = parseInt(e.nativeEvent.offsetX)
  const mouseY = parseInt(e.nativeEvent.offsetY)
  const dx = mouseX - startX;
  const dy = mouseY - startY;
  startX = mouseX;
  startY = mouseY;
  dragTarget.x += dx;
  dragTarget.y += dy;
  drawShapes();
}
const handleMouseUp = e => {
  dragTarget = null;
  isDown = false;
}
const handleMouseOut = e => {
  dragTarget = null;
  isDown = false;
}

function inputChange(e){
  setInput(e.target.value);
}
function giveInputColor(e){
setInputColor(e.target.value)
}

function changeFont(){
console.log('działa')
setFont('Festive')
}

    return (
      <div className="app">
        <Menu menuRef={list}  onClick={menu} />
        <Options>
          <Uploader op={menus}   onChange={addFile}/>
          <Delete op={menus} onClick={checkvanvs}/>
          <Slider op={menus}  name="Brightness" value={val} min={"-70"} max={"70"} onClickRight={()=>setVal(val+3)} onClickLeft={()=>{setVal(val-3)}} />
          <Slider op={menus} name="Contrast" value={cont} min={"-70"} max={"70"} onClickRight={()=>{setCont(cont+3)}} onClickLeft={()=>{setCont(cont-3)}}/> 
          <Slider op={menus}  name="Saturation" value={sat} min={"0"} max={"200"} onClickRight={()=>{setSat(sat+3)}} onClickLeft={()=>{setSat(sat-3)}}/>
          <Filters op={menus} filterCanvaRef={filterCanva}>
            <FiltersOpt op={menus} class="normal" title="Normal" onClick={()=>applyFilter(0,0,100)}/>
            <FiltersOpt op={menus} class="gloomy" title="Gloomy days" onClick={()=>applyFilter(0,-21,139)}/>
            <FiltersOpt op={menus} class="gray" title="Grayscale" onClick={()=>applyFilter(-12,15,1)}/>
            <FiltersOpt op={menus} class="retro" title="Retro" onClick={()=>applyFilter(0,-15,64)}/>
            <FiltersOpt op={menus} class="sunny" title="Sunny beach" onClick={()=>applyFilter(0,21,187)}/>
            <FiltersOpt op={menus} class="sweet" title="Sweet rose" onClick={()=>applyFilter(0,57,55)}/>
          </Filters>
          <Flippin op={menus} name="Flip" horr="Horizontally" verr="Vertically" hor={function(){flippinTime(1,-1,dg)}} ver={function(){flippinTime(-1,1,dg)}}/>
          <Flippin op={menus} name="Rotate" horr="Left" verr="Right" hor={function(){if(dg==-360){dg=0}dg-=90;flippinTime(0,-1, dg)}} ver={function(){if(dg==360){dg=0}dg+=90;flippinTime(0,1, dg)}}/> 
          <Writing op={menus} onClick={()=>{setDimensionArray(dimensionArray=>[...dimensionArray,{ x: 100, y: 120, w: 200, h: 50, color:inputColor, shape:"words", text:inputVal, ffont:font}]);}}/>
          <Inpute op={menus}  type="text" onChange={inputChange}/>
          <Inpute op={menus} type="color" onChange={giveInputColor}/>
          <Shapes op={menus} onClick={()=>{setDimensionArray(dimensionArray=>[...dimensionArray,{ x: 100, y: 120, w: 200, h: 50, color:"gray", shape:"rectangle" }]);}} />
          <Shapes op={menus} onClick={()=>{setDimensionArray(dimensionArray=>[...dimensionArray,{ x: 100, y: 120, w: 80, h: 80, color:"pink" }]);}} />
          <DeleteDrawing op={menus} name="Delete" onClick={()=>{setDimensionArray([]);}} />
          </Options>
        
        <ImageUpload canvaRef={canva} shapeCanvaRef={shapeCanva} imageRef={image} src={file} 
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseOut} />
    
      </div>
    );
  
}

export default App;

