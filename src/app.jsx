import React from 'react'

import { createGlobalStyle } from "styled-components";
import Colossal from './colossal/colossal.jsx'
import Test from './test/test.jsx'
import Keyboard from './keyboard/keyboard.jsx'
import Oscilloscope from './oscilloscope/oscilloscope.jsx'

import ContextWarning from './context-warning.jsx'

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

#react-root {
    height:100%;
    margin:0;
}

#stack{
	display: flex;
	flex-direction: column;
	height: 100%;
}


#instrument-panel{
    background: #20394b;
    display: flex;
    flex-direction: column;
    align-items: center;
    #instrument-stack{
        height: 550px;
        justify-content: center;
        background-color: #131415;

        display: flex;
        flex-direction: column;
        align-items: center;
        width: 1024px;

        border-left: 7px solid #5F4D42;
        border-right: 7px solid #5F4D42;
        box-shadow: black 0 0 30px;

        > div {
            $m: 2px;
            margin: $m;
            box-shadow: #131313 0 $m,#424242 0 (-$m);
        }
    }
}


















//BASE COLORS
$back-color: #272727;
$color: #898989;;



//

.colossal {
    background: $back-color;
    color: $color;
    height: 200px;
    width: 1024px;
    font-family: sans-serif;
    position: relative;

    .oscillators{
        //self positioning
        position: absolute;
        width: 200px;
        height: 200px;

        display: flex;
        flex-direction: row;

        .osc{
            flex: 1;

        }

    }


    .filt1{
        //self positioning
        left: 200px;
        position: absolute;
        width: 300px;
        height: 200px;

    }

    .env{
        //self positioning
        position: absolute;
        left: 500px;
        width: 250px;
        height: 200px;
    }

    .glide{
        //self positioning
        position: absolute;
        left: 751px;
        width: 100px;
        top: 42px;
        height: 160px;
    }

    .mode{
        //self positioning
        position: absolute;
        left: 751px;
        width: 100px;
        height: 40px;
    }

    .preset{
        //self positioning
        position: absolute;
        left: 851px;
        width: 171px;
        height: 80px;
    }

    .out{
        position: absolute;
        left: 852px;
        top: 80px;
        width: 120px;
        height: 120px;
        justify-content: flex-start;
        align-items: center;
    }


    .level{
        position: absolute;
        left: 972px;
        top: 80px;
        width: 50px;
        height: 120px;
    }

    .section{
        border: rgba(0, 0, 0, 0) 1px solid;
        display: flex;
        flex-direction: column;

        h2 {
            text-align: center;
            font-size: 26px;
            margin: 0;
            color: rgb(26, 26, 26);
            text-shadow: 0 1px 0 #3C3C3C;
        }

        &.disabled{
            pointer-events:none;
            opacity: 0.3;
        }
    }

    .subsection{
        flex: 1;
        display: flex;
        justify-content: space-around;

        &.center{
            align-items: center;
        }

        &.horitzontal{

        }

        &.vertical{
            flex-direction: column;
        }
    }
}






$white-lenght: 100px;
$white-height: 10px;

$black-width: 16px;
$black-lenght: 70px;
$black-height: 5px;

#keyboard {

    background: rgb(51, 37, 28);

    color: white;

    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;


    height: $white-lenght + 20px;
    overflow: hidden;

    border-top: black 4px solid;

    > span{
        text-align: center;
        margin: 20px;
    }

    .container{
        height: $white-lenght + $white-height + 2px;
        display: flex;
        box-shadow: rgba(0, 0, 0, 0.54) 0 0 80px;
        width: 90%;
    }

    .key {
        transition: box-shadow 0.1s ease, height 0.1s ease, background-color 0.1s ease, color 0.1s ease;
        display: inline-block;
        text-align: center;

        font-size: 9px;
        font-family: sans-serif;
        color: rgba(0, 0, 0, 0);



        &.white:hover{
            color: rgba(0, 0, 0, 0.5);
        }

        &.black:hover{
            color: rgba(255, 255, 255, 0.5);
        }


        &.white.pressed {
            background-color: #e0e0e0;
            height: $white-lenght + $white-height;
            box-shadow: #D6D6D6 0px 0px 0px;
        }

        &.black.pressed {
            background-color: #1d1d1d;
            height: $black-lenght + $black-height;
            box-shadow: #464646 0px 0px 0px;
        }

        &.white {
            background-color: #f6f6f6;
            height: $white-lenght;
            flex: 1;
            border: 1px solid #b5b5b5;
            box-shadow: 0 $white-height 0 #868686;
        }

        &.black {
            display: inline-block;
            background-color: #212121;
            border: #464646 1px solid;
            box-shadow: #1B1B1B 0px $black-height 0px, rgba(0, 0, 0, 0.7) 0 4px 20px -2px;
            position: relative;
            width: $black-width;
            margin-right: -($black-width + 3px);
            left: -($black-width / 2);
            height: $black-lenght;
            top: 0px;
        }

    }


}

`;

let styles = {
  stack: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  }
}

let App = React.createClass({
  getInitialState: function () {
    return {
      ctx: null,
      dstGainNode: null
    }
  },
  componentWillMount: function () {
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    let dstGainNode = audioCtx.createGain()
    dstGainNode.connect(audioCtx.destination)

    audioCtx.onstatechange = function () {
      this.setState({ctxStatus: audioCtx.state})
    }.bind(this)

    this.setState({
      ctx: audioCtx,
      dstNode: dstGainNode,
      ctxStatus: audioCtx.state
    })
  },
  noteOff (signature) {
    this.synth.stopVoice(signature)
  },
  noteOn (signature) {
    this.synth.startVoice(signature)
  },
  shouldComponentUpdate (nextProps, nextState) {
    return nextState.ctxStatus !== this.state.ctxStatus
  },
  render: function () {
    return (
      <div>
        <GlobalStyle />
      <div id='stack'>
        <div id='instrument-panel'>
          <div id='instrument-stack'>
            <Colossal ctx={this.state.ctx} dstNode={this.state.dstNode} ref={(ref) => this.synth = ref} />
            <Oscilloscope ctx={this.state.ctx} node={this.state.dstNode} />
          </div>
        </div>
        <Keyboard style={styles.keyboard} noteOn={this.noteOn} noteOff={this.noteOff} />
        <ContextWarning show={this.state.ctxStatus !== 'running'} />
      </div>
      </div>
    )
  }
})

export default App
