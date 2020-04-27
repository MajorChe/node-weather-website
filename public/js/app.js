console.log('Javascript file is laoded!')
//comment added
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationdata = document.querySelector('#locationData')
const weatherData = document.querySelector('#weatherData')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    locationdata.textContent = 'Loading...'
    weatherData.innerHTML = ''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if (data.error) {
            document.querySelector('#locationData').innerHTML = 'Error'
            document.querySelector('#weatherData').innerHTML = data.error
        }else{
            //console.log(data)
            locationdata.textContent = 'Location: '+data.location
            weatherData.innerHTML = 'Forecast: '+data.forecast
        }
    })    
})
})
