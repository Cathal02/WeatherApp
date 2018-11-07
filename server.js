const express = require('express')
const app = express()
const NodeGeocoder = require('node-geocoder')
const fetch = require('node-fetch')

const options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: 'AIzaSyCI1MnDAUTQUyGyAC1G2_ACjmi0LXI3Ik8 ',
  formatter: null
}

const geocoder = NodeGeocoder(options)

app.get('/api/weather/', (req, res) => {
  const cityName = req.query.cityName

  geocoder.geocode(cityName, (err, data) => {
    if (err) {
      res.send({ error: 'Could not find city :( ' })
    } else {
      console.log(data)
      const lat = data[0].latitude
      const long = data[0].longitude

      const url =
        ' http://api.apixu.com/v1/forecast.json?key=468b8d6476e246cf84f154837180211&q=' +
        lat +
        ',' +
        long +
        '&days=7'
      fetch(url)
        .then(weatherData => weatherData.json())
        .then(weatherData =>
          res.send({ ...weatherData, address: data[0].formattedAddress })
        )
        .catch(err => res.send({ error: 'Could not find city :(' }))
    }
  })
})

const port = 5000

app.listen(port, () => `Server running on port ${port}`)
