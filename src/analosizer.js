"use strict";

var Models = require('./analosizer/models.js')
  , engine = new Models.Engine()
;

var Ractive = require('ractive')
  , data = {
        engine: engine
    }
  , ractive = new Ractive({
        el: '#app-container'
      , template: '#app-template'
      , data: data
    })
  ;

ractive.on( 'noteOn', function( rEvent, noteIndex ) {
  global.console.log( 'Note on: ' + noteIndex );
});

ractive.on( 'noteOff', function( rEvent, noteIndex ) {
  global.console.log( 'Note off: ' + noteIndex );
});
