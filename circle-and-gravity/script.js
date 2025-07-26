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

        console.log(`coordinate: x: ${this.x}, y: ${this.y}, dx: ${this.dx}, dy: ${this.dy}`);
    };

    this.update = function(){

        if(this.y + this.dy + this.radius > window.innerHeight){ //check bottom
            this.dy = -this.dy * 0.3; //add loos of energy when bouncing
        }

        if(this.x + this.dx + this.radius > window.innerWidth || this.x + this.dx - this.radius < 0){
            this.dx = -this.dx;
        }

        this.y = this.y + this.dy;
        this.x = this.x + this.dx;

        this.dy ++;

        let friction  = 0.2;
        if(this.dx < 0){
            this.dx += friction;
        }
        if(this.dx > 0){
            this.dx -= friction;
        }

        this.draw();
    };
}

let circleArray = [];

let numberOfCircle = 1;

for(let i = 0; i < numberOfCircle; i++){
    //randomize the value
    let x = Math.floor(Math.random() * window.innerWidth);
    let y = Math.floor(Math.random() * window.innerHeight);
    let radius = 30; // constant for now 
    let dx = 30;
    let dy = 3;
    let color = "red";

    //prevent circle partially on screen (clipping)
    let margin = 5; //margin for goodluck
    //check right side
    if(x + radius > window.innerWidth){
        x = window.width - radius - margin;
    }

    //check left side
    if(x - radius < 0){
        x = radius + margin;
    }

    //check top side
    if(y - radius < 0){
        y = radius + margin;
    }

    //check bottom side
    if(y + radius > window.innerHeight){
        y = window.innerHeight - radius - margin;
    }


    circleArray.push(new Circle(x, y, radius, dx, dy, color));
}

function animate(){
    requestAnimationFrame(animate);

    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for(let i = 0; i < circleArray.length; i ++){
        console.log(`circle ${i}`);
        circleArray[i].update();
    }
}

animate();
