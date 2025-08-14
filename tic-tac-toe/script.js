let playerCharacter;

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
        playerCharacter = element.innerHTML; //update the player character
        // console.log(playerCharacter);
        removeTheOther(element);
    })
});


const boxArray = document.querySelectorAll(".box");

boxArray.forEach(box => {
    box.addEventListener("click", function (){
        box.innerHTML = `<p class="p-inside-the-box">${playerCharacter}</p>`
    })
});



