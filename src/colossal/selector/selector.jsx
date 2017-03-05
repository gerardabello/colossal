import React from 'react'

import './selector.scss'

let Selector = React.createClass({
  getInitialState: function () {
    return {
      value: this.getValueLink(this.props).value
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

  shouldComponentUpdate: function (nextProps, nextState) {
    return this.state.value != nextState.value
  },

  componentWillReceiveProps (nextProps) {
    this.setState({value: this.getValueLink(nextProps).value})
  },

  handleChange (value) {
    this.setState({
      value: value
    }, () => {
      this.getValueLink(this.props).requestChange(value)
    })
  },

  onToggle () {
        // This only works if we have 2 values
    if (this.props.values.length > 2) {
      return
    }
    this.onNext()
  },

  onNext () {
    let ci = this.props.values.indexOf(this.state.value)
    let i = ci + 1

    if (i >= this.props.values.length) {
      i = 0
    }

    this.handleChange(this.props.values[i])
  },
  onPrevious () {
    let ci = this.props.values.indexOf(this.state.value)
    let i = ci - 1

    if (i < 0) {
      i = this.props.values.length - 1
    }

    this.handleChange(this.props.values[i])
  },

  render () {
    let arrowl = []
    let arrowr = []

    if (this.props.values.length > 2) {
      arrowl = (<div className='left arrow' onClick={this.onPrevious}>{'<'}</div>)
      arrowr = (<div className='right arrow' onClick={this.onNext}>{'>'}</div>)
    }

    return (
      <div className='selector' onClick={this.onToggle}>
        {arrowl}

        <div className='text'>
          {this.state.value}
        </div>

        {arrowr}

      </div>
    )
  }
})

export default Selector
