import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const localStorageState = JSON.parse(localStorage.getItem('state'));
    const correctAnswers = localStorageState.player.assertions;
    const ACCEPTABLE_SCORE = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          { correctAnswers < ACCEPTABLE_SCORE ? 'Podia ser melhor...' : 'Mandou bem!' }
        </p>
      </div>
    );
  }
}

// Feedback.propTypes = {
//   score: PropTypes.number.isRequired,
// };

// const mapStateToProps = (state) => ({
//   score: state.player.score,
// });

export default connect(null)(Feedback);
