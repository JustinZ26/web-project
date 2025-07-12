const words = [
    {answer: "Cat", hint: "Cute animal that meow", template:"_ _ _"},
    {answer: "Dog", hint: "Cute buddy that bark", template:"_ _ _"},
    {answer: "Duck", hint: "Quacking animal", template:"_ _ _ _"}
];

function setupAnswer(){
    let randomNumber = Math.floor(Math.random()*words.length);
    return randomNumber;
}


let wrong = 0;
function updateImages(){
    document.getElementById("hangman").src = `image/hangman_${wrong}.png`;
}
updateImages();

let randomIndex = setupAnswer();
let choosen = words[randomIndex];
document.getElementById("hint").innerHTML = `<p>Hint : ${choosen.hint}</p>`;
document.getElementById("answer").innerText = choosen.template;

function checkAnswer(a){
    if(choosen.answer.toLocaleUpperCase().includes(a.toLocaleUpperCase())){
        return true;
    }
    else{
        wrong+=1;
        updateImages();
        return false;
    }
}


letters = document.querySelectorAll(".alphabet");
letters.forEach(element => {
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