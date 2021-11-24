import React, { Component } from 'react';
import Header from '../components/Header';
import Questions from '../components/Questions';
import Timer from '../components/Timer';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <Questions />
        <Timer />
      </div>
    );
  }
}

export default Game;
