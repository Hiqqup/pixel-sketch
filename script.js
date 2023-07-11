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
    colorPicker.value = 'black';
    mode = 'brush';
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
        e.target.style.backgroundColor= colorPicker.value;
    }
    else if(drawCondition && mode == 'eraser'){
        e.target.style.backgroundColor = 'white';
    }
    else if(drawCondition && mode == 'rainbow'){
        rgb = returnRainbow();
        e.target.style.backgroundColor = `rgb(${rgb[0]},${rgb[1]},${rgb[2]}, 1)`;
    }
    
}
function returnRainbow(){
    let arr = [Math.random(), Math.random(), Math.random()];
    for(let i = 0; i <3; i++){
        arr[i] = (Math.round(arr[i] *0.99 ));
    }
    let sum = 0;
    for(let i = 0; i <3; i++){
        sum += arr[i];
    }
    if(sum == 0){
        arr[0] = 1;
    }
    else if (sum == 3){
        arr[0] = 0;
    }
    for(let i = 0; i <3; i++){
        arr[i] /= 1.1;
        arr[i] *= 255; 
    }
    
    return arr;
}