/**
 * Converts strings to geographic coordinates
 * 
 * @param {number} location 
 * @param {number} apiKey
 * 
 * @return {object} geographic coordinates
 */
const geoCodePlace = async (location, apiKey) => {
    const url = `http://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${location}`
    let response = await fetch(url);
    let data = await response.json()
    return  data.results[0].locations[0].latLng
}

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
    const url = `http://www.mapquestapi.com/staticmap/v5/map?key=`
        + `${apiKey}&type=map&size=600,400&locations=${lat},${lng}|marker-sm-50318A-1`
        + `&scalebar=true&zoom=5&rand=-13&traffic=flow|cons|inc45253154`
    
    return url
}

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
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`
    let response = await fetch(url)
    let data = await response.json()
    return {
        decription: data.weather[0].description,
        temperature: data.main.temp,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed
    }
}

const form = document.querySelector('.form')
const searchInput = document.querySelector('.form__input-search')
const map = document.querySelector('.map')
const weatherLocation = document.querySelector('.weather__city-name')
const weatherDescription = document.querySelector('.weather__description')
const temperatureValue = document.querySelector('[data-temperature]')
const humiditySpan = document.querySelector('[data-humidity]')
const pressureSpan = document.querySelector('[data-pressure]')
const windSpan = document.querySelector('[data-wind]')



form.addEventListener('submit', (event) => {
    event.preventDefault();
    place = searchInput.value.trim()

    if(!place) {
        return alert('You cannot search with an empty field')  
    }

    const mapQuestApiKey = prompt('Enter the MapQuest Api Key')
    const openWeatherMapApiKey = prompt('Enter the OpenWeather Api Key')
    
    geoCodePlace(place, mapQuestApiKey)
        .then(coord => {
            const mapUrl = getStaticMapUrl(coord.lat, coord.lng, mapQuestApiKey)
            map.innerHTML = `<img src=${mapUrl}, alt="map"/>`

            getWeatherCondition(coord.lat, coord.lng, openWeatherMapApiKey)
                .then(data => {
                    weatherLocation.textContent = place
                    weatherDescription.textContent = data.decription
                    temperatureValue.textContent = data.temperature
                    humiditySpan.textContent =  data.humidity
                    pressureSpan.textContent = data.pressure
                    windSpan.textContent = data.windSpeed 
                })
                .catch(err=> alert('There has been an error'))

        })
        .catch(err=> alert('There has been an error'))
})
