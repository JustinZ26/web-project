document.addEventListener("click", function(){
    console.log("page is clicked");
    getQuote();
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