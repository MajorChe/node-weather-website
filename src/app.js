const path = require('path')
const express = require('express')
const hbs =require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

//set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'charit'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Us',
        name: 'charit'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'charit'
    })
})
app.get('/weather',(req,res)=>{
    if (!req.query.address) {
        return res.send({
            error:'Please provide an address!'
        })
    }
    
geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
    if (error) {
        return res.send({error })
    }
    forecast(longitude,latitude,(error,forecastData)=>{
        if(error){
            return res.send({error})
        }
        res.send({
            forecast: forecastData,
            location,
            address:req.query.address
        })
    })
})  
})
app.get('/products',(req,res)=>{
    if (!req.query.search) {
        return res.send({
            error: 'Please provide a search item'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title:404,
        errorMessage:'Help article not found!',
        name:'charit'
    })
})
app.get('/*',(req,res)=>{
    res.render('404',{
        title:404,
        errorMessage:'404 error page',
        name:'charit'
    })
})
app.listen(port,()=>{
    console.log('Server is up on port '+ port)
})