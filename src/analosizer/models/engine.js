"use strict";

var AudioContextPool = require('./engine/audio-context-pool.js')
  , Voice            = require('./engine/voice.js')
;

module.exports = function Engine() {
  var engaged = false
    , audioContextPool = new AudioContextPool()
    , voice
  ;

  this.noteOn  = noteOn;
  this.noteOff = noteOff;

  function noteOn( noteNum ) {
    var audioContext = audioContextPool.get();

    if( voice ) {
      voice.end_note();
    }
    voice = new Voice( audioContext, audioContext.destination );
    voice.startNote( noteNum );
  }

  function noteOff( noteNum ) {
    if( ! voice ) { return; }
    try {
      voice.endNote();
    } finally {
      voice = null;
    }
  }

};
