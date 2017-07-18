'use strict';

const React = require('react');
const blessed = require('blessed');
const FeedParser = require('feedparser');
const request = require('request');

function getRSS(url) {
    return new Promise((resolve, reject) => {
        const feedparser = new FeedParser({});
        const result = [];

        feedparser.on('end', () => {
            resolve(result);
        });

        feedparser.on('readable', function () {
            var item;

            while (item = feedparser.read()) {
                result.push(item);
            }
        });

        const req = request(url);

        req.on('response', function (res) {
            if (res.statusCode !== 200) {
                reject(new Error('error fetching data'));
            } else {
                req.pipe(feedparser);
            }
        });
    });
}

class App extends React.Component {
    constructor(props) {
        super();

        this.state = {
            headlines: null,
            fetchRequest: getRSS('http://www.ctvnews.ca/rss/ctvnews-ca-sci-tech-public-rss-1.822295')
        };
    }

    componentDidMount() {
        this.state.fetchRequest.then((rssEntries) => {
            this.setState({
                headlines: rssEntries.map(entry => entry.title),
                fetchRequest: null
            });
        });
    }

    render() {
        return <box
            top="0"
            left="0"
            right="0"
            bottom="0"
        >
            <box
                top="0"
                left="0"
                width="50%"
                height="50%"
                border={{ type: 'line' }}
            >
                {this.state.fetchRequest
                    ? 'Loading...'
                    : this.state.headlines.join("\n")
                }
            </box>
        </box>;
    }
}

module.exports = App;
