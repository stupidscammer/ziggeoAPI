import React, { Component } from 'react';
import { ZiggeoRecorder } from 'react-ziggeo';
import { API_KEY } from '../../constants';

export default class RecorderActionsPage extends Component {

    static recorderInstance = null;
    static recorderProperties = null;

    constructor (props) {
        super(props);
        this.state = {
            apiKey: API_KEY,
            recorder: {
                height: 240,
                width: 320
            }
        }
    }

    componentDidMount () {
        this.recorderInstance = this.child.recorderInstance();
        this.recorderProperties = this.recorderInstance.get();
        console.log('ins :: ', this.recorderInstance, this.recorderProperties);
    }

    setNewDimensions = () => {
        let recorder = Object.assign({}, this.state.recorder);
        recorder.width = 440;
        recorder.height = 330;
        this.setState({ recorder });
    }

    getInstance = () => {
    }

    render() {
        return (
            <section className="recorder-page">
                <h1 className="page-header">Recorder With Actions Page</h1>
                <p className="alert alert-warning">
                    <strong>Note: </strong>
                    It's demonstrative view, recording and uploading set to not allowed, you can register <a href="https://ziggeo.com">Ziggeo</a>. After getting key, use all awesome features
                </p>
                <ZiggeoRecorder
                    apiKey={this.state.apiKey}
                    onRef={ref => (this.child = ref)}
                    height={this.state.recorder.height}
                    width={this.state.recorder.width}
                />

                <div className="buttons">
                    <button className="btn btn-xs btn-success" onClick={this.setNewDimensions}>Set Dimensions to 440x330</button>
                </div>
                <div className="detalis">
                    { (this.state.recorder.height && this.state.recorder.width) &&
                        <div>
                            <span>Height: {this.state.recorder.height}</span>
                            <span>Width: {this.state.recorder.width}</span>
                        </div>
                    }
                </div>
            </section>
        );
    }
}
