import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './GameScreen.css';

class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCorrect: '',
      isIncorrect: '',
    };
    this.renderGame = this.renderGame.bind(this);
    this.handleBotao = this.handleBotao.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleBotao(item, index) {
    const { isIncorrect } = this.state;
    return (
      <button
        data-testid={ `wrong-answer-${index}` }
        className={ isIncorrect }
        type="button"
        value="incorrect"
        key={ index }
        onClick={ this.handleClick }
      >
        {item}
      </button>);
  }

  handleClick({ target: { value } }) {
    if (value === 'correct') {
      this.setState({ isCorrect: value, isIncorrect: 'incorrect' });
    } else if (value === 'incorrect') {
      this.setState({ isCorrect: 'correct', isIncorrect: value });
    }
  }

  renderGame() {
    const { answer: { answer } } = this.props;
    const { isCorrect } = this.state;
    return (
      <div>
        <h1 data-testid="question-category">{answer[0].category}</h1>
        <h1 data-testid="question-text">{answer[0].question}</h1>
        <button
          type="button"
          className={ isCorrect }
          data-testid="correct-answer"
          value="correct"
          onClick={ this.handleClick }
        >
          {answer[0].correct_answer}
        </button>
        {answer[0].incorrect_answers.map(
          (item, index) => this.handleBotao(item, index),
        )}
      </div>
    );
  }

  render() {
    const { answer: { isLoading } } = this.props;
    return (
      isLoading === true ? <h1>Oi</h1> : this.renderGame()
    );
  }
}

const mapStateToProps = (state) => ({
  answer: state.game,
});

GameScreen.propTypes = {
  answer: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    answer: PropTypes.shape({}) }).isRequired,
};

export default connect(mapStateToProps, null)(GameScreen);
