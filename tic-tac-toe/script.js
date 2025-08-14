let playerCharacter;
let botCharacter;
let stillGoing;

const choiceArray = document.querySelectorAll(".player");

function removeTheOther(choice){
    choiceArray.forEach(element => {
        if(element != choice){
            element.classList.remove("choosen-character");
        }
    });
}
// if player click the choice then add a choosen UI for feedback
choiceArray.forEach(element => {
    element.addEventListener("click", function(){
        element.classList.add("choosen-character");
        playerCharacter = element.innerHTML.trim(); //update the player character
        if(playerCharacter == 'X'){ //pick the character for the bot
            botCharacter = 'O';
        }else{
            botCharacter = 'X';
        }
        // console.log(playerCharacter);
        removeTheOther(element);
    })
});


const boxArray = document.querySelectorAll(".box");

let boxContent = {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null
}

boxArray.forEach(box => {
    box.addEventListener("click", function (){
        //check if the box is already used before
        if(!box.classList.contains("used")){
            box.innerHTML = `<p class="p-inside-the-box">${playerCharacter}</p>`;
            box.classList.add("used");
            boxContent[box.id] = playerCharacter;

            stillGoing = checkMatchStatus();
            if(stillGoing){
                pickRandomBox();
            }
            if(!stillGoing){
                playAgainButton.style.display = "block";
            }

            
        }
        
    })
});

function updateBox(index){
    boxArray.forEach(element => {
        if(element.id == index){
            element.innerHTML = `<p class="p-inside-the-box">${botCharacter}</p>`;
            element.classList.add('used');
        }
    });
}

function pickRandomBox(){
    let index = null;
    while(index == null){
        let choice = Math.floor(Math.random() * 9) + 1;

        if(boxContent[choice] == null){
            index = choice;
        }
    }

    boxContent[index] = botCharacter;
    updateBox(index);
    stillGoing = checkMatchStatus();
    if(!stillGoing){
        playAgainButton.style.display = "block";
    }

}

let winner = document.getElementById("winner"); //the container for the winner anouncement
const winPatterns = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

function checkMatchStatus() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boxContent[a] && boxContent[a] === boxContent[b] && boxContent[a] === boxContent[c]) {
            winner.innerText = `${boxContent[a]} is the winner!!!`;
            return false;
        }
    }

    if (!Object.values(boxContent).includes(null)) {
        winner.innerText = `Draw !!!`;
        return false;
    }

    return true; // Game still going
}

function playAgain(){
    for(let key in boxContent){
        boxContent[key] = null;
    }

    boxArray.forEach(box => {
        box.classList.remove("used");
        box.innerHTML = "";
    });

    playAgainButton.style.display = "none";
    winner.innerText = ``;
    stillGoing = true;
}

const playAgainButton = document.getElementById("play-again");

playAgainButton.addEventListener("click", playAgain);


// this is so messy bruh