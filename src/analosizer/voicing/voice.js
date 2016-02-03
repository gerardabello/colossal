"use strict";

var Object = global.Object
  , attackTimeSecs = 0.005
  , releaseTimeSecs = 0.5
;

module.exports = function Voice( audioContext ) {
  var oscillator = audioContext.createOscillator()
    , gain = audioContext.createGain()
  ;

  oscillator.connect( gain );

  Object.defineProperty( this, 'waveformType', {
    set: setWaveformType
  });

  this.connect   = connect;
  this.startNote = startNote;
  this.endNote   = endNote;

  function setWaveformType( newValue ) {
    oscillator.type = newValue;
  }

  function connect( toNode ) {
    gain.connect( toNode );
  }

  function startNote( noteNum ) {
    var attackStartAt;

    oscillator.frequency.value = noteNumToFrequency( noteNum );
    gain.gain.value = 0;
    oscillator.start();
    attackStartAt = audioContext.currentTime + 0.001;
    gain.gain.setValueAtTime( 0, attackStartAt );
    gain.gain.linearRampToValueAtTime( 1, attackStartAt + attackTimeSecs );
  };

  function endNote() {
    var releaseStartAt = audioContext.currentTime + 0.001;

    gain.gain.linearRampToValueAtTime( 1, releaseStartAt );
    gain.gain.linearRampToValueAtTime( 0, releaseStartAt + releaseTimeSecs );
    oscillator.stop( releaseStartAt + releaseTimeSecs );
    oscillator.onended = disengage;
  };

  function disengage() {
    gain.disconnect();
    oscillator.disconnect();
  }

  function noteNumToFrequency( noteNum ) {
    var semitoneNumRelToA_440 = noteNum - 69
      , octaveRelToA_440 = semitoneNumRelToA_440 / 12
      ;
    return 440 * Math.pow( 2, octaveRelToA_440 );
  }
}
