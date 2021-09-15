import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import wave from '../assets/image/header.svg';

class Header extends React.Component {
  render() {
    const { waveHeader, color, point } = this.props;
    return (
      <div className="container-header">
        <div className="content-header">
          <div className="profile-box">
            <img
              className="profile-picture"
              data-testid="header-profile-picture"
              alt="img-profile"
              src={ `https://www.gravatar.com/avatar/${localStorage.getItem('hash')}` }
            />
            <span
              className={ `header-name ${color}` }
              data-testid="header-player-name"
            >
              {JSON.parse(localStorage.getItem('state')).player.name}
            </span>
          </div>
          <span
            className={ `header-score ${color}` }
            data-testid="header-score"
          >
            {`score: ${point === 0
              ? JSON.parse(localStorage.getItem('state')).player.score : point}`}
          </span>
        </div>
        {waveHeader === false ? null : <img className="wave" src={ wave } alt="wave" /> }
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
