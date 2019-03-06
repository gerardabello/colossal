import React from 'react'
import styled from 'styled-components'

import Maps from '../../maps.js'

const Root = styled.div`
  ${props => props.size === 'small' && `
  font-size: 8px;
  width: $smallSize;
  height: $smallSize;
  `
  }

  ${props => props.size === 'big' && `
  width: 65px;
  height: 65px;
  margin: 20px;
  `
  }

  font-size: 10px;
  position: relative;
  background-color: grey;
  width: $size;
  height: $size;
  border-radius: 50%;
  border: solid 2px #000000;
  margin: 6px;
  margin-bottom: 20px;
  background: #353535;
  background: -webkit-gradient(linear, left bottom, left top, color-stop(0, #2F2F2F), color-stop(1, #383838));
  box-shadow: inset 0 0.2em 0 0.1px rgba(255, 255, 255, 0.25), inset 0 -0.2em 0 0.1px rgba(0, 0, 0, 0.19), 0 0.6em 1.2em 0 black, 0 0 2px 1px rgba(255, 255, 255, 0.2), 0 0 20px -2px rgba(255, 255, 255, 0.25);

`

const Knob = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform: rotate(0deg);
  z-index: 10;

  ${props => props.animated && `
  transition: 0.5s ease all;
  `
  }

  &:before {
    content: "";
    position: absolute;
    bottom: 10%;
    left: 47%;
    width: 10%;
    height: 14%;
    background-color: #A8F8F2;
    border-radius: 50%;
    box-shadow: 0 0 0.4em 0 #8ee7e0;
  }
`

const Label = styled.span`
  position: absolute;
  width: 200%;
  left: -50%;
  top: 120%;
  text-align: center;
`



const KnobComponent = React.createClass({
  getInitialState: function () {
    return {
      value: this.reverseLaw(this.getValueLink(this.props).value),
      dragging: false,
      dragPoint: [0.0, 0.0],
      dragStartValue: 0
    }
  },

  getValueLink: function (props) {
    // Create an object that works just like the one
    // returned from `this.linkState` if we weren't passed
    // one; that way, we can always behave as if we're using
    // `valueLink`, even if we're using plain `value` and `onChange`.
    return props.valueLink || {
      value: props.value,
      requestChange: props.onChange
    }
  },

  componentWillReceiveProps (nextProps) {
    this.setState({value: this.reverseLaw(this.getValueLink(nextProps).value)})
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return this.state.value != nextState.value
  },

  handleChange (value) {
    if (value > 1) { value = 1 }
    if (value < 0) { value = 0 }
    this.setState({
      value: value
    }, () => {
      this.getValueLink(this.props).requestChange(this.applyLaw(value))
    })
  },

  applyLaw (v) {
    return Maps.applyLaw(v, this.props.min, this.props.max, this.props.law)
  },
  reverseLaw (v) {
    return Maps.reverseLaw(v, this.props.min, this.props.max, this.props.law)
  },

  valueToDeg (value) {
    return Math.round(value * 270)
  },

  onMouseDown (e) {
    if (e.button == 2) {
      let def = 0
      if (def < this.props.min || def > this.props.max) {
        def = this.props.min
      }
      if (this.props.defaultValue != null) {
        def = this.props.defaultValue
      }
      this.handleChange(this.reverseLaw(def))
      return
    }
    this.setState({dragPoint: [e.screenX, e.screenY], dragging: true, dragStartValue: this.state.value})
  },

  handleMoveAll: function (e) {
    if (this.state.dragging) {
      let value = this.state.dragPoint[1] - e.screenY
      value *= 0.003 // scale
      this.handleChange(this.state.dragStartValue + value)
    }
  },

  handleMouseUp: function () {
    this.setState({dragging: false})
  },

  componentDidMount: function () {
    window.addEventListener('mousemove', this.handleMoveAll)
    window.addEventListener('mouseup', this.handleMouseUp)
  },

  render () {
    let rdeg = 45 + this.valueToDeg(this.state.value)

    return (

      <Root size={this.props.size} onMouseDown={this.onMouseDown} >
        <Knob
          style={{
            transform: `rotate(${rdeg}deg)`
          }}
        />

      <Label>{this.props.label}</Label>

    </Root>
    )
  }
})

export default KnobComponent
