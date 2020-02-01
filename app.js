const canvas    = document.getElementById("jsCanvas");
const ctx       = canvas.getContext("2d");
const colors    = document.getElementsByClassName("jsColor");
const range     = document.getElementById("jsRange");
const mode      = document.getElementById("jsMode");
const save      = document.getElementById("jsSave");
const INIT_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;

let painting    = false;
let filling     = false;

// canvas element의 사이즈 설정
canvas.width    = CANVAS_SIZE;
canvas.height   = CANVAS_SIZE;


// ctx의 default 설정
ctx.fillStyle   = "white";
ctx.fillRect(0,0, CANVAS_SIZE,CANVAS_SIZE); // 이미지 저장시 배경이 투명으로 되는 버그가 있음
ctx.strokeStyle = INIT_COLOR;
ctx.fillStyle   = INIT_COLOR;
ctx.lineWidth   = 2.5;

function startPainting() {
    painting = true;
}

// 페인팅 중지
function stopPainting() {
    painting = false;
}

// 캔버스 안에 마우스가 들어왔을때 좌표를 감지하고, 라인을 만든다
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();    // 시작점
        ctx.moveTo(x, y);   // 좌표값에 따라 움직이기
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();       // 채우기
    }
}
 

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;  // 선택한 color 로 override
    ctx.fillStyle  = ctx.strokeStyle;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0,0, CANVAS_SIZE,CANVAS_SIZE);
    }
}

// 우클릭시 뜨는 메뉴 방지
function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    // canvas로 그린 이미지를 데이터로 얻는다.
    const image = canvas.toDataURL(); // default = image/png 
    const link  = document.createElement("a");
    // 가짜 링크를 만들어서 클릭
    link.href = image;
    link.download = "PaintJS[EXPORT]";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM); //마우스 우클릭시 뜨는 메뉴
}

// Array.from 메소드는 object 로부터 array를 만든다
Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick));

if (range) {
    // range 는 input 에 반응함
    range.addEventListener("input", handleRangeChange);    
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (save) {
    save.addEventListener("click",handleSaveClick);
}