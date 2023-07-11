const canvas = document.querySelector('.canvas');

const colorPicker = document.querySelector('#color-picker');
let mode = 'brush';

const buttons = document.querySelectorAll('.buttons button');
buttons.forEach((button) => {
    button.addEventListener('click', (e) =>{
        mode = button.id; 
    });
    
});

const clear = document.querySelector('#clear');
const slider = document.querySelector('#size-slider');
const sizeInfo = document.querySelector('#size-info');

slider.addEventListener('input', (e) => {
    rerenderInfo();
    rerenderGrid();
});
clear.addEventListener('click', () => {
    slider.value = 16;
    rerenderInfo();
    rerenderGrid();
});
rerenderGrid();


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
function changeColor(e){
    const drawCondition = e.type === 'mouseover' && e.buttons==1 || e.type === 'mousedown';
    if (drawCondition && mode == 'brush'){
        e.target.style.backgroundColor = 'black';
    }
    else if(drawCondition && mode == 'eraser'){
        e.target.style.backgroundColor = 'white';
    }
    
}