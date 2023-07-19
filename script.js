const canvas = document.querySelector('.canvas');

const colorContainer = document.querySelector('.color-container')
const colorPicker = document.querySelector('#color-picker');

const deleteSfx = new Audio('./resources/delete-sfx.mp3');

colorPicker.addEventListener('input', ()=>{
    colorContainer.style.backgroundColor = colorPicker.value;
});

let mode = 'brush';

const buttons = document.querySelectorAll('.buttons button');
buttons.forEach((button) => {
    button.addEventListener('click', (e) =>{
        if(button.id != 'clear'){
            mode = button.id; 
            toggleCurrentMode();
        }
    });
    
});

const clear = document.querySelector('#clear');
const slider = document.querySelector('#size-slider');
const sizeInfo = document.querySelector('#size-info');

slider.addEventListener('input', (e) => {
    rerenderInfo();
    rerenderGrid();
});
clear.addEventListener('click', reset);

rerenderGrid();
toggleCurrentMode();


function reset(){
    slider.value = 16;
    colorPicker.value = 'black';
    colorContainer.style.backgroundColor = colorPicker.value;
    mode = 'brush';
    toggleCurrentMode();
    rerenderInfo();
    rerenderGrid();
    deleteSfx.play();
}
function rerenderGrid(){
    canvas.innerHTML = '';
    generateGrid(slider.value, slider.value);
}
function rerenderInfo(){
    sizeInfo.textContent = slider.value + ' x ' +slider.value;
}
function generateGrid(width, height){
    for(let i =0; i<height;i++){
        const row = document.createElement('div');
        row.classList.add('gridRow');
        for(let j = 0; j<width;j++){
            const gridEl = document.createElement('div');
            gridEl.classList.add('gridEl');
            gridEl.addEventListener('mousedown', changeColor);
            gridEl.addEventListener('mouseover', changeColor);
            row.appendChild(gridEl);
        }
        canvas.appendChild(row);
    }
}
let deg = 0;
function changeColor(e){
    const drawCondition = e.type === 'mouseover' && e.buttons==1 || e.type === 'mousedown';
    if (drawCondition && mode == 'brush'){
        e.target.style.backgroundColor= colorPicker.value;
    }
    else if(drawCondition && mode == 'eraser'){
        e.target.style.backgroundColor = 'white';
    }
    else if(drawCondition && mode == 'rainbow'){
        
        e.target.style.backgroundColor = `hsl(${deg},100%,50%)`;
        deg = (deg + (360/7)) % 360;

    }
    
}

function toggleCurrentMode(){
    [].forEach.call(document.querySelectorAll('.toggled'),(b) => b.classList.remove('toggled'));
    buttons.forEach(button =>{ if(button.id==mode)button.classList.add('toggled')});
}
