'use strict';

import React from 'react';

var Note = require('octavian').Note;

import './keyboard.scss';


let keynotemap = {
    65 : 'C3', //A
    83 : 'D3', //S
    68 : 'E3', //D
    70 : 'F3', //F
    71 : 'G3', //G
    72 : 'A3', //H
    74 : 'B3', //J
};


var Keyboard = React.createClass({
    getInitialState: function() {
        return {pressedKeys: []};
    },
    componentDidMount(){
        window.addEventListener('keydown', function(event) {
            this.noteOn(keynotemap[event.keyCode]);
        }.bind(this), false);
        window.addEventListener('keyup', function(event) {
            this.noteOff(keynotemap[event.keyCode]);
        }.bind(this), false);
    },
    //HANDLERS
    noteOff(signature){
        let index = this.state.pressedKeys.indexOf(signature);
        if (index > -1) {
            this.props.noteOff(signature);
            this.state.pressedKeys.splice(index, 1);
            this.setState({pressedKeys: this.state.pressedKeys});
        }
    },
    noteOn(signature){
        let index = this.state.pressedKeys.indexOf(signature);
        if (index == -1) {
            this.props.noteOn(signature);
            this.state.pressedKeys.push(signature);
            this.setState({pressedKeys: this.state.pressedKeys});
        }
    },
    //RENDER
    render: function() {
        let octaves = 4;
        var note = new Note('C2');

        let nkeys = [];
        for (var i=0; i < octaves*12; i++) {
            let pressed = this.state.pressedKeys.indexOf(note.signature) != -1;
            let black = note.modifier != null;
            nkeys.push(
                <div className={'key' + ' ' + (pressed? 'pressed': '') + ' ' + (black? 'black':'white')} key={note.signature} type="button" onMouseDown={this.noteOn.bind(this, note.signature)} onMouseUp={this.noteOff.bind(this, note.signature) } onMouseLeave={this.noteOff.bind(this, note.signature)}>{note.signature}</div>
            );
            note = note.minorSecond();
        }

        return (
            <div id="keyboard">
                <div className="container">
                    {nkeys}
                </div>
            </div>
        );
    }
});

export default Keyboard;
