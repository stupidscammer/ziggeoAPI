import React, { Component } from 'react';
import { ZiggeoPlayer } from 'react-ziggeo';
import WarningMessage from '../../components/WarningMessage';
import { API_KEY_2, VIDEO_TOKEN_2 } from '../../constants';

export default class PlayerPage extends Component {

    playing = () => {
        console.log('it\'s playing, your action here');
    };

    paused = () => {
        console.log('it\'s paused, your action when pause');
    };

    playerEnded = () => {
        console.log('Player ended');
    };

    playerAttached = () => {
        console.log('Player attached');
    };

    playerLoaded = () => {
        console.log('Player loaded');
    };

    playerError = () => {
        console.log('Player error');
    };

    playerSeek = () => {
        console.log('Player seeking');
    };

    render() {
        return (
            <section className="player-page">
                <h1 className="page-header">Player Page</h1>
                {!API_KEY_2 && <WarningMessage message={"API Key required"} />}
                {!VIDEO_TOKEN_2 && <WarningMessage message={"Video Token required"} />}

                <ZiggeoPlayer
                    apiKey={API_KEY_2}
                    video={VIDEO_TOKEN_2}
                    height={240}
                    width={380}
                    onPlaying={this.playing}
                    onPaused={this.paused}
                    onEnded={this.playerEnded}
                    onAttached={this.playerAttached}
                    onLoaded={this.playerLoaded}
                    onError={this.playerError}
                    onSeek={this.playerSeek}

                />
                <div className="text-left">
                    <h5 className="text-center"> ES6 Code Sample </h5>
                    <h6>Open console to see events attached to this Component</h6>
                    <pre>
                        {"import React from 'react';"} <br/>
                        {"import {ZiggeoPlayer} from 'react-ziggeo';"}<br/>
                        {"import { API_KEY, VIDEO_TOKEN } from '../constants';"}
                        <br/>
                        <br/>
                        ...
                        <br/>
                        <br/>
                        {"playerLoaded = () => { console.log('Player loaded'); };"}
                        <br/>
                        {"playing = () => { console.log(\"it's playing, your action here\"); };"}
                        <br/>
                        <br/>
                        ...
                        <br/>
                        <br/>
                        {"<ZiggeoPlayer \n\t apiKey=\"Ziggeo provided key\" \n\t ziggeo-video=\"your video token\"" +
                        "\n\t onLoaded={this.playerLoaded} \n\t onPlaying={this.playing}" +
                        "\n/>"}
                        <br/>
                        ...
                    </pre>
                </div>
            </section>
        );
    }
}
