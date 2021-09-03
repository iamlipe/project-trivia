import React from 'react';
import { connect } from 'react-redux';

class Game extends React.Component {
  render() {
    return (
      <h1>GAME</h1>
    );
  }
}

export default connect(null, null)(Game);
