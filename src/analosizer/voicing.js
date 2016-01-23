"use strict";

var Voice = require('./voicing/voice.js');

module.exports = Voicing;

function Voicing( audioContext ) {
  this.createVoice = createVoice;

  function createVoice() {
    return new Voice( audioContext );
  }
}
