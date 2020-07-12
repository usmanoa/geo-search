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

const form = document.querySelector('.form')
const searchInput = document.querySelector('.form__input-search')

form.addEventListener('submit', (event) => {
    event.preventDefault();
    place = searchInput.value.trim()
    console.log(place)
})