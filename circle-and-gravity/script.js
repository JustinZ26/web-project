/** @type {HTMLCanvasElement} */
let canvas = document.getElementById("gravity-animation");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");

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
        let energyLoss = 0.3;
        let friction  = 0.2;

        if(this.y + this.dy + this.radius > window.innerHeight){ //check bottom
            this.dy = - this.dy * energyLoss; //add loss of energy when bouncing
        }

        if(this.x + this.dx + this.radius > window.innerWidth || this.x + this.dx - this.radius < 0){
            this.dx = -this.dx;
        }

        this.y = this.y + this.dy;
        this.x = this.x + this.dx;

        
        if(this.dx < 0){
            this.dx += friction;
            friction = friction - 0.01;
        }
        if(this.dx > 0){
            this.dx -= friction;
            friction = friction - 0.01;
        }

        //if energy is too low then stop
        if(Math.abs(this.dx) < 0.1){
            this.dx = 0;
        }

        let touchingGround = this.y + this.radius >= window.innerHeight - 1; // 1 for margin of error
        let smallBounce = Math.abs(this.dy) < 0.7;

        if (touchingGround && smallBounce) {
            this.dy = 0;
            this.y = window.innerHeight - this.radius; //gently settle on the floor
        }
        else {
            this.dy += 1; //apply gravity
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
