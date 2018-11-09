import React from 'react'
import { Input, InputGroup, InputGroupAddon, Button } from 'reactstrap'
import Geosuggest from 'react-geosuggest'
import WeatherModal from './WeatherModal'
import './App.scss'

export default class App extends React.Component {
  state = {
    city: '',
    open: false,
    data: {}
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    if (e == undefined) return

    const cityName = e.description

    const url =
      '/api/weather/?cityName=' +
      cityName +
      '&lat=' +
      e.location.lat +
      '&long=' +
      e.location.lng +
      '&address=' +
      e.gmaps.formatted_address

    fetch(url)
      .then(res => res.json())
      .then(data => this.setState({ open: true, data }))
  }

  toggle = () => this.setState({ open: !this.state.open })

  render() {
    return (
      <div className="home__container">
        <h1>Enter your cities name!</h1>
        <form onSubmit={this.handleSubmit}>
          <Geosuggest
            placeholder="Enter your cities name"
            className="input__places"
            onSuggestSelect={this.handleSubmit}
          />

          <WeatherModal
            open={this.state.open}
            data={this.state.data}
            toggle={this.toggle}
          />
        </form>
      </div>
    )
  }
}
