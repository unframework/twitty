'use strict';

const React = require('react');
const blessed = require('blessed');

// Rendering a simple centered box
class App extends React.Component {
    constructor(props) {
        super();

        this.state = {
            on: false
        };
    }
    componentDidMount() {
        this._blinkerId = setInterval(() => {
            this.setState((state) => ({ on: !state.on }));
        }, 400);
    }

    render() {
        return <box
            top="center"
            left="center"
            width="50%"
            height="50%"
            border={{ type: 'line' }}
        >
            {blessed.parseTags(
                this.state.on
                    ? 'Hello {bold}Reactive{/bold} World!'
                    : 'Hello Reactive World!'
            )}
        </box>;
    }
}

module.exports = App;
