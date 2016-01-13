"use strict";

var Ractive = require('ractive')
  , data = {
        engaged: false
    }
  , ractive = new Ractive({
        el: '#app-container'
      , template: '#app-template'
      , data: data
    })
  ;
