var React = require('react');

import MonoSynth from './mono-synth/mono-synth.jsx';
import PolySynth from './poly-synth/poly-synth.jsx';

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
	render: function() {
		return (
			<div>
				<PolySynth ctx={this.state.ctx} dstNode={this.state.dstNode}/>
			</div>
		)
	}
});


export default App;
