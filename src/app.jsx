var React = require('react');

import PolySynth from './poly-synth/poly-synth.jsx';
import Keyboard from './keyboard/keyboard.jsx';

let styles = {
	stack: {
		display: "flex",
		flexDirection: "column",
		height: "100%"
	},
}

var App = React.createClass({
	getInitialState: function() {
        return {
			ctx: null,
			dstGainNode: null
		};
    },
	componentDidMount: function(){
		let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		let dstGainNode = audioCtx.createGain();
		dstGainNode.connect(audioCtx.destination);

		this.setState({
			ctx: audioCtx,
			dstNode: dstGainNode
		})
	},
    noteOff(signature){
		this.synth.stopVoice(signature);
    },
    noteOn(signature){
		this.synth.startVoice(signature);
    },
	render: function() {
		return (
			<div id="stack">
				<div id="instrument-stack">
					<PolySynth style={styles.instrument} ctx={this.state.ctx} dstNode={this.state.dstNode} ref={(ref) => this.synth = ref}/>
				</div>
				<Keyboard style={styles.keyboard} noteOn={this.noteOn} noteOff={this.noteOff} />
			</div>
		)
	}
});


export default App;
