const express = require('express')
const app = express()
const https = require('https')
const port = 3000
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true}))

app.listen(port,()=> console.log('The Server is listening ' + port))

app.get('/', (req,res)=>{res.sendfile(__dirname + '/index.html')}) 

app.post('/', (req,res)=>{

    const query = req.body.CityName
    const apiKey = "d973b9bd27c1397d8792e90cd550701f"
    const unit = "metric"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${apiKey}`
    
    https.get(url, response=>response.on('data', data=>{
   
    const weatherData = JSON.parse(data)
    const temp = weatherData.main.temp 
    const description = weatherData.weather[0].description
    const icon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
    
    res.write(`<h1>The current temperature in ${query} is ${temp} degree C. The wather is reather ${description} these days <img src=${icon}></h1>`)
   
})
)
})
