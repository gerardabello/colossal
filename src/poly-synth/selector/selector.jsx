import React from 'react';

import './selector.scss';


var Selector = React.createClass({
    getInitialState: function() {
        return {
            value: this.getValueLink(this.props).value,
        };
    },

    getValueLink: function(props) {
        // Create an object that works just like the one
        // returned from `this.linkState` if we weren't passed
        // one; that way, we can always behave as if we're using
        // `valueLink`, even if we're using plain `value` and `onChange`.
        return props.valueLink || {
            value: props.value,
            requestChange: props.onChange,
        };
    },

    handleChange(value) {
        this.setState({
            value: value,
        }, () => {
            this.getValueLink(this.props).requestChange(value);
        });
    },

    onNext(){
        let ci = this.props.values.indexOf(this.state.value);
        let i = ci + 1;

        if(i>= this.props.values.length){
            i=0;
        }

        this.handleChange(this.props.values[i]);
    },
    onPrevious(){
        let ci = this.props.values.indexOf(this.state.value);
        let i = ci - 1;

        if(i<0){
            i=this.props.values.length-1;
        }

        this.handleChange(this.props.values[i]);

    },

    render() {
        return (
            <div className="selector" >
                <div className="left arrow" onClick={this.onPrevious}>
                {'<'}
                </div>

                <div className="text">
                {this.state.value}
                </div>

                <div className="right arrow" onClick={this.onNext}>
                {'>'}
                </div>

            </div>
        );
    }
});

export default Selector;
