"use strict";

var Voicing   = require('./voicing.js')
  , GainModel = require('./gain-model.js')
;

module.exports = Engine;

function Engine() {
  var AudioContext = global.AudioContext || global.webkitAudioContext
    , audioContext = new AudioContext()
    , outputGainModel = new GainModel( audioContext )
    , voicing = new Voicing( audioContext )
    , onStateNoteVoices = []
  ;

  outputGainModel.connect( audioContext.destination );

  this.noteOn  = noteOn;
  this.noteOff = noteOff;

  Object.defineProperty( this, 'outputGain', { get: getOutputGainModel } );

  function noteOn( noteNum ) {
    var voice = onStateNoteVoices[ noteNum ];

    if( voice ) { return; }

    voice = onStateNoteVoices[ noteNum ] = voicing.createVoice();
    voice.connect( outputGainModel.inputNode );
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

  function getOutputGainModel() {
    return outputGainModel.exposedModel;
  }
};
