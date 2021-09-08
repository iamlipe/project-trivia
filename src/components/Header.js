import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  // setScore () {
  //   const POINTS_CORRECT_ANSWER = 10;
  //   const { answers } = this.props;
  //   const answerDifficulty = answers[0].difficulty;
  //   const scoreAnswer = POINTS_CORRECT_ANSWER + (timer * answerDifficulty);

  // }

  render() {
    const { name } = this.props;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          alt="img-profile"
          src={ `https://www.gravatar.com/avatar/${localStorage.getItem('hash')}` }
        />
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score">0</span>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

const mapStateToProps = ({ game }) => ({
  answers: game.answer,
  timer: game.timer,
});

export default connect(mapStateToProps, null)(Header);
