document.addEventListener("click", function(){
    console.log("page is clicked");
    getQuote();
    hitMark(mouse.x, mouse.y, 15);
})

const quoteContainer = document.getElementById("quote");
const authorContainer = document.getElementById("author");

async function getQuote(){
    try{
        let index = Math.floor(Math.random() * 1454)
        const response = await fetch(`https://dummyjson.com/quotes/${index}`);//1454 total quotes
        const quote = await response.json();

        console.log(quote);
        quoteContainer.innerText = `"${quote.quote}"`;
        authorContainer.innerText = `- ${quote.author}`;
        
    }
    catch(e){
        console.log(`error dumbass: ${e}`);
    }
}

//click animation

/** @type {HTMLCanvasElement} */
let canvas = document.querySelector("#click-animation");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

let mouse = {
    x: undefined,
    y: undefined
};

document.addEventListener("mousemove", function(e){
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})

function hitMark(x, y, lineLength){
    this.x = x;
    this.y = y;
    this.lineLength = lineLength;

    this.draw = function(){
        c.beginPath();
        c.moveTo(mouse.x, mouse.y);
        c.lineTo(mouse.x - lineLength, mouse.y - lineLength);
        c.strokeStyle = "white";
        c.stroke();

        c.beginPath();
        c.moveTo(mouse.x, mouse.y);
        c.lineTo(mouse.x + lineLength, mouse.y - lineLength);
        c.strokeStyle = "white";
        c.stroke();

        c.beginPath();
        c.moveTo(mouse.x, mouse.y);
        c.lineTo(mouse.x - lineLength, mouse.y + lineLength);
        c.strokeStyle = "white";
        c.stroke();

        c.beginPath();
        c.moveTo(mouse.x, mouse.y);
        c.lineTo(mouse.x + lineLength, mouse.y + lineLength);
        c.strokeStyle = "white";
        c.stroke();

        setTimeout(() => {
            c.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }, 75);
    }

    this.draw();

    
}



// function animate(){
//     requestAnimationFrame(animate);

//     c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    

// }