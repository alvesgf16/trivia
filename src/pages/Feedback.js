import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const localStorageState = JSON.parse(localStorage.getItem('state'));
    const correctAnswers = localStorageState.player.assertions;
    const { score } = this.props;
    const ACCEPTABLE_SCORE = 3;
    return (
      <div>
        <Header />
        <h3 data-testid="feedback-text">
          { correctAnswers < ACCEPTABLE_SCORE ? 'Podia ser melhor...' : 'Mandou bem!' }
        </h3>
        <h2 data-testid="feedback-total-score">{ score }</h2>
        <p data-testid="feedback-total-question">{ correctAnswers }</p>
      </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
