'use strict';

import React from 'react';

var Note = require('octavian').Note;

import './keyboard.scss';


var Keyboard = React.createClass({
    getInitialState: function() {
        return {};
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
