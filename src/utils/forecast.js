const request = require('request')

const forecast = (Latitude,Longitude,callback)=>{
    const url = 'https://api.openweathermap.org/data/2.5/onecall?units=metric&lang=hi&appid=327a16e98fde291468eab05695e176cf&lat=' + Latitude + '&lon=' + Longitude

    request({url:url,json:true},(error,{body})=>{
        if (error) {
            callback('Unable to connct!',undefined)
        }
        if (body.message) {
            callback('unable to find the location!',undefined)
        } else {
            callback(undefined, 'The Current temperature is:' + body.current.temp + ' and the humidity is:' + body.current.humidity + ' & The location Co-ordinates are:' + 'Latitude: ' + body.lat + ' & Longitude: ' + body.lon)
        }
    })
}
module.exports=forecast
