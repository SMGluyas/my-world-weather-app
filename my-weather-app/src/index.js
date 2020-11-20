function showCurrentTime() {
  let currentTime = new Date();
  let timeHeader = document.querySelector(".time");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[currentTime.getDay()];

  let hour = currentTime.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  timeHeader.innerHTML = `${day} ${hour}:${minutes}`;
  return showCurrentTime;
}

function showWeatherInfo(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("#main-temp").innerHTML = Math.round(response.data.main.temp);

  document.querySelector("#humidity-fig").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#wind-fig").innerHTML = Math.round(response.data.wind.speed);

  document.querySelector(".description").innerHTML = response.data.weather[0].main;
  document.querySelector("#min").innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector("#max").innerHTML = Math.round(response.data.main.temp_max);
}

function findLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "275de0c841d02a257509e4dea098d5d3";
  let geolocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(geolocationUrl).then(showWeatherInfo);
  showCurrentTime();
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(findLocation);
}

function showCity(city) {
  let apiKey = "275de0c841d02a257509e4dea098d5d3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherInfo);
}

function searchFunction(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input-text").value;
  showCity(city);
}

let searchForm = document.querySelector("div.card");
searchForm.addEventListener("submit", searchFunction);

let currentLocation = document.querySelector("#local");
currentLocation.addEventListener("click", getCurrentPosition);

function showFarenheight(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  let temperature = (temperatureElement.innerHTML);
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
  let unit = document.querySelector("#unit");
  unit.innerHTML = `°F`;
}
let convertToFarenheight = document.querySelector("#farenheight");
convertToFarenheight.addEventListener("click", showFarenheight);

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  let temperature = (temperatureElement.innerHTML);
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
  let unit = document.querySelector("#unit");
  unit.innerHTML = `°C`;
}
let convertToCelsius = document.querySelector("#celsius");
convertToCelsius.addEventListener("click", showCelsius);

showCity("Auckland");