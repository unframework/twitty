'use strict';

const React = require('react');

// Rendering a simple centered box
class App extends React.Component {
    render() {
        return React.createElement(
            'box',
            {
                top: "center",
                left: "center",
                width: "50%",
                height: "50%",
                border: { type: 'line' }
            },
            'Hello Reactive World!'
        );
    }
}

module.exports = App;
