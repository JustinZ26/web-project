const words = [
    { answer: "Cat", hint: "Cute animal that meows", template: "_ _ _" },
    { answer: "Dog", hint: "Cute buddy that barks", template: "_ _ _" },
    { answer: "Duck", hint: "Quacking animal", template: "_ _ _ _" },
    { answer: "Chicken", hint: "Egg producer", template: "_ _ _ _ _ _ _" },
    { answer: "Elephant", hint: "Big and has a trunk", template: "_ _ _ _ _ _ _ _" },
    { answer: "Panda", hint: "Eats bamboo and looks like a plushie", template: "_ _ _ _ _" },
    { answer: "Koala", hint: "Lives in trees and eats eucalyptus", template: "_ _ _ _ _" },
    { answer: "Rabbit", hint: "Hops and loves carrots", template: "_ _ _ _ _ _" },
    { answer: "Penguin", hint: "Waddles in snow and can't fly", template: "_ _ _ _ _ _ _" },
    { answer: "Horse", hint: "Neighs and can run really fast", template: "_ _ _ _ _" },
    { answer: "Monkey", hint: "Loves bananas and swings around", template: "_ _ _ _ _ _" },
    { answer: "Zebra", hint: "Has black and white stripes", template: "_ _ _ _ _" }
];


function setupAnswer(){
    let randomNumber = Math.floor(Math.random()*words.length);
    return randomNumber;
}

function endGame(a){
    if(a){
        document.getElementById("end-result").innerHTML = `<p>You won, play again?</p>`
        document.getElementById("hangman").src = `image/win.png`;
    }else{
        document.getElementById("end-result").innerHTML = `<p>You lose, play again?</p>`
    }

    document.getElementById("option").style.display = "none";
    document.getElementById("play-again").style.display = "flex";
}


let wrong = 0;
function updateImages(){
    document.getElementById("hangman").src = `image/hangman_${wrong}.png`;
}
let randomIndex;
let choosen;


function reveal(a){
    let currentBox = document.getElementById("answer").innerText;
    currentBox = currentBox.split("");
    let choosenSplit = choosen.answer.split("");
    for(let x = 0; x < choosenSplit.length; x++){
        if(choosenSplit[x].toUpperCase() == a){
            currentBox[x*2] = choosenSplit[x];
        }
    }

    currentBox = currentBox.join("");
    document.getElementById("answer").innerText = currentBox;
    if(!currentBox.includes("_")){
        endGame(true);
    }
}

function checkAnswer(a){
    if(choosen.answer.toUpperCase().includes(a.toUpperCase())){
        reveal(a);
        return true;
    }
    else{
        wrong+=1;
        updateImages();
        if(wrong == 6){
            endGame(false); // user lose
        }
        return false;
    }
}


letters = document.querySelectorAll(".alphabet"); // get all the choice button
letters.forEach(element => { // loop and assign "click" event listener for all the button
    element.addEventListener("click", function() {
        const letter = this.innerHTML;
        let result = checkAnswer(letter);
        if(result){
            this.classList.add("clicked-right");
        }else{
            this.classList.add("clicked-wrong");
        }
    });
});

document.getElementById("play-again").addEventListener("click", init);

function init(){
    wrong = 0;
    updateImages();
    randomIndex = setupAnswer();
    choosen = words[randomIndex];
    document.getElementById("hint").innerHTML = `<p>Hint : ${choosen.hint}</p>`;
    document.getElementById("answer").innerText = choosen.template;
    document.getElementById("option").style.display = "flex";

    document.getElementById("play-again").style.display = "none";
    document.getElementById("end-result").innerHTML = "";

    document.querySelectorAll(".alphabet").forEach(element => { // clean the option
        element.classList.remove("clicked-right", "clicked-wrong");
    });

}

init();