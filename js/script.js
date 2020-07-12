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

const form = document.querySelector('.form')
const searchInput = document.querySelector('.form__input-search')
const map = document.querySelector('.map')

form.addEventListener('submit', (event) => {
    event.preventDefault();
    place = searchInput.value.trim()

    if(!place) {
        return alert('There has been an error')  
    }

    const mapQuestApi = prompt('Enter the MapQuest Api Key')
    
    geoCodePlace(place, mapQuestApi)
        .then(coord => {
            const mapUrl = getStaticMapUrl(coord.lat, coord.lng, mapQuestApi)
            map.innerHTML = `<img src=${mapUrl}, alt="map"/>`
        })
    
})
