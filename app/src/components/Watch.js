import {Component} from 'react';

export default class Watch extends Component {
  constructor(props) {
    super(props)
    this.initiateDate = new Date();
    this.state = {
      sec: (this.initiateDate.getSeconds() / 60) * 360,
      min: (this.initiateDate.getMinutes() / 60) * 360,
      hour: this.calcTimezone(),
    }
    this.calcSec = this.calcSec.bind(this);
    this.calcMin = this.calcMin.bind(this);
    this.calcHour = this.calcHour.bind(this);
  }

  componentDidMount() {
    this.secInterval = setInterval(this.calcSec, 1000);
    setTimeout(this.calcMin, 1000 * (60 - this.initiateDate.getSeconds()));
    setTimeout(this.calcHour, 1000 * (60 - this.initiateDate.getMinutes()) * 60);
  }

  componentWillUnmount() {
    clearInterval(this.secInterval);
    clearInterval(this.minInterval);
    clearInterval(this.hourInterval);
  }

  calcSec() {
    console.log(this.state.sec)
    this.setState({
      sec: this.state.sec + 6,
      min: this.state.min,
      hour: this.state.hour,
    })
  }

  calcMin() {
    this.setState({
      sec: this.state.sec,
      min: this.state.min + 6,
      hour: this.state.hour,
    })

    if (this.minInterval) {
      return;
    }

    this.minInterval = setInterval(this.calcMin, 1000 * 60)
  }

  calcHour() {
    this.setState({
      sec: this.state.sec,
      min: this.state.min,
      hour: this.state.hour + 30,
    })

    if (this.hourInterval) {
      return;
    }

    this.hourInterval = setInterval(this.calcHour, 1000 * 3600)
  }

  calcTimezone() {
    let timezonedHours = this.initiateDate.getHours() + +this.props.timezone;

    if (timezonedHours >= 24) {
      timezonedHours = timezonedHours - 24;
    }

    if (timezonedHours < 0) {
      timezonedHours = 12 + timezonedHours;
    }

    if (timezonedHours === 0) {
      timezonedHours = 12;
    }

    return (timezonedHours / 12) * 360
  }

  render() {
    return (
      <li className={'watch-item'} id={this.props.id} onClick={this.props.removeWatch}>
        <h5 className='watch__header'>{this.props.name}</h5>
        <div className={'watch'}>
          <div className='arrow sec-arrow' style={{transform: `rotate(${this.state.sec}deg)`}}></div>
          <div className='arrow min-arrow' style={{transform: `rotate(${this.state.min}deg)`}}></div>
          <div className='arrow hour-arrow' style={{transform: `rotate(${this.state.hour}deg)`}}></div>
          <span className='watch__delete'>x</span>
        </div>
      </li>
    )
  }
}