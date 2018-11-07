import React from 'react'
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap'
import ModalBody from './ModalBody'
import moment from 'moment'

class ModalExample extends React.Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.toggleAll = this.toggleAll.bind(this)
  }

  state = {
    modal: false,
    nestedModal: false,
    closeAll: false,
    data: {},
    index: 0,
    day: '',
    days: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ],
    minDay: 0,
    nextdayDisabled: false,
    lastdayDisabled: true
  }

  componentWillReceiveProps(nextProps, ignore) {
    this.setState({ modal: nextProps.open, data: nextProps.data }, () => {
      if (this.state.data.location) {
        const address = this.state.data.address
        this.setState({
          address
        })
      }
    })
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      index: 0
    })

    this.props.toggle()
  }

  toggleAll() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true,
      index: 0
    })
  }

  increaseIndex = () => {
    const { index, data } = this.state
    if (index + 1 <= data.forecast.forecastday.length)
      this.setState({ index: index + 1 }, () => {
        this.updateButtons()
      })
  }

  decreaseIndex = () => {
    const { index } = this.state
    if (index - 1 >= 0) {
      this.setState({ index: index - 1 }, () => {
        this.updateButtons()
      })
    }
  }

  updateButtons = () => {
    const { index, data } = this.state

    if (index === 0) {
      this.setState({
        nextdayDisabled: false,
        lastdayDisabled: true
      })
    } else if (index === data.forecast.forecastday.length - 1) {
      this.setState({
        nextdayDisabled: true,
        lastdayDisabled: false
      })
    } else {
      console.log('enable both')
      this.setState({
        nextdayDisabled: false,
        lastdayDisabled: false
      })
    }
  }

  getCurrentDay = () => {
    const day = moment(
      this.state.data.forecast.forecastday[this.state.index].date
    ).day()

    console.log('current day: ', day)

    return this.state.days[day]
  }

  getNextDay = () => {
    const { forecast } = this.state.data
    if (forecast.forecastday[this.state.index + 1] !== undefined) {
      const day = moment(forecast.forecastday[this.state.index + 1].date).day()
      return this.state.days[day]
    }

    const day = moment(forecast.forecastday[this.state.index].date).day()
    return this.state.days[day]
  }

  getLastDay = () => {
    const { forecast } = this.state.data
    if (forecast.forecastday[this.state.index - 1] !== undefined) {
      const day = moment(forecast.forecastday[this.state.index - 1].date).day()
      return this.state.days[day]
    }

    const day = moment(forecast.forecastday[this.state.index].date).day()
    return this.state.days[day]
  }

  componentDidMount() {
    this.updateButtons()
  }

  render() {

    if (this.state.data.location === undefined) return <p />
    return (
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>{this.state.address}</ModalHeader>{' '}
          <ModalBody
            day={this.state.data.forecast.forecastday[this.state.index].day}
            dayText={this.getCurrentDay}
          />
          <ModalFooter>
            <Button
              color="primary"
              onClick={this.decreaseIndex}
              disabled={this.state.lastdayDisabled}
            >
              {this.getLastDay()}
            </Button>{' '}
            <Button
              color="primary"
              onClick={this.increaseIndex}
              disabled={this.state.nextdayDisabled}
            >
              {this.getNextDay()}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default ModalExample
