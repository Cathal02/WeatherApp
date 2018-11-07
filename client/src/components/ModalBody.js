import React from 'react'
const WeatherBody = props => {
  return (
    <div className="modal__body">
      <div className="modal__header">
        <h3>{props.dayText()}</h3>
        <img alt="weather icon" src={props.day.condition.icon} />
      </div>
      <div className="modal__item">
        <h5>Average Temperature</h5>
        <h4> {props.day.avgtemp_c} &#8451;</h4>
      </div>
      <div className="modal__item">
        <h5>Max Temperature</h5>
        <h4> {props.day.maxtemp_c} &#8451;</h4>
      </div>
      <div className="modal__item">
        <h5>Min Temperature</h5>
        <h4> {props.day.mintemp_c} &#8451;</h4>
      </div>
      <div className="modal__item">
        <h5>Average Humidity</h5>
        <h4> {props.day.avghumidity}%</h4>
      </div>
      <div className="modal__item">
        <h5>Rainfaill</h5>
        <h4>{props.day.totalprecip_mm}mm</h4>
      </div>
      <br />
    </div>
  )
}

export default WeatherBody
