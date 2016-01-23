"use strict";

module.exports = GainModel;

var Math = global.Math;

function GainModel( audioContext ) {
  var gainNode = audioContext.createGain()
    , level_dB = 0
    , exposedModel = {}
  ;

  Object.defineProperty( exposedModel, 'level_dB', {
      get: getLevel_dB
    , set: setLevel_dB
  });

  Object.defineProperty( this, 'inputNode', { get: getInputNode } );
  this.connect = connect;

  this.exposedModel = exposedModel;

  function getInputNode() {
    return gainNode;
  }

  function connect( toNode ) {
    gainNode.connect( toNode );
  }

  function setLevel_dB( newValue ) {
    gainNode.gain.value = amplitudeFrom_dBs( newValue );
    level_dB = newValue;
  }

  function getLevel_dB() {
    return  level_dB;
  }

  function amplitudeFrom_dBs( dBs ) {
    return Math.pow( 10, dBs / 20 );
  }
}
