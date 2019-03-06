import React from 'react'
import styled from 'styled-components'

let Note = require('octavian').Note

const whiteLength = 100
const whiteHeight = 10

const blackWidth = 16
const blackLength = 70
const blackHeight = 5

const Root = styled.div`
  background: rgb(51, 37, 28);

  color: white;

  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  overflow: hidden;

  box-shadow: black 0 -6px;
  position: relative;

  height: 100%;
`

const Helper = styled.div`
  font-family: sans-serif;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 14px;
`

const Container = styled.div`
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.54) 0 0 80px;
  width: 90%;
`

const Key = styled.div`
  transition: box-shadow 0.1s ease, height 0.1s ease, background-color 0.1s ease,
    color 0.1s ease;
  display: inline-block;
  text-align: center;

  font-size: 9px;
  font-family: sans-serif;
  color: rgba(0, 0, 0, 0);

  ${props =>
    props.white &&
    `

  background-color: #f6f6f6;
  height: ${whiteLength}px;
  flex: 1;
  border: 1px solid #b5b5b5;
  box-shadow: 0 ${whiteHeight}px 0 #868686;
  &:hover {
  color: rgba(0, 0, 0, 0.5);
  }

  `};

  ${props =>
    props.black &&
    `
  display: inline-block;
  background-color: #212121;
  border: #464646 1px solid;
  box-shadow: #1B1B1B 0px ${blackHeight}px 0px, rgba(0, 0, 0, 0.7) 0 4px 20px -2px;
  position: relative;
  width: ${blackWidth};
  margin-right: ${-(blackWidth + 3)}px;
  left: ${-blackWidth / 2}px;
  height: ${blackLength}px;
  top: 0px;

  &:hover {
  color: rgba(255, 255, 255, 0.5);
  }
  `};

  ${props =>
    props.white &&
    props.pressed &&
    `
  background-color: #e0e0e0;
  height: ${whiteLength + whiteHeight}px;
  box-shadow: #D6D6D6 0px 0px 0px;
  `};

  ${props =>
    props.black &&
    props.pressed &&
    `
  background-color: #1d1d1d;
  height: ${blackLength + blackHeight}px;
  box-shadow: #464646 0px 0px 0px;
  `};
`

let keynotemap = {
  65: 'C3', // A
  83: 'D3', // S
  68: 'E3', // D
  70: 'F3', // F
  71: 'G3', // G
  72: 'A3', // H
  74: 'B3' // J
}

class Keyboard extends React.Component {
  state = { pressedKeys: [] }

  componentDidMount() {
    window.addEventListener(
      'keydown',
      function(event) {
        let signature = keynotemap[event.keyCode]
        if (signature != null) {
          this.noteOn(signature)
        }
      }.bind(this),
      false
    )
    window.addEventListener(
      'keyup',
      function(event) {
        let signature = keynotemap[event.keyCode]
        if (signature != null) {
          this.noteOff(signature)
        }
      }.bind(this),
      false
    )
  }
  // HANDLERS

  noteOff = signature => {
    let index = this.state.pressedKeys.indexOf(signature)
    if (index > -1) {
      this.props.noteOff(signature)
      this.state.pressedKeys.splice(index, 1)
      this.setState({ pressedKeys: this.state.pressedKeys })
    }
  }

  noteOn = signature => {
    let index = this.state.pressedKeys.indexOf(signature)
    if (index === -1) {
      this.props.noteOn(signature)
      this.state.pressedKeys.push(signature)
      this.setState({ pressedKeys: this.state.pressedKeys })
    }
  }
  // RENDER

  render() {
    let octaves = 4
    let note = new Note('C2')

    let nkeys = []
    for (let i = 0; i < octaves * 12; i++) {
      let pressed = this.state.pressedKeys.indexOf(note.signature) !== -1
      let black = note.modifier != null
      nkeys.push(
        <Key
          pressed={pressed}
          white={!black}
          black={black}
          key={note.signature}
          type="button"
          onMouseDown={this.noteOn.bind(this, note.signature)}
          onMouseUp={this.noteOff.bind(this, note.signature)}
          onMouseLeave={this.noteOff.bind(this, note.signature)}>
          {note.signature}
        </Key>
      )
      note = note.minorSecond()
    }

    return (
      <Root>
        <Container>{nkeys}</Container>
        <Helper>Press keys A to J or use virtual keyboard</Helper>
      </Root>
    )
  }
}

export default Keyboard
