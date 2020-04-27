const request = require('request')


 const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibmFuZHVyaWMiLCJhIjoiY2s5NGNiZ2RjMDg2dDNmbnllcmcxaDd1NyJ9.qtg7IkNLMT0eGemqxM5EXg&limit=1'
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect',undefined)
        }
        else if (body.features.length===0) {
            callback('Address not found!',undefined)
        } else {
            callback(undefined,{
                latitude:body.features[0].center[0],
                longitude:body.features[0].center[1],
                location:body.features[0].place_name
            })
        }
    })
  }

  module.exports = geocode