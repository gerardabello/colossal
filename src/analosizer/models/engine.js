"use strict";

module.exports = function Engine() {
  var engaged = false
    , AudioContext = global.AudioContext || global.webkitAudioContext
    , contextNode
    , oscillatorNode
  ;

  Object.defineProperty( this, 'engaged', {
      get: function() {
        return engaged;
      }
    , set: function( v ) {
        if( v ) { engage(); } else { disengage(); }
      }
  });

  function engage() {
    if( engaged ) { return; }
    contextNode = new AudioContext();
    oscillatorNode = contextNode.createOscillator();
    oscillatorNode.frequency.value = 440;
    oscillatorNode.connect( contextNode.destination );
    oscillatorNode.start();
    engaged = true;
  }

  function disengage() {
    if( ! engaged ) { return; }
    oscillatorNode.stop();
    contextNode.close();
    engaged = false;
  }
};
