const body = document.querySelector('body');
const button = document.querySelector('button');
const hexValueElem = document.getElementById('hex');

const chars = [0,1,2,3,4,5,6,7,8,9,'A', 'B', 'C', 'D', 'E', 'F']; 

button.addEventListener('click', ChangeColor);

function ChangeColor(){

    var hexValue = '#';

    for(i = 0; i < 6; i++){
        index = parseInt(Math.random() * chars.length);
        hexValue += chars[index];
    }

    body.style.backgroundColor = hexValue;
    hexValueElem.textContent = hexValue;
}