import React from 'react'

import './knob.scss';

export default class Knob extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: this.props.value,
      degree: this.valueToRadian(this.props.value)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.value !== this.state.value
  }

  handleChange(value) {
    this.setState({
      value: value,
      degree: this.valueToRadian(value)
    }, () => {
      if (this.props.onChangeValue) {
        this.props.onChangeValue(this.state.value)
      }
    })
  }

  valueToRadian(value) {
    return Math.round((value / 100) * 270)
  }

  render() {
    return (
      <div className="Knob">
        <div className="Knob-label">
          <input
            type="number"
            min={0}
            max={100}
            ref="input"
            className="Knob-value"
            defaultValue={this.props.value}
            value={this.state.value}
            onChange={ evt => this.handleChange(evt.target.value)}
            onWheel={ () => React.findDOMNode(this.refs.input).focus()}
          />
        </div>
        <div
          className="Knob-spinner"
          style={{
            transform: `rotate(${-45 + this.state.degree}deg)`
          }}
        >
        </div>

        <div className="Knob-indicator" style={{transform: `rotate(-45deg)`}}></div>
        <div className="Knob-indicator" style={{transform: `rotate(0deg)`}}></div>
        <div className="Knob-indicator" style={{transform: `rotate(45deg)`}}></div>
        <div className="Knob-indicator" style={{transform: `rotate(90deg)`}}></div>
        <div className="Knob-indicator" style={{transform: `rotate(135deg)`}}></div>
        <div className="Knob-indicator" style={{transform: `rotate(180deg)`}}></div>
        <div className="Knob-indicator" style={{transform: `rotate(225deg)`}}></div>

      </div>
    )
  }

}
