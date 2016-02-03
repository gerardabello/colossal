"use strict";

global.Analosizer = Analosizer;

function Analosizer( opts ) {
  var version = '0.1.8'
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
        , adapt: [ new NotesBeingPlayedAdaptor() ]
        , oncomplete: fireReady
      })
  ;

  function fireReady() {
    var initFocusEl = global.document.getElementById('init-focus');
    initFocusEl.focus();
  }

  function NotesBeingPlayedAdaptor() {
    this.filter = filter;
    this.wrap = wrap;

    function filter( object, keypath ) {
      return (
        typeof object                    === 'object' &&
        typeof object.toNotesBeingPlayed === 'function'
      );
    }

    function wrap( ractive, object, keypath, prefixer ) {
      object.addChangeListener( onChange );

      return {
          get: get
        , teardown: teardown
        , reset: reset
      };

      function onChange() {
        ractive.set( keypath, object );
      }

      function get() {
        return object;
      }

      function teardown() {
        object.removeChangeListener( onChange );
      }

      function reset( data ) {
        // Allow and ignore attempts to reset which
        // will happen when we tell ractive about a
        // change so that bindings will refresh.
      }
    }
  }

  ractive.on( 'noteOnForMouse', function( rEvent, noteNum ) {
    var msEvent = rEvent.original;

    if( 'buttons' in msEvent ) {
      if( ~msEvent.buttons & 1 ) { return; }
    } else {
      if( msEvent.which !== 1 ) { return; }
    }

    engine.noteOn( noteNum, 'mouse' );
  });

  ractive.on( 'noteOffForMouse', function( rEvent, noteNum ) {
    engine.noteOff( noteNum, 'mouse' );
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
      engine.noteOn( noteNum, 'textKey' );
    }
  });

  ractive.on( 'noteOffForTextKey', function( rEvent ) {
    var kbdEvent = rEvent.original
      , noteNum = textKeyNoteMap[ kbdEvent.keyCode ]
    ;

    if( noteNum ) {
      engine.noteOff( noteNum, 'textKey' );
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
