import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  height: 22px;

  margin: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  box-shadow: #363636 0 0 1px 1px;
  border-radius: 4px;
  border: 1px solid #080808;
  background: #000000;

  color: #a8f8f2;
  font-family: monospace;
  font-size: 14px;

  overflow: hidden;
`

const Text = styled.div`
  width: 100%;
  text-align: center;
`
const Arrow = styled.div`
  cursor: pointer;
  width: 14px;
  text-align: center;

  background: #1d1d1d;
  border: 1px solid #252525;
  padding: 2px 2px;
`

class Selector extends React.Component {
  getValueLink = props => {
    // Create an object that works just like the one
    // returned from `this.linkState` if we weren't passed
    // one; that way, we can always behave as if we're using
    // `valueLink`, even if we're using plain `value` and `onChange`.
    return (
      props.valueLink || {
        value: props.value,
        requestChange: props.onChange
      }
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.value !== nextState.value
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: this.getValueLink(nextProps).value })
  }

  handleChange = value => {
    this.setState(
      {
        value: value
      },
      () => {
        this.getValueLink(this.props).requestChange(value)
      }
    )
  }

  onToggle = () => {
    // This only works if we have 2 values
    if (this.props.values.length > 2) {
      return
    }
    this.onNext()
  }

  onNext = () => {
    let ci = this.props.values.indexOf(this.state.value)
    let i = ci + 1

    if (i >= this.props.values.length) {
      i = 0
    }

    this.handleChange(this.props.values[i])
  }

  onPrevious = () => {
    let ci = this.props.values.indexOf(this.state.value)
    let i = ci - 1

    if (i < 0) {
      i = this.props.values.length - 1
    }

    this.handleChange(this.props.values[i])
  }

  state = {
    value: this.getValueLink(this.props).value
  }

  render() {
    let arrowl = []
    let arrowr = []

    if (this.props.values.length > 2) {
      arrowl = <Arrow onClick={this.onPrevious}>{'<'}</Arrow>
      arrowr = <Arrow onClick={this.onNext}>{'>'}</Arrow>
    }

    return (
      <Root onClick={this.onToggle}>
        {arrowl}

        <Text>{this.state.value}</Text>

        {arrowr}
      </Root>
    )
  }
}

export default Selector
