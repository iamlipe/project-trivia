import React from 'react';
import { Header } from '../components';

class Ranking extends React.Component {
  constructor(props) {
    super(props);

    this.handleFeedback = this.handleFeedback.bind(this);
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

  render() {
    return (
      <>
        <Header />
        { this.handleFeedback() }
      </>
    );
  }
}

export default Ranking;
