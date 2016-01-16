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

ractive.on( 'noteOn', function( rEvent, noteNum ) {
  engine.noteOn( noteNum );
});

ractive.on( 'noteOff', function( rEvent, noteNum ) {
  engine.noteOff( noteNum );
});
