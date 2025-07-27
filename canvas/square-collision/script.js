/** @type {HTMLCanvasElement} */
let canvas = document.getElementById("bouncing-square");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");

let squareArray = [];
let numberOfSquare = 20;

function checkBounceHorizontal(i, j){
    //check left and right
    if(squareArray[i].x + squareArray[i].length / 2 > squareArray[j].x &&
        squareArray[i].x < squareArray[j].x + squareArray[j].length/2 &&
        Math.abs(squareArray[i].y + squareArray[i].length/2 - squareArray[j].y) < squareArray[i].length){
        // this.dx = -this.dx;
        return true;
    }

    return false


}

function checkBounceVertical(i, j){
    if(squareArray[i].y + squareArray[i].length / 2 > squareArray[j].y &&
        squareArray[i].y < squareArray[j].y &&
        squareArray[i].x + squareArray[i].length / 2 < squareArray[j].x){
        return true
    }

    return false
}

function Square(x, y, dx, dy, length, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.length = length;
    this.color = color;

    this.draw = function(){
        c.beginPath();
        c.fillStyle = this.color;
        c.fillRect(this.x - length/2, this.y - length/2, this.length, this.length);
    }

    this.update = function(){
        //bounce left and right page
        if(this.x - this.length/2 < 0 || this.x + this.length/2 > window.innerWidth){
            this.dx = -this.dx;
        }

        //bounce top and bottom page
        if(this.y - this.length/2 < 0 || this.y + this.length/2 > window.innerHeight){
            this.dy = -this.dy;
        }

        //bounce with other square
        // for(let i = 0; i < squareArray.length; i++){
        //     for(let j = squareArray.length - 1; j >= 0; j--){
        //         //check left-right
        //         if(checkBounceHorizontal(i, j)){
        //             this.dx = - this.dx;
        //         }
        //         // if(checkBounceVertical(i, j)){
        //         //     this.dy = - this.dy;
        //         // }
        //     }
        // }

        this.x = this.x + this.dx;
        this.y = this.y + this.dy;

        this.draw();
    }
}

for(let i = 0; i < numberOfSquare; i ++){
    let x = Math.floor(Math.random() * window.innerWidth);
    let y = Math.floor(Math.random() * window.innerHeight);

    let dx = 5;
    let dy = 5;

    let length = 50;
    let color = "blue";

    //prevent clipping top
    if(y - length / 2 < 0){
        y = length/2;
    }

    //prevent clipping bottom
    if(y + length / 2 > window.innerHeight){
        y = window.innerHeight - length/2;
    }

    //prevent clipping left
    if(x - length / 2 < 0){
        x = length/2;
    }

    //prevent clipping right
    if(x + length/2 > window.innerWidth){
        x = window.innerWidth - length/2;
    }

    squareArray.push(new Square(x, y, dx, dy, length, color));
}

function detectCollisions() {
    for (let i = 0; i < squareArray.length; i++) {
        for (let j = i + 1; j < squareArray.length; j++) {
            let a = squareArray[i];
            let b = squareArray[j];

            if (
                Math.abs(a.x - b.x) < a.length &&
                Math.abs(a.y - b.y) < a.length
            ) {
                // basic bounce: swap dx and dy
                let tempDx = a.dx;
                let tempDy = a.dy;

                a.dx = b.dx;
                a.dy = b.dy;

                b.dx = tempDx;
                b.dy = tempDy;
            }
        }
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    detectCollisions();

    for(let i = 0; i < squareArray.length; i++){
        squareArray[i].update();
    }
}

animate();
