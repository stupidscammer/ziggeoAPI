import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div className="app-footer text-center">
                <ul className="unstyled-list">
                    <li>
                        <a href="https://github.com/Ziggeo/react-ziggeo">This demo app github</a>
                    </li>
                    <li>
                        <a href="https://ziggeo.com/docs/sdks/javascript/browser-integration/parameters#javascript-revision=v1-stable&javascript-version=v2">
                            Ziggeo Available Parameters
                        </a>
                    </li>
                    <li>
                        <a href="https://ziggeo.com/docs/sdks/javascript/browser-interaction/events">
                            Ziggeo Available Embedding Events
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Footer;