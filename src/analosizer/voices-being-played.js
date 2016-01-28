"use strict";

module.exports = VoicesBeingPlayed;

function VoicesBeingPlayed() {
  var voicesByNoteAndSource = {}
    , counts =
      {
          get: getCount
        , toNotesBeingPlayed: getCounts
        , addChangeListener: addCountsChangeListener
        , removeChangeListener: removeCountsChangeListener
      }
    , countsChangeListeners = []
  ;

  this.set = set;
  this.get = get;
  this.clear = clear;
  this.counts = counts;

  function set( noteNum, sourceName, voice ) {
    var key = keyFromNoteAndSource( noteNum, sourceName )
      , previousValue = voicesByNoteAndSource[ key ]
    ;

    voicesByNoteAndSource[ key ] = voice;
    fireChange();
    return previousValue;
  }

  function get( noteNum, sourceName ) {
    var key = keyFromNoteAndSource( noteNum, sourceName );
    return voicesByNoteAndSource[ key ];
  }

  function clear( noteNum, sourceName ) {
    var key = keyFromNoteAndSource( noteNum, sourceName )
      , previousValue = voicesByNoteAndSource[ key ]
    ;

    delete voicesByNoteAndSource[ key ];
    fireChange();
    return previousValue;
  }

  function keyFromNoteAndSource( noteNum, sourceName ) {
    return '' + noteNum + '|' + sourceName;
  }

  function fireChange() {
    var i
      , listenerFn
    ;

    for( i = 0; i < countsChangeListeners.length; i++ ) {
      listenerFn = countsChangeListeners[ i ];
      listenerFn( counts );
    }
  }

  function getCounts() {
    return counts;
  }

  function getCount( noteNum ) {
    var noteAndSource
      , noteNum = '' + noteNum
      , result = 0
      , voiceNoteNum
    ;

    for( noteAndSource in voicesByNoteAndSource ) {
      if( ! voicesByNoteAndSource.hasOwnProperty( noteAndSource ) ) { continue; }
      voiceNoteNum = noteAndSource.split('|')[0];
      if( voiceNoteNum === noteNum ) { result++; }
    }
    return result;
  }

  function addCountsChangeListener( newListener ) {
    if( countsChangeListeners.indexOf( newListener) > -1 ) { return; }
    countsChangeListeners.push( newListener );
  }

  function removeCountsChangeListener( listener ) {
    var position = countsChangeListeners.indexOf( listener );
    if( position < 0 ) { return; }
    countsChangeListeners.splice( position, 1 );
  }
}
