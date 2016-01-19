"use strict";

var Engine = require('./analosizer/engine.js')
  , engine = new Engine()
  , textKeyNoteMap = []
;

textKeyNoteMap[65] = 60; // [A] => C-4 (Middle C)
textKeyNoteMap[87] = 61; // [W] => C♯-4
textKeyNoteMap[83] = 62; // [S] => D-4
textKeyNoteMap[69] = 63; // [E] => D♯-4
textKeyNoteMap[68] = 64; // [D] => E-4
textKeyNoteMap[70] = 65; // [F] => F-4
textKeyNoteMap[84] = 66; // [T] => F♯-4
textKeyNoteMap[71] = 67; // [G] => G-4
textKeyNoteMap[89] = 68; // [Y] => G♯-4
textKeyNoteMap[72] = 69; // [H] => A-4 (440 Hz)
textKeyNoteMap[85] = 70; // [U] => A♯-4
textKeyNoteMap[74] = 71; // [J] => B-4
textKeyNoteMap[75] = 72; // [K] => C-5

var Ractive = require('ractive')
  , data = {
        engine: engine
    }
  , ractive = new Ractive({
        el: '#app-container'
      , template: '#app-template'
      , data: data
      , oncomplete: fireReady
    })
;

function fireReady() {
  var initFocusEl = global.document.getElementById('init-focus');
  initFocusEl.focus();
}

ractive.on( 'noteOn', function( rEvent, noteNum ) {
  engine.noteOn( noteNum );
});

ractive.on( 'noteOff', function( rEvent, noteNum ) {
  engine.noteOff( noteNum );
});

ractive.on( 'noteOnForTextKey', function( rEvent ) {
  var kbdEvent = rEvent.original
    , noteNum = textKeyNoteMap[ kbdEvent.keyCode ]
  ;
  if( noteNum ) {
    engine.noteOn( noteNum );
  }
});

ractive.on( 'noteOffForTextKey', function( rEvent ) {
  var kbdEvent = rEvent.original
    , noteNum = textKeyNoteMap[ kbdEvent.keyCode ]
  ;
  if( noteNum ) {
    engine.noteOff( noteNum );
  }
});
