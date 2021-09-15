import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTimer } from '../actions';
import { Header, GameScreen, Nav } from '../components';

class Game extends React.Component {
  render() {
    const { location: { state: { name } } } = this.props;
    return (
      <>
        <Header name={ name } />
        <div className="container-game">
          <GameScreen />
        </div>
        <Nav />
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
