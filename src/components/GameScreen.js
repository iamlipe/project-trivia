import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setTimer } from '../actions';
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
    this.setTimer = this.setTimer.bind(this);
  }

  componentDidMount() {
    this.setTimer();
  }

  setTimer() {
    const ONE_SECOND = 1000;
    const TIMER = setInterval(() => {
      const { loading, reduxTimer, question, timer } = this.props;
      if (timer <= 0 || question === true) {
        console.log('s');
        clearInterval(TIMER);
        reduxTimer(timer, question);
        Array.from(document.getElementsByClassName('botao'))
          .forEach((item) => { item.disabled = true; });
      } else if (loading === false) {
        const newTimer = parseFloat(timer) - 1;
        reduxTimer(newTimer, question);
      }
    }, ONE_SECOND);
  }

  handleBotao(item, index) {
    const { isIncorrect } = this.state;
    return (
      <button
        data-testid={ `wrong-answer-${index}` }
        className={ `${isIncorrect} botao` }
        type="button"
        value="incorrect"
        key={ index }
        onClick={ this.handleClick }
      >
        {item}
      </button>);
  }

  handleClick({ target: { value } }) {
    const { reduxTimer, timer } = this.props;
    if (value === 'correct') {
      this.setState({ isCorrect: value, isIncorrect: 'incorrect' });
    } else if (value === 'incorrect') {
      this.setState({ isCorrect: 'correct', isIncorrect: value });
    }
    reduxTimer(timer, true);
  }

  renderGame() {
    const { answer: { answer, question } } = this.props;
    const { isCorrect } = this.state;
    return (
      <div>
        <h1 data-testid="question-category">{answer[0].category}</h1>
        <h1 data-testid="question-text">{answer[0].question}</h1>
        <button
          type="button"
          className={ `${isCorrect} botao` }
          data-testid="correct-answer"
          value="correct"
          onClick={ this.handleClick }
        >
          {answer[0].correct_answer}
        </button>
        {answer[0].incorrect_answers.map(
          (item, index) => this.handleBotao(item, index),
        )}
        {question === true ? <button type="button" data-testid="btn-next">Proxima Pergunta</button> : null}
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

GameScreen.propTypes = {
  answer: PropTypes.shape({
    isLoading: PropTypes.bool,
    answer: PropTypes.shape({}) }),
  reduxTimer: PropTypes.func,
  timer: PropTypes.number,
  question: PropTypes.bool,
  loading: PropTypes.bool,
}.isRequired;

const mapStateToProps = (state) => ({
  loading: state.game.isLoading,
  answer: state.game,
  timer: state.game.timer,
  question: state.game.question,
});

const mapDispatchToProps = (dispatch) => ({
  reduxTimer: (timer, answer) => dispatch(setTimer(timer, answer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
