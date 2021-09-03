import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header, GameScreen } from '../components';

class Game extends React.Component {
  render() {
    const { location: { state: { name } } } = this.props;
    return (
      <>
        <Header name={ name } />
        <GameScreen />
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

export default connect(null, null)(Game);
