"use strict";

var Voice = require('./engine/voice.js');

module.exports = function Engine() {
  var AudioContext = global.AudioContext || global.webkitAudioContext
    , audioContext = new AudioContext()
    , voice
    , onStateNoteVoices = []
  ;

  this.noteOn  = noteOn;
  this.noteOff = noteOff;

  function noteOn( noteNum ) {
    var voice = onStateNoteVoices[ noteNum ];

    if( voice ) { return; }

    voice = onStateNoteVoices[ noteNum ]
          = new Voice( audioContext, audioContext.destination )
    ;
    voice.startNote( noteNum );
  }

  function noteOff( noteNum ) {
    var voice = onStateNoteVoices[ noteNum ];

    if( ! voice ) { return; }

    try {
      voice.endNote();
    } finally {
      onStateNoteVoices[ noteNum ] = null;
    }
  }

};
