# 30 Days of JavaScript

A collection of 30 vanilla JavaScript projects — one per day — covering a wide range of UI patterns, DOM manipulation, browser APIs, and third-party integrations.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## Live Preview

Open `index.html` in your browser to access the hub page — it lists all 30 projects with a live search/filter.

---

## Projects

| Day | Project | Concepts |
|-----|---------|----------|
| 01 | Digital Clock | `setInterval`, `Date` API |
| 02 | Toast Notification | DOM creation, CSS animations |
| 03 | Quote Generator | `fetch`, async/await, error handling |
| 04 | Popup | CSS transitions, class toggling |
| 05 | Hide/Show Password | Input type toggling, event listeners |
| 06 | Stopwatch | `setInterval`, time formatting |
| 07 | Dark Mode Toggle | CSS variables, localStorage |
| 08 | Calculator | Event delegation, math parsing |
| 09 | Password Generator | String manipulation, Clipboard API |
| 10 | Dropdown Menu | Event listeners, class toggling |
| 11 | Mini Calendar | `Date` API, DOM rendering |
| 12 | Age Calculator | Date arithmetic, input validation |
| 13 | Password Strength Checker | Regex, dynamic styling |
| 14 | Circular Progress Bar | `setInterval`, SVG/CSS animation |
| 15 | Coming Soon Page | Countdown timer, `Date` API |
| 16 | Email Subscription | Fetch, Google Sheets integration |
| 17 | Form Validation | Regex, real-time validation |
| 18 | Image Transition | Mouse events, dynamic CSS |
| 19 | Product Page | Image switching, cart UI |
| 20 | QR Code Generator | Third-party API, Blob, download |
| 21 | Todo List | localStorage, event delegation |
| 22 | Image Gallery | Scroll, wheel events |
| 23 | Text to Speech | Web Speech API |
| 24 | Notes App | `contenteditable`, localStorage |
| 25 | Quiz App | Dynamic rendering, score tracking |
| 26 | Drag and Drop | Drag API, event delegation |
| 27 | Music Player | HTML5 Audio API |
| 28 | Image Search | Unsplash API, pagination |
| 29 | Weather App | OpenWeatherMap API, async/await |
| 30 | Crypto Website | CoinGecko API, fetch |

---

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/your-username/30DaysOfJavaScript.git
cd 30DaysOfJavaScript
```

### 2. Configure API keys

Two projects require API keys. Copy the example config and fill in your keys:

```bash
cp config.example.js config.js
```

Then edit `config.js`:

```js
const CONFIG = {
    UNSPLASH_ACCESS_KEY: "your_unsplash_key_here",
    OPENWEATHER_API_KEY: "your_openweathermap_key_here"
};
```

| Key | Get it from |
|-----|-------------|
| `UNSPLASH_ACCESS_KEY` | [unsplash.com/developers](https://unsplash.com/developers) — free |
| `OPENWEATHER_API_KEY` | [openweathermap.org/api](https://openweathermap.org/api) — free tier |

> `config.js` is gitignored and will never be committed to the repo.

### 3. Open in browser

```bash
open index.html
```

Or just double-click `index.html` — no build step, no dependencies.

---

## Project Structure

```
30DaysOfJavaScript/
├── index.html           # Hub page — lists all projects
├── script.js            # Hub page logic (search, dynamic loading)
├── style.css            # Hub page styles
├── config.js            # API keys (gitignored)
├── config.example.js    # API keys template (safe to commit)
└── projects/
    ├── day01-digital-clock/
    │   ├── index.html
    │   ├── script.js
    │   └── style.css
    ├── day02-toast-notification/
    └── ...              # same structure for all 30 days
```

---

## Tech Stack

- HTML5, CSS3, JavaScript (ES6+)
- No frameworks, no build tools, no dependencies

---

## License

[MIT](./LICENSE)
