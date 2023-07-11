const canvas = document.querySelector('.canvas');
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
generateGrid(16, 16);
function rerenderGrid(){
    canvas.innerHTML = '';
    generateGrid(slider.value, slider.value);
}
function rerenderInfo(){
    sizeInfo.textContent = slider.value + 'x' +slider.value;
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
    if (e.type === 'mouseover' && e.buttons==1 || e.type === 'mousedown'){
        e.target.style.backgroundColor = 'black';
    }
    
}