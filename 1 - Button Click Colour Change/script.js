const button = document.querySelector('button');
const body = document.querySelector('body');
const colors = ['red', 'blue', 'green' , 'yellow', 'pink'];

body.style.backgroundColor = 'blue';
button.addEventListener('click', changeBackground);

function changeBackground(){
    const color = parseInt(Math.random() * colors.length);
    body.style.backgroundColor = colors[color];
}