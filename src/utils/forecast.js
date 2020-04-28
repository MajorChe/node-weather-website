const request = require('request')

const forecast = (Latitude,Longitude,callback)=>{
    const url = 'https://api.openweathermap.org/data/2.5/onecall?units=metric&lang=en&appid=327a16e98fde291468eab05695e176cf&lat=' + Latitude + '&lon=' + Longitude

    request({url:url,json:true},(error,{body})=>{
        if (error) {
            callback('Unable to connct!',undefined)
        }
        if (body.message) {
            callback('unable to find the location!',undefined)
        } else {
            callback(undefined, 'It is currently: ' + body.current.temp + ' °C and the feel like is: ' + body.current.feels_like + '°C .Weather description: ' + body.current.weather[0].description)
        }
    })
}
module.exports=forecast
