"use strict";

var AudioContext = global.AudioContext || global.webkitAudioContext;

module.exports = function AudioContextPool() {
  var context;

  global.console.log('AudioContextPool');

  this.get = function get() {
    if( ! context ) {
      context = new AudioContext();
    }
    return context;
  }

  this.disengage = function disengage() {
    try {
      if( context ) { context.close(); }
    } finally {
      context = null;
    }
  }
};
