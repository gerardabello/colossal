import React from 'react'
import styled from 'styled-components'

import Maps from '../../maps.js'

const Root = styled.div`
  position: relative;
  font-size: 10px;

  ${props =>
    props.size === 'small' &&
    `
  font-size: 8px;
  `}

  color: #868686;
  font-weight: normal;
  text-shadow: #000000 0 1px;
`

const Wrapper = styled.div`
  cursor: ns-resize;
  font-size: 10px;
  position: relative;
  background-color: grey;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: solid 2px #000000;
  margin: 0 auto;
  margin-bottom: 20px;
  background: #353535;
  background: -webkit-gradient(
    linear,
    left bottom,
    left top,
    color-stop(0, #2f2f2f),
    color-stop(1, #383838)
  );
  box-shadow: inset 0 0.2em 0 0.1px rgba(255, 255, 255, 0.25),
    inset 0 -0.2em 0 0.1px rgba(0, 0, 0, 0.19), 0 0.6em 1.2em 0 black,
    0 0 2px 1px rgba(255, 255, 255, 0.2),
    0 0 20px -2px rgba(255, 255, 255, 0.25);

  ${props =>
    props.size === 'small' &&
    `
  font-size: 8px;
  width: 22px;
  height: 22px;
  `}

  ${props =>
    props.size === 'big' &&
    `
  width: 65px;
  height: 65px;
  margin: 20px;
  `}
`

const Knob = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform: rotate(0deg);
  z-index: 10;

  ${props =>
    props.animated &&
    `
  transition: 0.5s ease all;
  `}

  cursor: ns-resize;

  &:before {
    content: '';
    position: absolute;
    bottom: 10%;
    left: 47%;
    width: 10%;
    height: 14%;
    background-color: #a8f8f2;
    border-radius: 50%;
    box-shadow: 0 0 0.4em 0 #8ee7e0;
  }
`

const Label = styled.span`
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  bottom: 0;
  height: 16px;
`

class KnobComponent extends React.Component {
  handleChange = value => {
    if (value > 1) {
      value = 1
    }
    if (value < 0) {
      value = 0
    }

    this.props.onChange(this.applyLaw(value))
  }

  applyLaw = v => {
    return Maps.applyLaw(v, this.props.min, this.props.max, this.props.law)
  }

  reverseLaw = v => {
    return Maps.reverseLaw(v, this.props.min, this.props.max, this.props.law)
  }

  valueToDeg = value => {
    return Math.round(value * 270)
  }

  onMouseDown = e => {
    this.setState({
      dragPoint: [e.screenX, e.screenY],
      dragging: true,
      dragStartValue: this.reverseLaw(this.props.value)
    })
  }

  handleMoveAll = e => {
    if (this.state.dragging) {
      let value = this.state.dragPoint[1] - e.screenY
      value *= 0.003 // scale
      this.handleChange(this.state.dragStartValue + value)
    }
  }

  handleMouseUp = () => {
    this.setState({ dragging: false })
  }

  state = {
    dragging: false,
    dragPoint: [0.0, 0.0],
    dragStartValue: 0
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMoveAll)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  render() {
    let rdeg = 45 + this.valueToDeg(this.reverseLaw(this.props.value))

    return (
      <Root size={this.props.size}>
        <Label>{this.props.label}</Label>
        <Wrapper size={this.props.size} onMouseDown={this.onMouseDown}>
          <Knob
            animated={!this.state.dragging}
            style={{
              transform: `rotate(${rdeg}deg)`
            }}
          />
        </Wrapper>
      </Root>
    )
  }
}

export default KnobComponent
