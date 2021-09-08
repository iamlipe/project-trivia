import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTimer } from '../actions';
import { Header, GameScreen } from '../components';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
      answer: false,
    };
    this.setTimer = this.setTimer.bind(this);
    this.setAnswer = this.setAnswer.bind(this);
  }

  componentDidMount() {
    this.setTimer();
  }

  setAnswer() {
    this.setState({
      answer: true,
    });
  }

  setTimer() {
    const ONE_SECOND = 1000;
    const TIMER = setInterval(() => {
      const { loading, reduxTimer } = this.props;
      const { timer, answer } = this.state;
      if (timer <= 0 || answer === true) {
        clearInterval(TIMER);
        reduxTimer(timer);
      } else if (loading === false) {
        this.setState((prevState) => ({
          timer: prevState.timer - 1,
        }));
      }
    }, ONE_SECOND);
  }

  render() {
    const { location: { state: { name } } } = this.props;
    const { timer } = this.state;
    return (
      <>
        <Header name={ name } />
        <GameScreen onClick={ this.setAnswer } />
        <span>{timer}</span>
      </>
    );
  }
}

Game.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
  }).isRequired,
  loading: PropTypes.func.isRequired,
  reduxTimer: PropTypes.func.isRequired,
};

const mapStateToProps = ({ game }) => ({
  loading: game.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  reduxTimer: (timer) => dispatch(setTimer(timer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
