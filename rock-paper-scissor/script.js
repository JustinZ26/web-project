/** @type {HTMLImageElement} */
let oppChoice = document.getElementById("opponent-choice");

let randomChoice = Math.floor(Math.random() * 3);
let theirPick;

switch (randomChoice) {
    case 0:
        oppChoice.src = "images/paper.png";
        theirPick = "paper";
        break;

    case 1:
        oppChoice.src = "images/rock.png";
        theirPick = "rock";
        break;

    case 2:
        oppChoice.src = "images/scissor.png";
        theirPick = "scissor";
        break;

    default:

        break;
}

let choiceArray = document.querySelectorAll("button");

function removeChoosenExceptThisOne(index){
    for(let i = 0; i < choiceArray.length;i++){
        if(i != index){
            choiceArray[i].classList.remove("choosen");
        }
    }
}

function removeChoosenFromAll(){
    for(let i = 0; i < choiceArray.length;i++){
        choiceArray[i].classList.remove("choosen");
    }
}

for(let i = 0; i < choiceArray.length; i ++){
    choiceArray[i].addEventListener("click", function(){
        choiceArray[i].classList.add("choosen");
        removeChoosenExceptThisOne(i);
        document.getElementById("result-container").style.display = "none";
    })
}

console.log(choiceArray);

let startButton = document.getElementById("start-button");

function calculateWinner(){
    let playerChoice = null;
    for(let i = 0; i < choiceArray.length; i++){
        if(choiceArray[i].classList.contains("choosen")){
            playerChoice = i;
        }
    }

    if(playerChoice == null){ //if player did not choose anything
        return;
    }

    if(playerChoice == randomChoice){
        //draw
        let container = document.getElementById("result-container");
        container.style.display = "flex";
        container.style.backgroundColor = "grey";

        document.getElementById("result").innerText = "Draw";
    }
    else if(playerChoice == 0 && randomChoice == 1 ||
        playerChoice == 1 && randomChoice == 2||
        playerChoice == 2 && randomChoice == 0
    ){
        //player win
        let container = document.getElementById("result-container");
        container.style.display = "flex";
        container.style.backgroundColor = "green";

        document.getElementById("result").innerText = "You Win";
    }
    else{
        //player lose
        let container = document.getElementById("result-container");
        container.style.display = "flex";
        container.style.backgroundColor = "red";

        document.getElementById("result").innerText = "You Lose";
    }

    removeChoosenFromAll();

}


startButton.addEventListener("click", calculateWinner);



