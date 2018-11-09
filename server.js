const express = require('express')
const app = express()
const fetch = require('node-fetch')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

app.get('/api/weather/', (req, res) => {
  const lat = req.query.lat
  const long = req.query.long
  const address = req.query.address
  const key = process.env.WEATHER_API_KEY

  const url =
    ' http://api.apixu.com/v1/forecast.json?key=' +
    key +
    '&q=' +
    lat +
    ',' +
    long +
    '&days=7'

  fetch(url)
    .then(weatherData => weatherData.json())
    .then(weatherData => res.send({ ...weatherData, address }))
    .catch(err => res.send({ error: 'Could not find city :(' }))
})

const port = process.env.PORT || 5000

app.listen(port, () => `Server running on port ${port}`)
