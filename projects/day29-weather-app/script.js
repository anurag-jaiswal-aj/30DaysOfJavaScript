// NOTE: Replace the value below with your own API key from https://openweathermap.org/
const apiKey = "YOUR_API_KEY_HERE";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const weatherConditions = {
    Clouds: "clouds.png",
    Clear: "clear.png",
    Rain: "rain.png",
    Drizzle: "drizzle.png",
    Mist: "mist.png"
};

async function checkWeather(city) {
    if (!city || !city.trim()) return;

    try {
        const response = await fetch(apiUrl + encodeURIComponent(city.trim()) + `&appid=${apiKey}`);

        if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return;
        }

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        const condition = data.weather[0].main;
        weatherIcon.src = weatherConditions[condition] || "clear.png";

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    } catch (error) {
        console.error("Failed to fetch weather data:", error);
        document.querySelector(".error").innerHTML = "Something went wrong. Please try again.";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkWeather(searchBox.value);
});
