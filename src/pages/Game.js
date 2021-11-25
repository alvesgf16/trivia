import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';
import Timer from '../components/Timer';

class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <Questions history={ history } />
        <Timer />
      </div>
    );
  }
}

export default Game;

Game.propTypes = { history: PropTypes.objectOf(PropTypes.any).isRequired };
