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
        }
    },
    noteOn(signature){
        let index = this.state.pressedKeys.indexOf(signature);
        if (index == -1) {
            this.props.noteOn(signature);
            this.state.pressedKeys.push(signature);
        }
    },
    //RENDER
    render: function() {
        let octaves = 4;
        var note = new Note('C2');

        let nkeys = [];
        for (var i=0; i < octaves*12; i++) {
            if(note.modifier == null){
                nkeys.push(
                    <div className="key white" key={note.signature} type="button" onMouseDown={this.noteOn.bind(this, note.signature)} onMouseUp={this.noteOff.bind(this, note.signature) } onMouseLeave={this.noteOff.bind(this, note.signature)}>{note.signature}</div>
                );
            }else{
                nkeys.push(
                    <div className="key black" key={note.signature} type="button" onMouseDown={this.noteOn.bind(this, note.signature)} onMouseUp={this.noteOff.bind(this, note.signature) } onMouseLeave={this.noteOff.bind(this, note.signature)}>{note.signature}</div>
                );
            }
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
