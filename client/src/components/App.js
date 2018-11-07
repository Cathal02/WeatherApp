import React from 'react'
import { Input, InputGroup, InputGroupAddon, Button } from 'reactstrap'
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
    e.preventDefault()
    const cityName = this.state.city
    const url = '/api/weather/?cityName=' + cityName

    fetch(url)
      .then(res => res.json())
      .then(data => this.setState({ open: true, data }))
  }

  toggle = () => this.setState({ open: !this.state.open })

  render() {
    console.log(this.state.data)
    return (
      <div className="home__container">
        <h1>Enter your cities name!</h1>
        <form onSubmit={this.handleSubmit}>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <Button color="primary">Search</Button>
            </InputGroupAddon>
            <Input
              className="home__input"
              name="city"
              placeholder="Enter city name"
              onChange={this.onChange}
              value={this.state.city}
            />
          </InputGroup>

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
