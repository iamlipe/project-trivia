import React from 'react';
import { Header } from '../components';

class Ranking extends React.Component {
  constructor(props) {
    super(props);

    this.handleFeedback = this.handleFeedback.bind(this);
    this.handleRanking = this.handleRanking.bind(this);
  }

  handleFeedback() {
    const state = localStorage.getItem('state');
    const THREE = 3;
    if (JSON.parse(state).player.assertions < THREE) {
      return (
        <h1 data-testid="feedback-text">Podia ser melhor...</h1>
      );
    }
    if (JSON.parse(state).player.assertions >= THREE) {
      return (
        <h1 data-testid="feedback-text">Mandou bem!</h1>
      );
    }
  }

  handleRanking() {
    const state = localStorage.getItem('state');
    return (
      <>
        <h1
          data-testid="feedback-total-score"
        >
          {JSON.parse(state).player.score}

        </h1>
        <h1
          data-testid="feedback-total-question"
        >
          {JSON.parse(state).player.assertions}

        </h1>
      </>
    );
  }

  render() {
    return (
      <>
        <Header />
        { this.handleFeedback() }
        { this.handleRanking() }
      </>
    );
  }
}

export default Ranking;
