/* eslint-disable no-alert */
/* eslint-disable operator-linebreak */
/**
 * Converts strings to geographic coordinates
 *
 * @param {number} location
 * @param {number} apiKey
 *
 * @return {object} geographic coordinates
 */
const geoCodePlace = async (location, apiKey) => {
    const url = `http://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${location}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results[0].locations[0].latLng;
};

/**
 * Get the address of static map image
 *
 * @param {float} lat - latitude of location
 * @param {float} lng - longitude of location
 * @param {string} apiKey - API key of MaqQuest
 *
 * @return {string} url of static map image
 */
const getStaticMapUrl = (lat, lng, apiKey) => {
    const url = 'https://www.mapquestapi.com/staticmap/v5/map?key='
        + `${apiKey}&type=map&size=600,400&locations=${lat},${lng}|marker-7B0099`
        + '&scalebar=true&zoom=5&rand=-13&traffic=flow|cons|inc45253154';
    return url;
};

/**
 * Converts temperature from Kelvin to Celsius
 *
 * @param {number} temperature - tempeture in Kelvin
 *
 * @return {number} temperature in Celsius
 */
const convertKelvinToCelsius = (temperature) => {
    const ABSOLUTE_ZERO = 273.15;
    const celsius = (temperature * 100) - (ABSOLUTE_ZERO * 100);
    return Math.round(celsius) / 100;
};

/**
 * Converts temperature from Celsius to Fahrenheit
 *
 * @param {number} temperature - tempeture in Celsius
 *
 * @return {number} temperature in Fahrenheit
 */
const convertCelsiusToFahrenheit = (temperature) => {
    const tempFahrenheit = (temperature * 1.8 * 100) + (32 * 100);
    return Math.round(tempFahrenheit) / 100;
};

/**
 * Converts temperature from Fahrenheit to Celsius
 *
 * @param {number} temperature - tempeture in Fahrenheit
 *
 * @return {number} temperature in Celsius
 */
const convertFahrenheitToCelcius = (temperature) => {
    const tempCelsius = ((temperature * 100) - (32 * 100)) * (5 / 9);
    return Math.round(tempCelsius) / 100;
};

/**
 * Gets weather condition of a location
 *
 * @param {float} lat - latitude of location
 * @param {float} lng - longitude of location
 * @param {string} apiKey - API key of openWeatherMap
 *
 * @return {object} weather conditions
 */
const getWeatherCondition = async (lat, lng, apiKey) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return {
        decription: data.weather[0].description,
        temperature: convertKelvinToCelsius(data.main.temp),
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
    };
};

const form = document.querySelector('.form');
const searchInput = document.querySelector('.form__input-search');
const map = document.querySelector('.map');
const weatherLocation = document.querySelector('.weather__city-name');
const weatherDescription = document.querySelector('.weather__description');
const temperatureValueSpan = document.querySelector('[data-temperature]');
const humiditySpan = document.querySelector('[data-humidity]');
const pressureSpan = document.querySelector('[data-pressure]');
const windSpan = document.querySelector('[data-wind]');
const temperatureConverterButton = document.querySelector('.weather__temp-converter');
const temperatureConverterButtonUnitSpan = document.querySelector('[data-button-unit]');
const temperatureUnitSpan = document.querySelector('[data-temperature-unit]');
const loader = document.querySelector('.loading');
const mapWeatherSection = document.querySelector('.map-weather-section');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const place = searchInput.value.trim();

    if (!place) {
        return alert('You cannot search with an empty field');
    }

    mapWeatherSection.classList.add('hide');
    loader.classList.toggle('hide');

    const mapQuestApiKey = prompt('Enter the MapQuest Api Key');
    const openWeatherMapApiKey = prompt('Enter the OpenWeather Api Key');

    return geoCodePlace(place, mapQuestApiKey)
        .then((coord) => {
            const mapUrl = getStaticMapUrl(coord.lat, coord.lng, mapQuestApiKey);
            map.innerHTML = `<img src=${mapUrl}, alt="map"/>`;

            getWeatherCondition(coord.lat, coord.lng, openWeatherMapApiKey)
                .then((data) => {
                    weatherLocation.textContent = place;
                    weatherDescription.textContent = data.decription;
                    temperatureValueSpan.textContent = data.temperature;
                    humiditySpan.textContent = data.humidity;
                    pressureSpan.textContent = data.pressure;
                    windSpan.textContent = data.windSpeed;
                    loader.classList.toggle('hide');
                    mapWeatherSection.classList.toggle('hide');
                })
                .catch(() => {
                    loader.classList.toggle('hide');
                    mapWeatherSection.classList.add('hide');
                    alert('There has been an error');
                });
        })
        .catch(() => {
            loader.classList.toggle('hide');
            mapWeatherSection.classList.add('hide');
            alert('There has been an error');
        });
});

temperatureConverterButton.addEventListener('click', () => {
    if (temperatureConverterButtonUnitSpan.textContent === 'F') {
        temperatureValueSpan.textContent =
            convertCelsiusToFahrenheit(parseFloat(temperatureValueSpan.textContent));
        temperatureConverterButtonUnitSpan.textContent = 'C';
        temperatureUnitSpan.textContent = 'F';
    } else if (temperatureConverterButtonUnitSpan.textContent === 'C') {
        temperatureValueSpan.textContent =
            convertFahrenheitToCelcius(parseFloat(temperatureValueSpan.textContent));
        temperatureConverterButtonUnitSpan.textContent = 'F';
        temperatureUnitSpan.textContent = 'C';
    }
});
