"use strict";

var AudioContextPool = require('./engine/audio-context-pool.js')
  , Voice            = require('./engine/voice.js')
;

module.exports = function Engine() {
  var engaged = false
    , audioContextPool = new AudioContextPool()
    , voice
    , onStateNoteVoices = []
  ;

  this.noteOn  = noteOn;
  this.noteOff = noteOff;

  function noteOn( noteNum ) {
    var audioContext = audioContextPool.get()
      , voice = onStateNoteVoices[ noteNum ]
    ;

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
