const quotes = [
    {
        quote: "Quote one",
        quoter: "Quoter one"
    },

    {
        quote: "Quote two",
        quoter: "Quoter two"
    },

    {
        quote: "Quote n",
        quoter: "Quoter n"
    }
]

    const button = document.querySelector('button');
    const quote = document.getElementById('quote');
    const quoter = document.getElementById('quoter');

    button.addEventListener('click', DisplayQuote)

    function DisplayQuote(){
        let index = parseInt(Math.random() * quotes.length);
        console.log(index);
        quote.textContent = quotes[index].quote;
        quoter.textContent = quotes[index].quoter;
    }
