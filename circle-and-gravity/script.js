/** @type {HTMLCanvasElement} */
let canvas = document.getElementById("gravity-animation");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");

const gravity = 0.5;
const friction = 0.7;

function Circle(x, y, radius, dx, dy, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = color;

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2* Math.PI);
        c.fillStyle = this.color;
        c.fill();
        c.stroke()

        console.log("drew");
    };

    this.update = function(){
        
    };
}

let circleArray = [];

let numberOfCircle = 100;

for(let i = 0; i < numberOfCircle; i++){
    //add the randomisation

    circleArray.push();
}

function animate(){
    requestAnimationFrame(animate);

    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    
    // circ.update();
}

animate();
