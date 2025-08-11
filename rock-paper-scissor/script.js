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


