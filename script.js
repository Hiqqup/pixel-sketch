const canvas = document.querySelector('.canvas');
const clear = document.querySelector('#clear');

clear.addEventListener('click', () => {
    canvas.innerHTML = '';
    generateGrid(16, 16);
});
generateGrid(16, 16);

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