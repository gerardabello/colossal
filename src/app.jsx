var React = require('react');

import Colossal from './colossal/colossal.jsx';
import Test from './test/test.jsx';
import Keyboard from './keyboard/keyboard.jsx';
import Oscilloscope from './oscilloscope/oscilloscope.jsx';

import ContextWarning from './context-warning.jsx';

let styles = {
    stack: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
};

var App = React.createClass({
    getInitialState: function() {
        return {
            ctx: null,
            dstGainNode: null,
        };
    },
    componentWillMount: function(){
        let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        let dstGainNode = audioCtx.createGain();
        dstGainNode.connect(audioCtx.destination);

        audioCtx.onstatechange = function() {
          this.setState({ctxStatus: audioCtx.state});
        }.bind(this);

        this.setState({
            ctx: audioCtx,
            dstNode: dstGainNode,
            ctxStatus: audioCtx.state,
        });
    },
    noteOff(signature){
        this.synth.stopVoice(signature);
    },
    noteOn(signature){
        this.synth.startVoice(signature);
    },
    shouldComponentUpdate(nextProps, nextState){
        return nextState.ctxStatus !== this.state.ctxStatus;
    },
    render: function() {

        return (
			<div id="stack">
            <div id="instrument-panel">
                <div id="instrument-stack">
                    <Colossal ctx={this.state.ctx} dstNode={this.state.dstNode} ref={(ref) => this.synth = ref}/>
                    <Oscilloscope ctx={this.state.ctx} node={this.state.dstNode}/>
                </div>
            </div>
			<Keyboard style={styles.keyboard} noteOn={this.noteOn} noteOff={this.noteOff} />
      <ContextWarning show={this.state.ctxStatus !== 'running'}/>
			</div>
		);
    }
});


export default App;
