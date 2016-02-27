'use strict';

import React from 'react';
import Maps from '../maps.js';


let styles = {
    root:{
        background: "rgb(60, 37, 32)",
    }
}

var MonoSynth = React.createClass({
    getInitialState: function() {
        return {frequency: 440};
    },
    componentWillReceiveProps: function(nextProps) {
        if(this.props.ctx != nextProps.ctx){
            let osc = nextProps.ctx.createOscillator();
            osc.connect(nextProps.dstNode);
            osc.start();
            this.osc1 = osc;
        }
    },
    //HANDLERS
    handleChangePitch(e){
        let val = e.target.value;
        let tval = Maps.tolog(val, e.target.min, e.target.max);
        this.osc1.frequency.exponentialRampToValueAtTime(tval, this.props.ctx.currentTime +0.012);
        this.setState({frequency: val});
    },
    //RENDER
    render: function() {
        return (
            <div style={ styles.root }>
                <input type="range" min="20" max="22000" value={this.state.frequency} step="1" onChange={this.handleChangePitch}/>
            </div>
        )
    }
});

export default MonoSynth;
