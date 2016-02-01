"use strict";

module.exports = Gain;

var Math = global.Math
  , Object = global.Object
;

function Gain( audioContext, dB_RelationToFullScale ) {
  var gainNode = audioContext.createGain()
    , level_dB = 0.0
    , exposedObject = {}
  ;

  dB_RelationToFullScale = dB_RelationToFullScale || 0.0;

  setLevel_dB( level_dB );

  Object.defineProperty( exposedObject, 'level_dB', {
      get: getLevel_dB
    , set: setLevel_dB
  });

  Object.defineProperty( this, 'inputNode', { get: getInputNode } );
  this.connect = connect;

  this.exposedObject = exposedObject;

  function getInputNode() {
    return gainNode;
  }

  function connect( toNode ) {
    gainNode.connect( toNode );
  }

  function setLevel_dB( newValue ) {
    gainNode.gain.value = amplitudeFrom_dBs( newValue + dB_RelationToFullScale );
    level_dB = newValue;
  }

  function getLevel_dB() {
    return  level_dB;
  }

  function amplitudeFrom_dBs( dBs ) {
    return Math.pow( 10, dBs / 20 );
  }
}
