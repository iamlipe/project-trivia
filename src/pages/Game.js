import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTimer } from '../actions';
import { Header, GameScreen } from '../components';

class Game extends React.Component {
  render() {
    const { location: { state: { name } }, timer } = this.props;
    return (
      <>
        <Header name={ name } />
        <GameScreen />
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
  timer: PropTypes.number.isRequired,
};

const mapStateToProps = ({ game }) => ({
  loading: game.isLoading,
  question: game.question,
  timer: game.timer,
});

const mapDispatchToProps = (dispatch) => ({
  reduxTimer: (timer, answer) => dispatch(setTimer(timer, answer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
