'use strict';

jest.unmock('../keyboard.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Keyboard from '../keyboard.jsx';

describe('Keyboard', () => {

    it('calls the apropiate callback function when a key is clicked', () => {
        // Render a checkbox with label in the document

        let notes = [];
        let noteon = function(note){
            notes.push(note);
        };
        let noteoff = function(note){
            notes.splice(notes.indexOf(note));
        };

        const keyboard = TestUtils.renderIntoDocument(
            <Keyboard noteOn={noteon} noteOff={noteoff}/>
        );

        const keyboardNode = ReactDOM.findDOMNode(keyboard);

        TestUtils.Simulate.keyDown(keyboardNode, {keyCode: 65});
        //TestUtils.Simulate.click(keyboardNode);

        expect(notes.length).toEqual(1);
    });

});
