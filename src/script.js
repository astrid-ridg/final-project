function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city");
  let cityDisplay = document.querySelector(".card-title-main");
  if (searchInput.value) {
    cityDisplay.innerHTML = `${searchInput.value}`;
  } else {
    cityDisplay.innerHTML = null;
    alert("Please type a city");
  }
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);
