import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          alt="img-profile"
          src={ `https://www.gravatar.com/avatar/${localStorage.getItem('hash')}` }
        />
        <span data-testid="header-player-name">
          {JSON.parse(localStorage.getItem('state')).player.name}
        </span>
        <span data-testid="header-score">
          {JSON.parse(localStorage.getItem('state')).player.score}
        </span>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  answer: PropTypes.shape({
    answer: PropTypes.shape({}) }),
}.isRequired;

const mapStateToProps = ({ game, user }) => ({
  answers: game.answer,
  loading: game.isLoading,
  name: user.name,
  timer: game.timer,
  point: game.point,
});

export default connect(mapStateToProps, null)(Header);
