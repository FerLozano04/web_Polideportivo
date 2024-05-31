// Constantes
const cabeceraMenu = document.querySelector(".cabecera .links");
const menuBtn = document.querySelector(".menu-btn");
const hideMenuBtn = document.querySelector(".close-btn");
const showPopupBtn = document.querySelector(".login-btn");
const formPopup = document.querySelector(".form-popup");
const hidePopupBtn = document.querySelector(".form-popup .close-btn");
const loginSignupLink = document.querySelectorAll(".form-box .bottom-link a");
const allStar = document.querySelectorAll(".rating .star");
const ratingValue = document.querySelectorAll(".rating input");
const header = document.querySelector("header");
const home = document.querySelector(".home");
const bienvenida = document.querySelector(".bienvenida");
const queOfrecemos = document.querySelector(".queOfrecemos");
const porqueVenir = document.querySelector(".porqueVenir");
const galeria = document.querySelector(".galeria");
const contacto = document.querySelector(".contacto");
const valoraciones = document.querySelector(".valoraciones");
const topElements = document.getElementsByClassName("top");
const footer = document.querySelector("footer");
const logo = document.querySelector(".logo");
const cabecera = document.querySelector(".cabecera");

window.addEventListener ("scroll", function() {
    header.classList.toggle ("sticky", window.scrollY > 0);
});

window.onscroll = () => {
    logo.classList.remove('bx-x');
    cabecera.classList.remove('open');
};

const sr = ScrollReveal ({
    distance: '30px',
    duration: 2600,
    reset: true
})

sr.reveal('.cabecera',{delay:280, origin:'bottom'})

// Mostrar menú móvil
menuBtn.addEventListener("click", () => {
    cabeceraMenu.classList.toggle("show-menu");
});

// Ocultar menú móvil
hideMenuBtn.addEventListener("click", () => menuBtn.click());

// Mostrar ventana emergente de formulario
showPopupBtn.addEventListener("click", () => {
    document.body.classList.toggle("show-popup");
});

// Ocultar ventana emergente de formulario
hidePopupBtn.addEventListener("click", () => showPopupBtn.click());

loginSignupLink.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        formPopup.classList[link.id === "signup-link" ? 'add' : 'remove']("show-signup");
    });
});

document.addEventListener('DOMContentLoaded', function() {
    menuBtn.addEventListener('click', function() {
        if (footer.style.display === 'none') {
            footer.style.display = 'block';
        } else {
            footer.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    menuBtn.addEventListener('click', function() {
        // Esta función recorre todos los elementos con la clase 'top'
        for (var i = 0; i < topElements.length; i++) {
            // Se alterna la propiedad de visualización entre 'none' y 'block'
            if (topElements[i].style.display === 'none') {
                topElements[i].style.display = 'block';
            } else {
                topElements[i].style.display = 'none';
            }
        }
    });
});


const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");

const API_KEY = "3b8223d07bd1d765f809d8b0cf9b36ea"; // https://home.openweathermap.org/api_keys

const createWeatherCard = (cityName, weatherItem, index) => {
    if(index === 0) { // HTML for the main weather card
        return `<div class="details">
                    <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
                    <h6>Temperatura: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                    <h6>Viento: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humedad: ${weatherItem.main.humidity}%</h6>
                </div>
                <div class="icon">
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                    <h6>${weatherItem.weather[0].description}</h6>
                </div>`;
    } else { // HTML for the other five day forecast card
        return `<li class="card">
                    <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                    <h6>Temperatura: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                    <h6>Viento: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humedad: ${weatherItem.main.humidity}%</h6>
                </li>`;
    }
}

const getWeatherDetails = (cityName, latitude, longitude) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL).then(response => response.json()).then(data => {
        // Filter the forecasts to get only one forecast per day
        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });

        // Clearing previous weather data
        cityInput.value = "";
        currentWeatherDiv.innerHTML = "";
        weatherCardsDiv.innerHTML = "";

        // Creating weather cards and adding them to the DOM
        fiveDaysForecast.forEach((weatherItem, index) => {
            const html = createWeatherCard(cityName, weatherItem, index);
            if (index === 0) {
                currentWeatherDiv.insertAdjacentHTML("beforeend", html);
            } else {
                weatherCardsDiv.insertAdjacentHTML("beforeend", html);
            }
        });
    }).catch(() => {
        alert("¡Ocurrió un error al obtener el pronóstico del tiempo!");
    });
}

const getCityCoordinates = () => {
    const cityName = cityInput.value.trim();
    if (cityName === "") return;
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

    // Get entered city coordinates (latitude, longitude, and name) from the API response
    fetch(API_URL).then(response => response.json()).then(data => {
        if (!data.length) return alert(`No coordinates found for ${cityName}`);
        const { lat, lon, name } = data[0];
        getWeatherDetails(name, lat, lon);
    }).catch(() => {
        alert("¡Ocurrió un error al obtener las coordenadas!");
    });
}

const getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords; // Get coordinates of user location
            // Get city name from coordinates using reverse geocoding API
            const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
            fetch(API_URL).then(response => response.json()).then(data => {
                const { name } = data[0];
                getWeatherDetails(name, latitude, longitude);
            }).catch(() => {
                alert("¡Se produjo un error al obtener el nombre de la ciudad!");
            });
        },
        error => { // Show alert if user denied the location permission
            if (error.code === error.PERMISSION_DENIED) {
                alert("Solicitud de geolocalización denegada. Restablezca el permiso de ubicación para otorgar acceso nuevamente.");
            } else {
                alert("Error de solicitud de geolocalización. Restablezca el permiso de ubicación.");
            }
        });
}

locationButton.addEventListener("click", getUserCoordinates);
searchButton.addEventListener("click", getCityCoordinates);
cityInput.addEventListener("keyup", e => e.key === "Enter" && getCityCoordinates());

// Validaciones
function validarNombre(event) {

    var input = event.target;

    // Expresión regular para letras y espacios
    var regex = /^[A-Za-z\s]+$/;

    // Si el valor del input no coincide con la expresión regular, se limpia el valor
    if (!regex.test(input.value)) {
        input.value = input.value.replace(/[^A-Za-z\s]+/g, '');
    }
}

function validarTelefono(event) {

    var input = event.target;

    // Expresión regular para números
    var regex = /^[0-9]+$/;

    // Si el valor del input no coincide con la expresión regular, se limpia el valor y elimina caracteres no numéricos
    if (!regex.test(input.value)) {
        input.value = input.value.replace(/\D/g, '');
    }
}