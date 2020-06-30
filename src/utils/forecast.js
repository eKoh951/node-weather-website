const request = require('request')
const log = console.log

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6e28fd58ba23eed7b4c910b9ff904fbc&query=' + latitude + "," + longitude + '&units=m'
    request({
        url,
        json: true
    },
        (error, { body }) => {
            if(error)
            {
                callback('Unable to connect to server', undefined)
            }
            else if (body.error)
            {
                callback('Unable to find the location', undefined)
            }
            else
            {
                callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
            }
        }
    )
}

module.exports = forecast