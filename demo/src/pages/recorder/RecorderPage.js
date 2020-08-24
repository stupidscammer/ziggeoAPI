import React, { Component } from 'react';
import { ZiggeoRecorder } from 'react-ziggeo';
import { API_KEY, VIDEO_TOKEN } from '../../constants';

export default class RecorderPage extends Component {

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

    playerSeek = () => {
        console.log('Player seeking');
    };

    recorderError = () => {
        console.log('Recorder error');
    };

    recorderManuallySubmitted = () => {
        console.log('Recorder onRecorderManuallySubmitted');
    };

    recorderRecording = () => {
        console.log('Recorder onRecorderRecording');
    };

    recorderUploaded = () => {
        console.log('Recorder onRecorderUploaded');
    };

    recorderUploadSelected = () => {
        console.log('Recorder onRecorderUploadSelected');
    };

    recorderUploading = () => {
        console.log('Recorder onRecorderUploading');
    };

    recorderRerecord = () => {
        console.log('Recorder onRecorderRerecord');
    };

    recorderCountdown = () => {
        console.log('Recorder onRecorderCountdown');
    };

    recorderRecordingProgress = () => {
        console.log('Recorder onRecorderRecordingProgress');
    };

    recorderUploadProgress = () => {
        console.log('Recorder onRecorderUploadProgress');
    };

    recorderAccessForbidden = () => {
        console.log('Recorder recorderAccessForbidden');
    };

    recorderAccessGranted = () => {
        console.log('Recorder onRecorderAccessGranted');
    };

    recorderCameraUnresponsive = () => {
        console.log('Recorder onRecorderCameraUnresponsive');
    };

    recorderVerified = () => {
        console.log('Recorder onRecorderVerified');
    };

    recorderNoCamera = () => {
        console.log('Recorder onRecorderNoCamera');
    };

    recorderNoMicrophone = () => {
        console.log('Recorder onRecorderNoMicrophone');
    };

    render() {
        return (
            <section className="recorder-page">
                <h1 className="page-header">Recorder Page</h1>
                <p className="alert alert-warning">
                    <strong>Note: </strong>
                    It's demonstrative view, recording and uploading set to not allowed, you can register <a href="https://ziggeo.com">Ziggeo</a>. After getting key, use all awesome features
                </p>
                <ZiggeoRecorder
                    apiKey={API_KEY}
                    video={VIDEO_TOKEN}
                    height={180}
                    width={320}
                    onPlaying={this.playing}
                    onPaused={this.paused}
                    onEnded={this.playerEnded}
                    onAttached={this.playerAttached}
                    onLoaded={this.playerLoaded}
                    onSeek={this.playerSeek}
                    onError={this.recorderError}
                    onManuallySubmitted={this.recorderManuallySubmitted}
                    onUploaded={this.recorderUploaded}
                    onUploadSelected={this.recorderUploadSelected}
                    onRecording={this.recorderRecording}
                    onUploading={this.recorderUploading}
                    onRerecord={this.recorderRerecord}
                    onCountdown={this.recorderCountdown}
                    onRecordingProgress={this.recorderRecordingProgress}
                    onUploadProgress={this.recorderUploadProgress}
                    onAccessForbidden={this.recorderAccessForbidden}
                    onAccessGranted={this.recorderAccessGranted}
                    onCameraUnresponsive={this.recorderCameraUnresponsive}
                    onVerified={this.recorderVerified}
                    onNoCamera={this.recorderNoCamera}
                    onNoMicrophone={this.recorderNoMicrophone}
                />

                <div className="text-left">
                    <h5 className="text-center"> ES6 Code Sample </h5>
                    <h6>Open console to see events attached to this Component</h6>
                    <pre>
                        {"import React from 'react';"} <br/>
                        {"import {ZiggeoRecorder} from 'react-ziggeo';"}<br/>
                        {"import { API_KEY } from '../constants';"}
                        <br/>
                        <br/>
                        ...
                        <br/>
                        <br/>
                        {"reError = () => { console.log('Recorder error'); };"}
                        <br/>
                        {"recorderRecording = () => { console.log('Recorder onRecorderUploading'); };"}
                        <br/>
                        <br/>
                        ...
                        <br/>
                        <br/>
                        {'<ZiggeoRecorder \n\t apiKey="Ziggeo provided key" \n\t ziggeo-video="your video token"' +
                        '\n\t allowupload={false} \n\t allowrecord={false}' +
                        "\n\t onRecorderError={this.recorderError} \n\t onRecorderRecording={this.recorderRecording}" +
                        '\n/>'}
                        <br/>
                        ...
                    </pre>
                </div>
            </section>
        );
    }
}
