import React, { Component } from 'react'
import styled from 'styled-components'

const CountdownWrapper = styled.div`
  background: #183059;
  color: #183059;
  display: flex;
  justify-content: space-between;
  height: 300px;
  padding: 36px;
`

const TimeItem = styled.div`
  background: ${props => props.background};
  padding: 20px;
  align-self: center;
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;

  h2 {
    font-size: 5rem;
    font-family: 'Montserrat', sans-serif;
    margin-bottom: 0px;
  }

  p {
    text-transform: uppercase;
    letter-spacing: 5px;
    color: #f6f4f3;
    font-family: 'Lato', sans-serif;
    margin-bottom: 0;
  }
`

const END_DT = '01/20/2019 12:00'

export default class Countdown extends Component {
  state = {
    years: 0,
    days: 0,
    hours: 0,
    min: 0,
    sec: 0,
  }

  calculateCountdown(endDate) {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000

    // clear countdown when date is reached
    if (diff <= 0) return false

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    }

    // calculate time difference between now and expected date
    if (diff >= 365.25 * 86400) {
      // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400))
      diff -= timeLeft.years * 365.25 * 86400
    }
    if (diff >= 86400) {
      // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400)
      diff -= timeLeft.days * 86400
    }
    if (diff >= 3600) {
      // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600)
      diff -= timeLeft.hours * 3600
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60)
      diff -= timeLeft.min * 60
    }
    timeLeft.sec = diff

    return timeLeft
  }

  componentDidMount = () => {
    this.interval = setInterval(() => {
      const date = this.calculateCountdown(END_DT)

      // update the state as long as it's not the end datetime
      // stop the interval once the end datetime is met
      date ? this.setState(date) : clearInterval(this.interval)
    }, 1000)
  }

  componentWillUnmount = () => {
    clearInterval(this.interval)
  }

  addLeadingZeros(value) {
    value = String(value)
    while (value.length < 2) {
      value = '0' + value
    }
    return value
  }

  render() {
    return (
      <CountdownWrapper>
        <TimeItem background="#EF2F3C">
          <h2>{this.addLeadingZeros(this.state.days)}</h2>
          <p>days</p>
        </TimeItem>
        <TimeItem background="#6EAA4B">
          <h2>{this.addLeadingZeros(this.state.hours)}</h2>
          <p>hours</p>
        </TimeItem>
        <TimeItem background="#276FBF">
          <h2>{this.addLeadingZeros(this.state.min)}</h2>
          <p>minutes</p>
        </TimeItem>
        <TimeItem background="#F0A202">
          <h2>{this.addLeadingZeros(this.state.sec)}</h2>
          <p>seconds</p>
        </TimeItem>
      </CountdownWrapper>
    )
  }
}