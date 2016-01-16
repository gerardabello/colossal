"use strict";

module.exports = function Engine() {
  var engaged = false
    , AudioContext = global.AudioContext || global.webkitAudioContext
    , contextNode
    , oscillatorNode
    , oscillatorOn = false
  ;

  Object.defineProperty( this, 'engaged', {
      get: function() {
        return engaged;
      }
    , set: function( v ) {
        if( v ) { engage(); } else { disengage(); }
      }
  });

  this.noteOn  = noteOn;
  this.noteOff = noteOff;

  function engage() {
    if( engaged ) { return; }
    contextNode = new AudioContext();
    oscillatorNode = contextNode.createOscillator();
    oscillatorNode.frequency.value = 440;
    oscillatorNode.connect( contextNode.destination );
    engaged = true;
  }

  function disengage() {
    if( ! engaged ) { return; }
    oscillatorNode.stop();
    contextNode.close();
    engaged = false;
  }

  function noteOn( noteNum ) {
    if( ! engaged ) { return; }
    if( oscillatorNode && oscillatorOn ) {
      oscillatorNode.stop();
    }
    oscillatorNode = contextNode.createOscillator();
    oscillatorNode.connect( contextNode.destination );
    oscillatorNode.frequency.value = noteNumToFrequency( noteNum );
    oscillatorNode.start();
    oscillatorOn = true;
  }

  function noteOff( noteNum ) {
    var endingOscillatorNode;

    if( ! engaged ) { return; }
    if( oscillatorOn ) {
      endingOscillatorNode = oscillatorNode;
      endingOscillatorNode.onended = function() {
        endingOscillatorNode.disconnect();
      };
      oscillatorNode.stop();
      oscillatorOn = false;
      oscillatorNode = null;
    }
  }

  function noteNumToFrequency( noteNum ) {
    var semitoneNumRelToA_440 = noteNum - 69
      , octaveRelToA_440 = semitoneNumRelToA_440 / 12
      ;
    return 440 * Math.pow( 2, octaveRelToA_440 );
  }
};
