import React from 'react'
import ReactDOM from 'react-dom'

import Maps from '../../maps.js'

import styled from 'styled-components'

const Root = styled.div`
  margin: 8px;
  flex: 0 0 25px;
  box-shadow: rgba(0, 0, 0, 0.41) 0 0px 4px inset, #242424 0 0 0px 10px inset;
  background-color: #080808;
  border: 1px solid #0e0e0e;
  border-radius: 4px;
`

const Knob = styled.div`
  //for label
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: ns-resize;

  box-shadow: 0 0.2em 0 0.1px rgba(255, 255, 255, 0.25) inset,
    0 -0.2em 0px 0.1px rgba(0, 0, 0, 0.19) inset, 0 0 10px rgba(0, 0, 0, 0.24),
    black 0 0 1px 1px;
  background-color: #333333;
  position: absolute;
  width: 25px;
  height: 35px;
  border-radius: 5px;

  color: #868686;
  font-weight: normal;
  text-shadow: #000000 0 1px;

  ${props =>
    props.animated
      ? `
  transition: 0.5s ease all
  `
      : ``};
`

class Slider extends React.Component {
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
      value /= this.state.height - this.state.knobheight // scale
      this.handleChange(this.state.dragStartValue + value)
    }
  }

  handleMouseUp = () => {
    this.setState({ dragging: false })
  }

  state = {
    dragging: false,
    dragPoint: [0.0, 0.0],
    dragStartValue: 0,
    height: 1,
    knobheight: 1
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMoveAll)
    window.addEventListener('mouseup', this.handleMouseUp)

    let dom = ReactDOM.findDOMNode(this)

    this.setState({
      height: dom.clientHeight,
      knobheight: dom.children[0].clientHeight
    })
    this.forceUpdate()
  }

  render() {
    return (
      <Root>
        <Knob
          animated={!this.state.dragging}
          onMouseDown={this.onMouseDown}
          style={{
            transform:
              'translateY(' +
              (1 - this.reverseLaw(this.props.value)) *
                (this.state.height - this.state.knobheight) +
              'px)'
          }}>
          {this.props.label}
        </Knob>
      </Root>
    )
  }
}

export default Slider
