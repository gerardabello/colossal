'use strict'
import React from 'react'

import Voice from '../colossal/voice/voice.js'

let styles = {
  root: {}
}

class Test extends React.Component {
  state = {}

  componentDidMount() {
    this.outGain = this.props.ctx.createGain()
    this.outGain.connect(this.props.dstNode)

    this.create()
  }

  destroy = () => {
    this.v.destroy()
    this.v = null
  }

  create = () => {
    this.v = new Voice(this.props.ctx, this.outGain)
  }

  start = () => {
    this.v.trigger('C2')
  }

  stop = () => {
    this.v.end('C2')
  }
  // RENDER

  render() {
    return (
      <div style={styles.root}>
        <button onClick={this.start}>start</button>
        <button onClick={this.stop}>stop</button>
        <button onClick={this.create}>create</button>
        <button onClick={this.destroy}>destroy</button>
      </div>
    )
  }
}

export default Test
