####To start using micto SPA application:
- Add Api key provided by Ziggeo, and any video token into `src/constants.js` file 
- Install npm packages `npm istall`
- Run the server `npm start`


#### Example use-case when try to replace video on fly 

```reacthtml
import React, { Component } from 'react';
import { ZiggeoEmbedPlayer } from 'react-ziggeo';
import { API_KEY, VIDEO_TOKEN_1, VIDEO_TOKEN_2 } from '../constants';

class EmbedPlayerPage extends Component {

    constructor (props) {
        super(props);
        this.state = {
            apiToken: API_KEY,
            video: VIDEO_TOKEN_1
        }
    }
    
   
    handleChangeVideo = () => {
        this.setState({
            video: VIDEO_TOKEN_2
        }, this.handleSetState);
    }
    
    
   
    render() {
        return (
            <section className="player-page">
                <h1 className="page-header">Embed Player Page</h1>
                <ZiggeoEmbedPlayer
                    apiKey={this.state.apiToken}
                    video={this.state.video}
                    height={380}
                    width={520}
                    onPlayerPlaying={this.playing}
                    onPlayerPaused={this.paused}
                    onPlayerEnded={this.playerEnded}
                    onPlayerAttached={this.playerAttached}
                    onPlayerLoaded={this.playerLoaded}
                    onPlayerError={this.playerError}
                    onPlayerSeek={this.playerSeek}
                />

                <hr />
                <button onClick={this.handleChangeVideo} className="btn btn-warning">Change Video</button>
            </section>
        );
    }
    
}
    
    
```
 