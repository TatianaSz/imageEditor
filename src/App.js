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
import Shapes from './Shapes'
import Inpute from './Inpute'
import DeleteDrawing from "./DeleteDrawing"
import FontContainer from "./FontContainer"
import ChooseFont from './ChooseFont'
import TextDimnesion from './TextDimension';
import CropDrag from "./CropDrag"
import "./../node_modules/normalize.css/normalize.css"
import "./css/app.css";



function App() {
  const canva = useRef(null);
  const image = useRef(null);
  const list = useRef(null);
  const filterCanva = useRef(null)
  const shapeCanva = useRef(null)
  const dim = useRef(null)
  

  const [file, setFile] = useState(null);
  const [val, setVal] = useState(0);
  const [cont, setCont] = useState(0);
  const [sat, setSat] = useState(100);
  const [menus, setMenus] = useState("0")
  const [test, setTest] =useState([])
  const [scaleF, setScaleFill]=useState(0)
  const [dimensionArray, setDimensionArray]=useState([])
  let [inputVal, setInput] =useState("")
  let [inputColor, setInputColor] =useState("black")
  let [font, setFont] = useState("Catamaran")
  let [size, setSize] = useState(20)
  let [deg,setDeg] = useState(0)
  let plswork = useRef({ x: -100, y: 0, w: 0, h: 0, color:inputColor, shape:"words", text:inputVal, ffont:font, fontSize:size, chosen:false})
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
 let dg=0;
 
  function setBrightness(){
   if(img!=null&&img.width){ //checks if image is even there in case someone tried to lighten nothing
   reDraw()
   
    let iD=(dg==90||dg==-90||dg==270||dg==-270? canvas.getContext('2d').getImageData(0, 0, img.height, img.width):canvas.getContext('2d').getImageData(0, 0, img.width, img.height))
   let dA = iD.data;
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
    dA[i] += 255 * (val/100);
    dA[i+1] += 255 * (val/ 100);
    dA[i+2] += 255 * (val/100);
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

function rotato(x,y,w,h,rad){
  let ctx = shapeCanvas.getContext("2d")
  ctx.translate(x + w / 2, y + h / 2);
  ctx.rotate(rad); 
  ctx.translate(-(x + w / 2), -(y + h / 2));
}

function applyFilter(van, conn, satn){
setVal(van)
setCont(conn)
setSat(satn)
}

function drawCircle(x, y, radius) {
  let ctx = shapeCanvas.getContext("2d")
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
}
function drawHandles(x,y,w,h) {
  drawCircle(x, y, 8);
  drawCircle(x + w, y, 8);
  drawCircle(x + w, y + h, 8);
  drawCircle(x, y + h, 8);
}


  let isDown = false;
  let dragTarget = null;
  let startX = null;
  let startY = null;
  
  function drawShapes(){
    if(shapeCanvas !==null) {
    shapeCanvas.getContext("2d").clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);
    dimensionArray.forEach(dim=>draw(dim))
  } }

function draw(dim){
  let ctx = shapeCanvas.getContext("2d")
  let {x,y,w,h,color,shape,text,ffont,fontSize,rot,chosen} = dim;
  switch(shape){
  }
  if(shape==="rectangle"){
    ctx.save()
    var rad = rot * Math.PI / 180;
    rotato(x,y,w,h,rad)
    ctx.beginPath(); //rectangle
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
    drawHandles(x,y,w,h)
    ctx.restore();
    
  }
    else if(shape==="words"){
      ctx.save()
    var rad = rot * Math.PI / 180;
    rotato(x,y,w,h,rad)
      ctx.beginPath(); //woords
     ctx.fillStyle = color;
      ctx.save();
      if(chosen){
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
      }
      else{
        ctx.fillStyle = "rgba(255, 255, 255, 0.0)"
      }
      ctx.fillRect(x,y, w, h);
      ctx.restore()
     ctx.font = fontSize +"px" + " " + ffont;
    
      ctx.fillText(text, x, y+(h*0.85));  
      ctx.restore();
    }
  else{
    ctx.beginPath(); //triangle
    ctx.fillStyle = color;
    ctx.moveTo(x,y);
    ctx.lineTo(x+w,y);
    ctx.lineTo(x,y+h);
    ctx.fill();
  }
}

let pointX1;
let pointY1;
let pointX2;
let pointY2;
let originX;
let originY;
let firstX;
let secondX;
let firstY;
let secondY;



const hitBox = (x, y) => {
  let isTarget = true;
  let degg;
  for (let i = 0; i <dimensionArray.length; i++) {
    const box = dimensionArray[i];
    
    if(deg<=90&&deg>=0||(deg>180&& deg<=270)){
      if(deg>180){
        degg= (deg * Math.PI / 180)-(180*Math.PI/180);
      }
      else{
      degg= deg * Math.PI / 180;}
      originX=(box.x+(box.w/2))
      originY=(box.y+(box.h/2));
      pointX1=box.x
      pointY1 = box.y
      pointX2=(box.x+box.w);
      pointY2 =(box.y+box.h)
     // console.log(originX,originY)
    }
    else if((deg>90&&deg<=180)||(deg>270&&deg<=360)){
      if(deg<=180){
      degg= (deg * Math.PI / 180)-(90*Math.PI/180);}
      else{
        degg= (deg * Math.PI / 180)-(270*Math.PI/180);
      }
      pointX1=Math.cos(90*Math.PI/180)*(box.x-(box.x+(box.w/2)))-Math.sin(90*Math.PI/180)*((box.y+box.h)-(box.y+(box.h/2)))+(box.x+(box.w/2));
      pointY1 = Math.sin(90*Math.PI/180)*(box.x-(box.x+(box.w/2)))+Math.cos(90*Math.PI/180)*(box.y-(box.y+(box.h/2)))+(box.y+(box.h/2));
      pointX2=(Math.cos(90*Math.PI/180)*(box.x-(box.x+(box.w/2)))-Math.sin(90*Math.PI/180)*((box.y+box.h)-(box.y+(box.h/2)))+(box.x+(box.w/2)))+box.h
      pointY2 =(Math.sin(90*Math.PI/180)*(box.x-(box.x+(box.w/2)))+Math.cos(90*Math.PI/180)*(box.y-(box.y+(box.h/2)))+(box.y+(box.h/2)))+box.w
      originX=(Math.cos(90*Math.PI/180)*(box.x-(box.x+(box.w/2)))-Math.sin(90*Math.PI/180)*((box.y+box.h)-(box.y+(box.h/2)))+(box.x+(box.w/2))+(box.h/2))
     originY=(Math.sin(90*Math.PI/180)*(box.x-(box.x+(box.w/2)))+Math.cos(90*Math.PI/180)*(box.y-(box.y+(box.h/2)))+(box.y+(box.h/2))+(box.w/2));
    }
    // else if(deg<0&&deg>-90){
    //   //console.log("minus")
    //   degg= (deg * Math.PI / 180);
    //   originX=(box.x+(box.w/2))
    //   originY=(box.y+(box.h/2));
    //   pointX1=box.x
    //   pointY1 = box.y
    //   pointX2=(box.x+box.w);
    //   pointY2 =(box.y+box.h)
    //   console.log(pointX1,pointX2,pointY1,pointY2)
    // }
    firstX =Math.cos(degg)*(pointX1-originX)-Math.sin(degg)*(pointY2-originY)+originX;
    secondX = Math.cos(degg)*(pointX2-originX)-Math.sin(degg)*(pointY1-originY)+originX;
    firstY =Math.sin(degg)*(pointX1-originX)+Math.cos(degg)*(pointY1-originY)+originY;
    secondY =(pointX2-originX)*Math.sin(degg)+Math.cos(degg)*(pointY2-originY)+originY;
    //console.log("x,y",pointX1,pointY1,firstX,firstY,"x2,y2:", pointX2,pointY2, secondX,secondY)
       if ((x >= firstX) && x <= (secondX) && y >= (firstY) && y <= (secondY))
    {
      dragTarget = box; //currently dragged element
      plswork.current=box;
      isTarget = true;
      break;
    }
  }
  return isTarget;
}
// (x >= ((box.x-(box.x+(box.w/2)))*Math.cos(degg)-Math.sin(degg)*((box.y+box.h)-(box.y+(box.h/2)))+(box.x+(box.w/2))) && x <= (((box.x+box.w)-(box.x+(box.w/2)))*Math.cos(degg)-Math.sin(degg)*(box.y-(box.y+(box.h/2)))+(box.x+(box.w/2))) && y >= ((box.x-(box.x+(box.w/2)))*Math.sin(degg)+Math.cos(degg)*(box.y-(box.y+(box.h/2)))+(box.y+(box.h/2))) && y <= (((box.x+box.w)-(box.x+(box.w/2)))*Math.sin(degg)+Math.cos(degg)*((box.y+box.h)-(box.y+(box.h/2)))+(box.y+(box.h/2))))

const handleMouseDown = e => {
  startX = parseInt(e.nativeEvent.offsetX)
  startY = parseInt(e.nativeEvent.offsetY)
  isDown = hitBox(startX, startY);
  for (let i = 0; i <dimensionArray.length; i++) {
    dimensionArray[i].chosen=false;
  }
  if(dragTarget!=null){
  plswork.current.chosen=true;
  dim.current.style.fontFamily=plswork.current.ffont;
  dim.current.innerHTML = plswork.current.text;
  }
  else{
    plswork.current.chosen=false;
    dragTarget=null;
    plswork.current =null;
  }
  drawShapes()
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
  dim.current.innerHTML=e.target.value

}
function giveInputColor(e){
    setInputColor(e.target.value)
    plswork.current.color=e.target.value
    setDimensionArray((dimensionArray=>[...dimensionArray].splice(dimensionArray.indexOf(plswork.current),1,plswork.current),dimensionArray))
    drawShapes()
    
}

function changeNumber(e){
  setSize(e.target.value)
  dim.current.style.fontSize = e.target.value + "px"
  if(plswork.current!=null){
  plswork.current.fontSize=e.target.value
  plswork.current.w=dim.current.clientWidth
  plswork.current.h=dim.current.clientHeight}
  setDimensionArray((dimensionArray=>[...dimensionArray].splice(dimensionArray.indexOf(plswork.current),1,plswork.current),dimensionArray))
  drawShapes()
}

function rotateText(e){
  setDeg(e.target.value)
  if(plswork.current!=null){
    plswork.current.rot=e.target.value;
    setDimensionArray((dimensionArray=>[...dimensionArray].splice(dimensionArray.indexOf(plswork.current),1,plswork.current),dimensionArray))
  }
  drawShapes()
}

function changeFont(e){
      setFont(e.target.dataset.fonts)
plswork.current.ffont=e.target.dataset.fonts
dim.current.style.fontFamily=e.target.dataset.fonts
plswork.current.w=dim.current.clientWidth
plswork.current.h=dim.current.clientHeight
setDimensionArray((dimensionArray=>[...dimensionArray].splice(dimensionArray.indexOf(plswork.current),1,plswork.current),dimensionArray))
drawShapes()
}

function deleteCurrent(){
  setDimensionArray(dimensionArray=>[...dimensionArray].filter((element,index)=>index!=dimensionArray.indexOf(plswork.current)))
   drawShapes()
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
          
            <Inpute op={menus}  type="text" inputLabel="Write your text:" onChange={inputChange}/>
            <Inpute op={menus} type="color" inputLabel="Choose text color: " onChange={giveInputColor}/>
            <Inpute op={menus} type="number" inputLabel="Change text size:" onChange={changeNumber}/>
            <Inpute op={menus} type="number" inputLabel="Rotate text:" onChange={rotateText}/>
            <Shapes op={menus} generic="3" name="Add your text" onClick={()=>{setDimensionArray(dimensionArray=>[...dimensionArray,{ x: 100, y: 120, w:dim.current.clientWidth, h:dim.current.clientHeight, color:inputColor, shape:"words", text:inputVal, ffont:font, fontSize:size, rot:deg, chosen:false}])}}/>
            <FontContainer op={menus} generic="3">
              <ChooseFont op={menus} generic="3" chosen="Festive" text="Holding out for a Hero"  onClick={changeFont}/>
              <ChooseFont op={menus} generic="3" chosen="Cookie" text="Where have all the good men gone"  onClick={changeFont}/>
              <ChooseFont op={menus} generic="3" chosen="Catamaran" text="And where are all the gods?"  onClick={changeFont}/>
              <ChooseFont op={menus} generic="3" chosen="Bangers" text="'Til the morning light"  onClick={changeFont}/>
              <ChooseFont op={menus} generic="3" chosen="Amatic SC" text="Fresh from the fight"  onClick={changeFont}/>
              <ChooseFont op={menus} generic="3" chosen="Gloria Hallelujah" text="Larger than life"  onClick={changeFont}/>
              <ChooseFont op={menus} generic="3" chosen="Indie Flower" text="Somwhere after midnight"  onClick={changeFont}/>
              <ChooseFont op={menus} generic="3" chosen="Lobster" text="In my wildest fantasy"  onClick={changeFont}/>
              <ChooseFont op={menus} generic="3" chosen="Nanum Pen Script" text="Racing on the thunder"  onClick={changeFont}/>
              <ChooseFont op={menus} generic="3" chosen="Pacifico" text="Rising with the heat"  onClick={changeFont}/>
              <ChooseFont op={menus} generic="3" chosen="Permanent Marker" text="Sweep me off my feet"  onClick={changeFont}/>
              <ChooseFont op={menus} generic="3" chosen="VT323" text="Splits the sea"  onClick={changeFont}/>
              <ChooseFont op={menus} generic="3" chosen="Sigmar One" text="Where the mountains meet the heavens"  onClick={changeFont}/>
              <ChooseFont op={menus} generic="3" chosen="Yellowtail" text="Like the fire in my blood"  onClick={changeFont}/>
            </FontContainer>
            <TextDimnesion dimRef={dim} op={menus}/>
         
          <Shapes op={menus} generic="4" onClick={()=>{setDimensionArray(dimensionArray=>[...dimensionArray,{ x: 100, y: 120, w: 200, h: 50, color:"gray", shape:"rectangle" , rot:deg }]);}} />
          <Shapes op={menus} generic="4" onClick={()=>{setDimensionArray(dimensionArray=>[...dimensionArray,{ x: 100, y: 120, w: 80, h: 80, color:"pink" }]);}} />
          <DeleteDrawing op={menus} name="Delete" onClick={()=>deleteCurrent()} />
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

