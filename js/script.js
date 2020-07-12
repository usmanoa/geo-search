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