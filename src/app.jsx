import React from 'react'

import styled, { createGlobalStyle } from 'styled-components'
import Colossal from './colossal/colossal.jsx'
import Keyboard from './keyboard/keyboard.jsx'
// import Oscilloscope from './oscilloscope/oscilloscope.jsx'

const KeyboardWrapper = styled.div`
  height: 155px;
`

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
const InstrumentPanel = styled.div`
  background: #131415;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const InstrumentStack = styled.div`
  flex: 1;
  justify-content: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1024px;

  box-shadow: #424242 0 0 0 4px, #000000 0 0 0 12px;

  & > div {
    box-shadow: #000000 0 2px, #424242 0 -2px;
    margin: 2px;
  }
`

const GlobalStyle = createGlobalStyle`

    //this prevents selection
    :not(input):not(textarea),
    :not(input):not(textarea)::after,
    :not(input):not(textarea)::before {
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none;   /* Chrome/Safari/Opera */
      -moz-user-select: none;      /* Firefox */
      -ms-user-select: none;       /* Internet Explorer/Edge */
      user-select: none;           /* Non-prefixed version, currently*/
      cursor: default;
    }
    input, button, textarea, :focus {
      outline: none; // You should add some other style for :focus to help UX/a11y
    }

    html, body {
      height:100%;
      margin:0;
    }

    `

let styles = {
  stack: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  }
}

class App extends React.Component {
  state = {
    ctx: null,
    dstGainNode: null
  }

  componentWillMount() {
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    let dstGainNode = audioCtx.createGain()
    dstGainNode.connect(audioCtx.destination)

    audioCtx.onstatechange = function() {
      this.setState({ ctxStatus: audioCtx.state })
    }.bind(this)

    this.setState({
      ctx: audioCtx,
      dstNode: dstGainNode,
      ctxStatus: audioCtx.state
    })
  }

  noteOff = signature => {
    this.synth.stopVoice(signature)
  }

  noteOn = signature => {
    this.synth.startVoice(signature)
  }

  render() {
    return (
      <Stack>
        <GlobalStyle />
        <InstrumentPanel>
          <InstrumentStack>
            <Colossal
              ctx={this.state.ctx}
              dstNode={this.state.dstNode}
              ref={ref => (this.synth = ref)}
            />
            {/*
          <Oscilloscope ctx={this.state.ctx} node={this.state.dstNode} />
        */}
          </InstrumentStack>
        </InstrumentPanel>
        <KeyboardWrapper>
          <Keyboard
            style={styles.keyboard}
            noteOn={this.noteOn}
            noteOff={this.noteOff}
          />
        </KeyboardWrapper>
      </Stack>
    )
  }
}

export default App
