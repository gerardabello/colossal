"use strict";

var Voicing = require('./voicing.js')
  , Gain    = require('./gain.js')
;

module.exports = Engine;

function Engine() {
  var AudioContext = global.AudioContext || global.webkitAudioContext
    , audioContext = new AudioContext()
    , outputGain = new Gain( audioContext )
    , voicing = new Voicing( audioContext )
    , voicesBeingPlayed = {}
  ;

  outputGain.connect( audioContext.destination );

  this.noteOn  = noteOn;
  this.noteOff = noteOff;

  Object.defineProperty( this, 'outputGain', { get: getOutputGain } );
  Object.defineProperty( this, 'voicing',    { get: getVoicing    } );

  function noteOn( noteNum, source ) {
    var voiceKey = [ noteNum, source ]
      , voice = voicesBeingPlayed[ voiceKey ]
    ;

    if( voice ) { return; }

    voice = voicesBeingPlayed[ voiceKey ] = voicing.createVoice();
    voice.connect( outputGain.inputNode );
    voice.startNote( noteNum );
  }

  function noteOff( noteNum, source ) {
    var voiceKey = [ noteNum, source ]
      , voice = voicesBeingPlayed[ voiceKey ]
    ;

    if( ! voice ) { return; }

    try {
      voice.endNote();
    } finally {
      voicesBeingPlayed[ voiceKey ] = null;
    }
  }

  function getOutputGain() {
    return outputGain.exposedObject;
  }

  function getVoicing() {
    return voicing.exposedObject;
  }
};
