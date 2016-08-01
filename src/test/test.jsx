'use strict';
import React from 'react';

import Voice from '../voice/voice.js';

let styles = {
    root: {

    }
};



var Test = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        this.outGain = this.props.ctx.createGain();
        this.outGain.connect(this.props.dstNode);

        this.create();
    },
    destroy: function(){
        this.v.destroy();
        this.v = null;
    },
    create: function(){
        this.v = new Voice(this.props.ctx, this.outGain);
    },
    start: function(){
        this.v.trigger('C2');
    },
    stop: function(){
        this.v.end('C2');
    },
    //RENDER
    render: function() {
        return (
            <div style={styles.root}>
            <button onClick={this.start}>start</button>
            <button onClick={this.stop}>stop</button>
            <button onClick={this.create}>create</button>
            <button onClick={this.destroy}>destroy</button>
            </div>
        );
    }
});

export default Test;
