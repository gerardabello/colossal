"use strict";

module.exports = Limiter;

function Limiter( audioContext ) {
  var compNode = audioContext.createDynamicsCompressor();

  // Yup. That's a pretty low threshold for a "limiter", but
  // it's the best we can do with a maximum compression ratio
  // of 20:1 (per the Web Audio specification).
  compNode.threshold.value = -6.0;    // dB
  compNode.knee.value      =  0.5;    // dB
  compNode.ratio.value     = 20.0;    // 20:1
  compNode.attack.value    =  0.0035; // Seconds
  compNode.release.value   =  0.08;   // Seconds

  Object.defineProperty( this, 'inputNode', { get: getInputNode } );
  this.connect = connect;

  function getInputNode() {
    return compNode;
  }

  function connect( toNode ) {
    compNode.connect( toNode );
  }
}
