const button1 = document.getElementById("button1");
button1.addEventListener("click", getImageWithThenCatch);

const button2 = document.getElementById("button2");
button2.addEventListener("click", getImageWithAsyncAwait);


function getImageWithThenCatch(){
    fetch("https://api.thecatapi.com/v1/images/search")
    .then(response => response.json())
    .then(picture => {
        const img = document.getElementById("cat1-image");
        img.src = picture[0].url;
    })
    .catch(error => {
        console.log(error);
    })
}

async function getImageWithAsyncAwait(){
    try{
        const response = await fetch("https://api.thecatapi.com/v1/images/search");
        const picture = await response.json();

        const img = document.getElementById("cat2-image");
        img.src = picture[0].url;
    }catch (error){
        console.log(error);
    }
}