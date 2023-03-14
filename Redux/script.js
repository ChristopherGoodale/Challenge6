// Replace with your OpenWeatherMap API key
const apiKey = '6f57d6d3c3e1f8a8f7f076e94dc36c01';
const searchForm = document.querySelector('form');
const cityCriteria = document.getElementById('city-criteria');
const searchBtn = document.getElementById('search-btn');
const weatherDataDiv = document.getElementById('weather-data');
let searchHistory = [];

// Handle form submission
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const city = cityCriteria.value.trim();
    if (!city) return;
    getWeatherData(city);
});

// Handle search history click
weatherDataDiv.addEventListener('click', e => {
    if (e.target.tagName !== 'LI') return;
    const city = e.target.textContent;
    getWeatherData(city);
});

// Get weather data from API
async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast/?q=${city}&units=imperial&appid=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const cityName = data.city.name;
        const currentWeather = data.list[0];
        const forecast = data.list.slice(1, 6);
        displayWeatherData(cityName, currentWeather, forecast);
        addToSearchHistory(cityName);
    } catch (err) {
        console.log(err);
    }
}

// Generate HTML from weather data and append to weatherDataDiv
function displayWeatherData(cityName, currentWeather, forecast) {
    const currentIconUrl = `https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`;
    const currentTemp = Math.round(currentWeather.main.temp);
    const currentWindSpeed = Math.round(currentWeather.wind.speed);
    const currentHumidity = currentWeather.main.humidity;
    const forecastHtml = forecast.map(forecastData => `
    <div class="forecast-item">
      <p>${new Date(forecastData.dt_txt).toLocaleDateString()}</p>
      <img src="https://openweathermap.org/img/w/${forecastData.weather[0].icon}.png" alt="${forecastData.weather[0].description}">
      <p>Temp: ${Math.round(forecastData.main.temp)} &deg;F</p>
      <p>Wind: ${Math.round(forecastData.wind.speed)} MPH</p>
      <p>Humidity: ${forecastData.main.humidity}%</p>
    </div>
  `).join('');
    const html = `
    <div>
      <h2>${cityName} (${new Date().toLocaleDateString()})</h2>
      <img src="${currentIconUrl}" alt="${currentWeather.weather[0].description}">
      <p>Temperature: ${currentTemp} &deg;F</p>
      <p>Wind Speed: ${currentWindSpeed} MPH</p>
      <p>Humidity: ${currentHumidity}%</p>
    </div>
    <div>
      <h3>5-Day Forecast:</h3>
      <div class="forecast">${forecastHtml}</div>
    </div>
  `;
    weatherDataDiv.innerHTML = html;
}

// Add city to search history and localStorage
function addToSearchHistory(city) {
    if (searchHistory.includes(city)) return;
    searchHistory.unshift(city);
    if (searchHistory.length > 5) searchHistory.pop();
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    displaySearchHistory();
}

// Display search history in the DOM
function displaySearchHistory() {
    const historyHtml = searchHistory.map(city => `<li>${city}</li>`).join('');
    document.getElementById('search-history').innerHTML = historyHtml;
}

// Load search history from localStorage
function loadSearchHistory() {
    const history = JSON.parse(localStorage.getItem('searchHistory'));
    if (history) {
        searchHistory = history;
        displaySearchHistory();
    }
}

// On page load, load search history from localStorage
loadSearchHistory();