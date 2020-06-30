const request = require('request')

const geocode = (address, callback) => {
    // encodeURIComponent translates special characters e.g.: ? becomes %3F
    const encodedAddress = encodeURIComponent(address)
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodedAddress + '.json?access_token=pk.eyJ1IjoiZWtvaDk1IiwiYSI6ImNrYnlsaDJwMjEwdTAyeHBjeDlqMjl0ZHUifQ.zBx33Q6c2vUxcp5cF2YdPQ&limit=1'

    request({
        url,
        json: true
        },
            // { body } = {}: The = {} is to set a default value of an undefined object
            (error, { body } = {}) => {
                if(error)
                {
                    callback('Unable to connect to location services!', undefined)
                } else if(body.features.length === 0){
                    callback('Unable to find location. Try another search.', undefined)
                } else {
                    callback(undefined, {
                        latitude: body.features[0].center[1],
                        longitude: body.features[0].center[0],
                        location: body.features[0].place_name
                    })
                }
            }
        )
}

module.exports = geocode