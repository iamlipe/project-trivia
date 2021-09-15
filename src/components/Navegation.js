import React from 'react';
import { Link } from 'react-router-dom';

import home from '../assets/image/home.svg';
import music from '../assets/image/music.svg';
import x from '../assets/image/x.svg';

class Navegation extends React.Component {
  constructor() {
    super();
    this.state = {
      song: false,
    };
    this.setSong = this.setSong.bind(this);
  }

  setSong() {
    const { song } = this.state;
    const audio = document.querySelector('audio');
    const muted = document.getElementsByClassName('x')[0];
    this.setState((prevState) => ({
      song: !prevState.song,
    }));

    if (song === true) {
      audio.pause();
      muted.style.display = 'flex';
    } else {
      audio.play();
      muted.style.display = 'none';
    }
  }

  render() {
    return (
      <nav className="nav">
        <Link to="/">
          <img src={ home } alt="home" />
        </Link>
        <button className="music" onClick={ this.setSong } type="button">
          <img src={ music } alt="music" />
          <img className="x" src={ x } alt="x" />
        </button>
      </nav>
    );
  }
}

export default Navegation;
