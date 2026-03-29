const quote = document.getElementById("quote");
const author = document.getElementById("author");

// quotable.io is shut down — using dummyjson quotes API instead (free, no key needed)
const api_url = "https://dummyjson.com/quotes/random";

async function getquote() {
    try {
        quote.innerHTML = "Loading...";
        author.innerHTML = "";
        const response = await fetch(api_url);
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        quote.innerHTML = data.quote;
        author.innerHTML = "— " + data.author;
    } catch (error) {
        console.error("Failed to fetch quote:", error);
        quote.innerHTML = "Could not load quote. Please try again.";
        author.innerHTML = "";
    }
}

function tweet() {
    window.open(
        "https://twitter.com/intent/tweet?text=" +
        encodeURIComponent(quote.innerHTML + " — " + author.innerHTML),
        "Tweet Window",
        "width=600,height=300"
    );
}

getquote();
