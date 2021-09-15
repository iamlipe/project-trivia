import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Nav } from '../components';

import brain from '../assets/image/brain_2.png';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.handleFeedback = this.handleFeedback.bind(this);
    this.handleRanking = this.handleRanking.bind(this);
    this.handlePlayAgain = this.handlePlayAgain.bind(this);
    this.handleButtRanking = this.handleButtRanking.bind(this);
  }

  handleFeedback() {
    const state = localStorage.getItem('state');
    const THREE = 3;
    if (JSON.parse(state).player.assertions < THREE) {
      return (
        <p
          className="feedback-mensage"
          data-testid="feedback-text"
        >
          Podia ser melhor...
        </p>
      );
    }
    if (JSON.parse(state).player.assertions >= THREE) {
      return (
        <p
          className="feedback-mensage"
          data-testid="feedback-text"
        >
          Mandou bem!
        </p>
      );
    }
  }

  handleRanking() {
    const state = localStorage.getItem('state');
    return (
      <>
        <p
          className="assertions"
          data-testid="feedback-total-question"
        >
          { `Acertou ${JSON.parse(state).player.assertions} perguntas`}

        </p>
        <p
          className="score"
          data-testid="feedback-total-score"
        >
          {`Você conseguiu ${JSON.parse(state).player.score} pontos`}

        </p>
      </>
    );
  }

  handlePlayAgain() {
    return (
      <Link to="/">
        <button
          type="button"
          data-testid="btn-play-again"
        >
          jogar
          <br />
          novamente
        </button>
      </Link>
    );
  }

  handleButtRanking() {
    return (
      <Link to="/ranking">
        <button
          type="button"
          data-testid="btn-ranking"
        >
          Ranking
        </button>
      </Link>
    );
  }

  render() {
    return (
      <>
        <Header waveHeader={ false } color="black" />
        <div className="container-feedback">
          { this.handleFeedback() }
          { this.handleRanking() }
          <img className="brain-2" src={ brain } alt="brain" />
          <div className="button-box">
            { this.handlePlayAgain() }
            { this.handleButtRanking() }
          </div>
        </div>
        <Nav />
      </>
    );
  }
}

export default Feedback;
