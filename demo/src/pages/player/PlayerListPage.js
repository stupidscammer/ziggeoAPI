import React, { Component } from 'react';
import { ZiggeoPlayer } from 'react-ziggeo';
import WarningMessage from '../../components/WarningMessage';
import { API_KEY_2, videos } from '../../constants';

export default class PlayerPage extends Component {


    render() {
        return (
            <section className="player-page">
                <h1 className="page-header">Players List Page</h1>
                {!API_KEY_2 && <WarningMessage message={"API Key required"} />}
                <ul>
                    {
                        videos.length > 0 && videos.map(({video}, index) =>
                            <li key={index}>
                                <p>Video: {video}, Index: {index}</p>
                                <ZiggeoPlayer apiKey={API_KEY_2}
                                    video={video} height={240} width={380} />
                            </li>
                        )
                    }
                </ul>
            </section>
        );
    }
}
