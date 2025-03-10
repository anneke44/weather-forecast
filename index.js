function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temp-value");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#weather-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#day-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#temp-image-refresh");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="temp-image" />`;
  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  descriptionElement.innerHTML = response.data.condition.description;
}

function searchCity(city) {
  let apiKey = "04f3tf2c9f9bboc83b5050dcf54e2f1a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let days = day[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;

    if (hours < 10) {
      hours = `0${hours}`;
    }
  }
  return `${days} ${hours}:${minutes}`;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Cape Town");

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = "";

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
  <div class="forecast-day-wrapper">
    <div class="forecast-day">${day}</div>
    <div class="forecast-icon">☀️</div>
    <div class="forecast-temp">
      <div class="forecast-temp-max">
        <strong>15°</strong>
      </div>
      <div class="forecast-temp-min">9°</div>
    </div>
  </div>
  `;
  });

  forecastElement.innerHTML = forecastHtml;
}

displayForecast();
