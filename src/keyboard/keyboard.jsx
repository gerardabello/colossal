'use strict';

import React from 'react';

var Note = require('octavian').Note;

import './keyboard.scss';

let styles = {
    root:{
        background: "rgb(228, 189, 180)",
    }
}

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
            <div id="keyboard" style={ styles.root }>
                {nkeys}
            </div>
        )
    }
});

export default Keyboard;
