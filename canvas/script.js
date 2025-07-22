/** @type {HTMLCanvasElement} */
let canvas = document.querySelector("#balls");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

window.addEventListener("resize", function(){
    canvas.width = this.window.innerWidth;
    canvas.height = this.window.innerHeight;
});

//store the mouse location
let mouse = {
    x: undefined,
    y: undefined
}
window.addEventListener("mousemove", function(event){
    mouse.x = event.layerX;
    mouse.y = event.layerY;
});


function Circle(x, y, radius, dx, dy, color, minRadius){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.minRadius = minRadius;

    this.draw = function() {
        c.beginPath();
        c.arc(x, y, radius, 0, 2 * Math.PI);
        c.fillStyle = color;
        c.fill();
    };

    this.update = function(){

        //check if the circle hit the border
        if(x + radius > window.innerWidth || x - radius < 0){
            dx = -dx;
        }
        if(y + radius > window.innerHeight || y - radius < 0){
            dy = -dy;
        }

        //move the circle according to the velocity
        x = x + dx;
        y = y + dy;

        //modify the cirlce when near the mouse
        let area = 70;
        if(x - mouse.x < area && x - mouse.x > -area && y - mouse.y < area && y - mouse.y > -area){
            if(radius < 40){
                radius += 1;
            }
        }
        else{
            if(radius > minRadius + 1){
                radius--;
            }
        }

        this.draw();
    }
};

let circleArray = [];

const colorPalette = [
    "#B33791",
    "#C562AF",
    "#DB8DD0",
    "#FEC5F6"
];

for(let i = 0; i < 1000; i++){ // store circle to array
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    let radius = Math.random() * 10;

    // check if the circle spawn outside of the canvas
    if(x - radius < 0){
        x = radius;
    }
    if(x + radius > window.innerWidth){
        x = window.innerWidth - radius;
    }

    if(y - radius < 0){
        y = radius
    }
    if(y + radius > window.innerHeight){
        y = window.innerHeight - radius;
    }

    // velocity
    let dx = (Math.random() - 0.5) * 5;
    let dy = (Math.random() - 0.5) * 5;

    // random color
    let color = colorPalette[Math.floor(Math.random() * colorPalette.length)]


    circleArray.push(new Circle(x, y, radius, dx, dy, color, radius));
}

function animate(){

    requestAnimationFrame(animate);

    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for(let i = 0; i < circleArray.length; i++){ // load the circle
        circleArray[i].update();
    }
}

animate();

