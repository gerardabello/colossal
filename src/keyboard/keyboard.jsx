'use strict';

import React from 'react';

var Note = require('octavian').Note;

import './keyboard.scss';


let keynotemap = {
    65 : "C2", //A
    83 : "D2", //S
    68 : "E2", //D
    70 : "F2", //F
    71 : "G2", //G
    72 : "A2", //H
    74 : "B2", //J
}


var Keyboard = React.createClass({
    getInitialState: function() {
        return {};
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
        this.props.noteOff(signature);
    },
    noteOn(signature){
        this.props.noteOn(signature);
    },
    //RENDER
    render: function() {
        let octaves = 4;
        var note = new Note('C1');

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
        )
    }
});

export default Keyboard;
