import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { resetScore as resetScoreAction } from '../redux/actions';

class Feedback extends Component {
  constructor() {
    super();

    this.handlePlayAgain = this.handlePlayAgain.bind(this);
  }

  handlePlayAgain() {
    const { history, resetScore } = this.props;
    history.push('/');
    resetScore();
  }

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
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handlePlayAgain }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  resetScore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  resetScore: () => dispatch(resetScoreAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
