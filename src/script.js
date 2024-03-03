function displayTemp(response) {
  let temperatureDisplay = document.querySelector(".card-text-main");
  let temperature = Math.round(response.data.temperature.current);
  let cityDisplay = document.querySelector(".card-title-main");
  cityDisplay.innerHTML = response.data.city;
  temperatureDisplay.innerHTML = `${temperature}°C`;
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
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

fetchWeather("Cape Town");
