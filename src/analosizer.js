"use strict";

global.Analosizer = Analosizer;

function Analosizer( opts ) {
  var version = '0.1.2'
    , Engine = require('./analosizer/engine.js')
    , engine = new Engine()
    , textKeyNoteMap = []
    , lastNoteKeyActivityAt = 0
    , noteTextKeysEngaged = []
  ;

  textKeyNoteMap[  65 ] = 60; // [A] => C-4 (Middle C)
  textKeyNoteMap[  87 ] = 61; // [W] => C♯-4
  textKeyNoteMap[  83 ] = 62; // [S] => D-4
  textKeyNoteMap[  69 ] = 63; // [E] => D♯-4
  textKeyNoteMap[  68 ] = 64; // [D] => E-4
  textKeyNoteMap[  70 ] = 65; // [F] => F-4
  textKeyNoteMap[  84 ] = 66; // [T] => F♯-4
  textKeyNoteMap[  71 ] = 67; // [G] => G-4
  textKeyNoteMap[  89 ] = 68; // [Y] => G♯-4
  textKeyNoteMap[  72 ] = 69; // [H] => A-4 (440 Hz)
  textKeyNoteMap[  85 ] = 70; // [U] => A♯-4
  textKeyNoteMap[  74 ] = 71; // [J] => B-4
  textKeyNoteMap[  75 ] = 72; // [K] => C-5
  textKeyNoteMap[  79 ] = 73; // [O] => C♯-5
  textKeyNoteMap[  76 ] = 74; // [L] => D-5
  textKeyNoteMap[  80 ] = 75; // [P] => D♯-5
  textKeyNoteMap[  59 ] = 76; // [;] => E-5   Firefox
  textKeyNoteMap[ 186 ] = 76; // [;] => E-5  Webkit

  var Ractive = require('ractive')
    , data = {
          version: version
        , engine: engine
      }
    , ractive = new Ractive({
          el: opts.ui.containerSelector
        , template: opts.ui.templateSelector
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

    if( ! noteNum ) {
      return;
    }

    // Ignore keypress if any modifier keys are down.
    if (
      kbdEvent.shiftKey ||
      kbdEvent.ctrlKey  ||
      kbdEvent.altKey   ||
      kbdEvent.metaKey
    ) {
      return;
    }

    kbdEvent.stopPropagation();

    lastNoteKeyActivityAt = (new Date()).getTime();
    noteTextKeysEngaged[ kbdEvent.keyCode ] = true;
    setTimeout( unstickNoteTextKeys, 1505 );

    if( ! kbdEvent.repeat ) {
      engine.noteOn( noteNum );
    }
  });

  ractive.on( 'noteOffForTextKey', function( rEvent ) {
    var kbdEvent = rEvent.original
      , noteNum = textKeyNoteMap[ kbdEvent.keyCode ]
    ;

    if( noteNum ) {
      engine.noteOff( noteNum );
      lastNoteKeyActivityAt = (new Date()).getTime();
      noteTextKeysEngaged[ kbdEvent.keyCode ] = false;
    }
  });

  function unstickNoteTextKeys() {
    var i
      , noteNum
    ;

    if( (new Date()).getTime() - lastNoteKeyActivityAt > 1500 ) {
      for( i = noteTextKeysEngaged.length; i--; ) {
        noteNum = textKeyNoteMap[ i ];
        if( noteNum ) {
          engine.noteOff( noteNum );
          noteTextKeysEngaged[ i ] = false;
        }
      }
    }
  }
}
