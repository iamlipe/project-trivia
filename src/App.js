/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

import sneaky from './assets/midia/sneaky.mp3';

function App() {
  return (
    <HashRouter basename="/">
      <Switch>
        <Route path="/game" component={ Game } />
        <Route path="/settings" component={ Settings } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
        <Route exact path="/" component={ Login } />
      </Switch>
      <audio loop="loop" autoPlay>
        <source src={ sneaky } type="audio/mp3" />
      </audio>
    </HashRouter>
  );
}

export default App;
