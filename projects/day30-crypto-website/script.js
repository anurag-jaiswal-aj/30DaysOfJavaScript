const btc = document.getElementById("bitcoin");
const eth = document.getElementById("ethereum");
const doge = document.getElementById("dogecoin");

async function fetchCryptoPrices() {
    try {
        const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cdogecoin&vs_currencies=usd"
        );

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        btc.textContent = data.bitcoin.usd.toLocaleString();
        eth.textContent = data.ethereum.usd.toLocaleString();
        doge.textContent = data.dogecoin.usd;
    } catch (error) {
        console.error("Failed to fetch crypto prices:", error);
        [btc, eth, doge].forEach(el => { el.textContent = "N/A"; });
    }
}

fetchCryptoPrices();
