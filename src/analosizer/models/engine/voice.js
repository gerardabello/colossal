"use strict";

var attackTimeSecs = 0.005
  , releaseTimeSecs = 0.5
;

module.exports = function Voice( audioContext, destination ) {
  var oscillator = audioContext.createOscillator()
    , gain = audioContext.createGain()
  ;

  this.startNote = startNote;
  this.endNote   = endNote;

  function startNote( noteNum ) {
    var attackStartAt;

    oscillator.frequency.value = noteNumToFrequency( noteNum );
    oscillator.connect( gain );
    gain.connect( destination );
    gain.gain.value = 0;
    oscillator.start()
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
