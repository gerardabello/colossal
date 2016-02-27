'use strict';

import React from 'react';
import Maps from '../maps.js';
import Voice from './voice.js';

let styles = {
    root:{
        background: "rgb(60, 37, 32)",
    }
}

var PolySynth = React.createClass({
    getInitialState: function() {
        return {notes:{}};
    },
    componentWillReceiveProps: function(nextProps) {
    },
    //HANDLERS
    handleMouseDown(note){
        let v = new Voice(this.props.ctx, this.props.dstNode,440,0.012,1,0.001,1,1);
        let n = this.state.notes;
        n[note] = v;
        this.setState({ notes: n});
    },
    handleMouseUp(note){
        this.state.notes[note].finish();
    },
    //RENDER
    render: function() {
        return (
            <div style={ styles.root }>
                <button type="button" onMouseDown={this.handleMouseDown.bind(this,"A4")} onMouseUp={this.handleMouseUp.bind(this,"A4")}>Click Me!</button>
            </div>
        )
    }
});

export default PolySynth;
