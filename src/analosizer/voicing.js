"use strict";

var Voice = require('./voicing/voice.js')
  , Object = global.Object
;

module.exports = Voicing;

function Voicing( audioContext ) {
  var waveformType = 'sine'
    , exposedObject = {}
  ;

  Object.defineProperty( exposedObject, 'waveformType', {
      get: getWaveformType
    , set: setWaveformType
  });

  this.createVoice = createVoice;

  this.exposedObject = exposedObject;

  function getWaveformType() {
    return waveformType;
  }

  function setWaveformType( newValue ) {
    if(
      newValue !== 'sine' &&
      newValue !== 'square' &&
      newValue !== 'sawtooth' &&
      newValue !== 'triangle'
    ) {
      throw 'Waveform type must be "sine", "square", "sawtooth", or "triangle"';
    }

    waveformType = newValue;
  }

  function createVoice() {
    var voice = new Voice( audioContext );
    voice.waveformType = waveformType;
    return voice;
  }
}
