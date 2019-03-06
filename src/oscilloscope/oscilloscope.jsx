'use strict'
import React from 'react'
import ReactDOM from 'react-dom'

import styled from 'styled-components'

const Root = styled.div`
  background: #c7c7bf;
  color: #161616;
  height: 200px;
  width: 1024px;
  position: relative;
`

const Canvas = styled.canvas`
  position: absolute;
  top: 10px;
  left: 10px;
  height: 180px;
  width: 700px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.5) 0 -2px 0px 2px, white 0 2px 0px 2px;
`

let backcolor = 'rgb(34, 56, 50)'
let lightcolor = 'rgb(132, 223, 196)'

class Oscilloscope extends React.Component {
  drawTime = () => {
    window.requestAnimationFrame(this.drawTime)

    let canvasCtx = this.canvasCtx
    let HEIGHT = this.HEIGHT
    let WIDTH = this.WIDTH
    let dataArray = this.dataArray
    let bufferLength = this.bufferLength

    this.analyser.getByteTimeDomainData(dataArray)

    canvasCtx.fillStyle = backcolor
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)
    canvasCtx.shadowBlur = 10
    canvasCtx.shadowColor = lightcolor

    canvasCtx.lineWidth = 2
    canvasCtx.strokeStyle = lightcolor

    canvasCtx.beginPath()

    let sliceWidth = (WIDTH * 2.0) / bufferLength
    let x = 0

    let startdraw = false

    let margin = 1
    let middle = 128

    for (let i = margin; i < bufferLength - margin; i++) {
      if (!startdraw) {
        // If we find a sample that has a positive derivative and crosses zero, we set it as a 'trigger' point and start drawing. If we find that we have already searched half the buffer just start drawing already cause we lost all hopes.
        if (
          (dataArray[i - 1] < middle && dataArray[i] >= middle) ||
          i > bufferLength / 2
        ) {
          startdraw = true
        }
      }

      if (startdraw) {
        let v = dataArray[i] / 128.0
        let y = (v * HEIGHT) / 2

        if (i === 0) {
          canvasCtx.moveTo(x, y)
        } else {
          canvasCtx.lineTo(x, y)
        }

        x += sliceWidth
      }
    }

    canvasCtx.stroke()
  }

  componentDidMount() {
    this.analyser = this.props.ctx.createAnalyser()
    this.props.node.connect(this.analyser)

    this.canvasCtx = this.canvas.getContext('2d')

    this.WIDTH = this.canvas.width
    this.HEIGHT = this.canvas.height

    this.analyser.fftSize = 2048
    this.bufferLength = this.analyser.fftSize
    this.dataArray = new Uint8Array(this.bufferLength)

    this.drawTime()
  }

  // RENDER
  render() {
    return (
      <Root>
        <Canvas
          width="700"
          height="180"
          ref={element => {
            this.canvas = element
          }}
        />
      </Root>
    )
  }
}

export default Oscilloscope
