# WeatherApp 🌤️

A clean, fast weather dashboard built with React. Enter your location — manually or via GPS — and get a real-time forecast powered by the [Weather AI API](https://weather-ai.co/).

---

## Live

[Use this Link](https://sneaky-weatherapp.netlify.app/)

## Inspiration

Yoinked parts (as much as I could) from this [Design](https://uizard.io/templates/web-app-templates/weather-web-app-dark/)

![Victim](https://uizard.io/static/89cb1d30cdee9c19b0ce72efe004ff49/0cfa7/f5e31989f816c5b15c47cd54b0eb0b30b210b6f0-1440x835.webp)


---

## Features

- 🌍 **Auto-detect location** via browser Geolocation API
- 🔍 **Manual location search** by city name or coordinates
- 🕐 **Hourly forecast** with temperature and conditions
- 📅 **7-day weekly forecast**
- 💨 **Air conditions** — humidity, wind speed, UV index, feels like
- ⚡ **Instant loading** with React Suspense + streaming UI
- 🚨 **Graceful error handling** via Error Boundaries

---

## Getting Started

### 1. Get an API token

Sign up at [weather-ai.co](https://weather-ai.co/) and grab your API token from the dashboard.

### 2. Clone and install

```bash
git clone https://github.com/your-username/weatherapp.git
cd weatherapp
npm install
```

### 3. Run the app

```bash
npm run dev
```

### 4. Enter your token

On first launch, paste your API token from [weather-ai.co](https://weather-ai.co/) into the token input field. Then either:

- Click **"Use my location"** to auto-detect via GPS
- Or **type a city name** to search manually

---

## Tech Stack

| Layer         | Technology               |
| ------------- | ------------------------ |
| Framework     | React 19                 |
| Routing       | React Router v7          |
| Data fetching | `React.use()` + Suspense |
| HTTP client   | Axios                    |
| Styling       | Tailwind CSS             |
| Build tool    | Vite                     |

---

## How It Works

1. The user provides a token + location (lat/lon)
2. `getWeatherData()` fires a single cached Promise — the same reference is reused on re-renders so `React.use()` can suspend correctly
3. `<Suspense>` shows a skeleton while the request is in flight
4. `<ErrorBoundary>` catches any API or network failures and shows a readable message
5. Once resolved, the full dashboard renders with current, hourly, and daily data

---

## License

MIT
