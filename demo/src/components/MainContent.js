import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import HomePage from '../pages/HomePage';
import PlayerPage from '../pages/player/PlayerPage';
import RecorderPage from '../pages/recorder/RecorderPage';
import PlayerActionsPage from "../pages/player/PlayerActionsPage";
import RecorderActionsPage from "../pages/recorder/RecorderActionsPage";
import PlayerListPage from '../pages/player/PlayerListPage';

class MainContent extends Component {
    render() {
        return (
            <main className="App-intro container">
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/player" component={PlayerPage} />
                    <Route exact path="/recorder" component={RecorderPage} />
                    <Route exact path="/player-actions" component={PlayerActionsPage} />
                    <Route exact path="/recorder-actions" component={RecorderActionsPage} />
                    <Route exact path="/player-list" component={PlayerListPage} />
                </Switch>
            </main>
        );
    }
}

export default MainContent;