import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
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

export default connect(null, null)(Header);
