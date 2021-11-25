import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetScore as resetScoreAction } from '../redux/actions';

class Ranking extends Component {
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
    const savedRanking = JSON.parse(localStorage.getItem('ranking'));
    savedRanking.sort((a, b) => b.score - a.score);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        { savedRanking.map(({ name, score, picture }, index) => (
          <div key={ index }>
            <img src={ picture } alt="profile" />
            <span data-testid={ `player-name-${index}` }>{ name }</span>
            <span data-testid={ `player-score-${index}` }>{ score }</span>
          </div>
        )) }
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.handlePlayAgain }
        >
          Voltar ao início
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  resetScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  resetScore: () => dispatch(resetScoreAction()),
});

export default connect(null, mapDispatchToProps)(Ranking);
