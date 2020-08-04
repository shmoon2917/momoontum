const weather = document.querySelector(".js-wheater");

const API_KEY = 'db477ff0a8c49cf8b495e4d12e636e97';
const COORDS = 'coords';

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  ).then(function(res) {
    return res.json()
  }).then(function(json) {
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `${temperature} @ ${place}`;
  });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoError() {
  console.log("Can't access");
}

function handleGeoSuccss(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccss, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();