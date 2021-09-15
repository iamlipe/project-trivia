import React from 'react';
import { Link } from 'react-router-dom';
import { ListPlayerRanking, Nav } from '../components';

import world from '../assets/image/world_2.png';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.handlePlayAgain = this.handlePlayAgain.bind(this);
  }

  handlePlayAgain() {
    return (
      <Link className="play-again" to="/">
        <button type="button" data-testid="btn-go-home">
          Jogar
          <br />
          {' '}
          Novamente
        </button>
      </Link>
    );
  }

  render() {
    const state = localStorage.getItem('state');
    return (
      <div className="container-ranking">
        <h1 className="title-ranking" data-testid="ranking-title">RANKING</h1>
        <div className="content-list">
          {JSON.parse(state).ranking
            .sort((a, b) => b.score - a.score)
            .map((item, index) => (<ListPlayerRanking
              key={ index }
              data={ item }
              podium={ index }
            />))}
        </div>
        { this.handlePlayAgain() }
        <img className="world" src={ world } alt="world" />
        <Nav />
      </div>
    );
  }
}

export default Ranking;
