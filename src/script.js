function displayTemp(response) {
  let temperatureDisplay = document.querySelector(".card-text-main");
  let temperature = Math.round(response.data.temperature.current);
  let cityDisplay = document.querySelector(".card-title-main");
  let descriptionDisplay = document.querySelector("#description");
  let windSpeedDisplay = document.querySelector("#wind-speed");
  let humidityDisplay = document.querySelector("#humidity");
  let timeDisplay = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconDisplay = document.querySelector("#icon");

  cityDisplay.innerHTML = response.data.city;
  temperatureDisplay.innerHTML = `${temperature}°C`;
  descriptionDisplay.innerHTML = response.data.condition.description;
  windSpeedDisplay.innerHTML = `${response.data.wind.speed}km/h`;
  humidityDisplay.innerHTML = `${response.data.temperature.humidity}%`;
  timeDisplay.innerHTML = formatDate(date);
  iconDisplay.innerHTML = `<img src="${response.data.condition.icon_url}" class = "weather-icon"/>`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function fetchWeather(city) {
  let apiKey = "fad3604f59545d05634atobc1ad582a8";
  let units = "metric";
  let weatherAPI = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(weatherAPI).then(displayTemp);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city");
  fetchWeather(searchInput.value);
}

function getForecast(city) {
  let apiKey = "fad3604f59545d05634atobc1ad582a8";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/foreacast?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastDays = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  forecastDays.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
<div class="forecast-day">
  <div class="forecast-date">${day}</div>
  <div class="forecast-icon">🌥️</div>
  <div class="forecast-temperatures">
      <span class="forecast-max-temperature"><strong>15°</strong></span>
      <span class="forecast-min-temperature">9°</span>
      </div>
     </div>`;
  });
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

fetchWeather("Cape Town");
displayForecast();
