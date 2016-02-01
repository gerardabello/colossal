"use strict";

var Voicing           = require('./voicing.js')
  , VoicesBeingPlayed = require('./voices-being-played.js')
  , Gain              = require('./gain.js')
;

module.exports = Engine;

function Engine() {
  var AudioContext = global.AudioContext || global.webkitAudioContext
    , audioContext = new AudioContext()
    // Offset of -10.5 dB moslty prevents audible overload clipping with chords.
    , outputGain = new Gain( audioContext, -10.5 )
    , voicing = new Voicing( audioContext )
    , voicesBeingPlayed = new VoicesBeingPlayed()
  ;

  outputGain.connect( audioContext.destination );

  this.noteOn  = noteOn;
  this.noteOff = noteOff;

  Object.defineProperty( this, 'outputGain',       { get: getOutputGain } );
  Object.defineProperty( this, 'voicing',          { get: getVoicing    } );
  Object.defineProperty( this, 'notesBeingPlayed', { get: getNotesBeingPlayed } );

  function noteOn( noteNum, source ) {
    var voice = voicesBeingPlayed.get( noteNum, source );

    if( voice ) { return; }

    voice = voicing.createVoice();
    voice.connect( outputGain.inputNode );
    voice.startNote( noteNum );
    voicesBeingPlayed.set( noteNum, source, voice );
  }

  function noteOff( noteNum, source ) {
    var voice = voicesBeingPlayed.get( noteNum, source );

    if( ! voice ) { return; }

    try {
      voice.endNote();
    } finally {
      voicesBeingPlayed.clear( noteNum, source );
    }
  }

  function getOutputGain() {
    return outputGain.exposedObject;
  }

  function getVoicing() {
    return voicing.exposedObject;
  }

  function getNotesBeingPlayed() {
    return voicesBeingPlayed.counts;
  }
};
