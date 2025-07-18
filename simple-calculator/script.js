let screenItem = [];

function refreshScreen(){
    document.getElementById("screen").innerHTML = `<p>${screenItem.join("")}</p>`
}

let result = 0;
function convertAndCalculate(){
    for(let x = 0; x < screenItem.length; x++){
        if(screenItem[x] == "x"){
            screenItem[x] = '*';
        }
        if(screenItem[x] == "%"){
            screenItem[x] = '/100';
        }
        if(screenItem[x] == ","){
            screenItem[x] = '.';
        }
    }
    try {
        result = eval(screenItem.join(""));
        document.getElementById("screen").innerHTML = `<p>${result}</p>`;
    } catch (error) {
        document.getElementById("screen").innerHTML = `<p>Err</p>`;
    }
    screenItem = [];
}


const buttons = document.querySelectorAll(".button");

buttons.forEach(button => {
    if(button.id == "b="){
        button.addEventListener("click", convertAndCalculate);
    }
    else{
        button.addEventListener("click", () => {
        screenItem.push(button.innerHTML);
        refreshScreen();
        });
    }
    
});