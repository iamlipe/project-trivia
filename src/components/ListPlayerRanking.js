import React from 'react';
import PropTypes from 'prop-types';

import medal0 from '../assets/image/0.svg';
import medal1 from '../assets/image/1.svg';
import medal2 from '../assets/image/2.svg';

class ListPlayerRanking extends React.Component {
  renderMedal() {
    const { podium } = this.props;
    if (podium === 0) {
      return <img className="medal" src={ medal0 } alt="medal" />;
    }
    if (podium === 1) {
      return <img className="medal" src={ medal1 } alt="medal" />;
    }
    if (podium === 2) {
      return <img className="medal" src={ medal2 } alt="medal" />;
    }
  }

  render() {
    const { data: { name, score, picture } } = this.props;
    return (
      <div className="list-ranking">
        <div className="player-info">
          <img
            alt="img-profile"
            src={ picture }
          />
          <span data-testid={ `player-name-${name}` }>{name}</span>
        </div>
        <div className="medal-box">
          { this.renderMedal() }
        </div>
        <span
          className="score-ranking"
          data-testid={ `player-score-${score}` }
        >
          {`SCORE:  ${score}`}
        </span>
      </div>
    );
  }
}

ListPlayerRanking.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    score: PropTypes.number,
    picture: PropTypes.string,
  }),
}.isRequired;

export default ListPlayerRanking;
