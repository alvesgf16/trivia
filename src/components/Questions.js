import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/alternatives.css';
import { resetTimer as resetTimerAction } from '../redux/actions';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      index: 0,
      isNextVisible: false,
      timerStopped: false,
    };

    this.difficultyPoints = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.createQuestionsEl = this.createQuestionsEl.bind(this);
    this.handleAlternativeClick = this.handleAlternativeClick.bind(this);
    this.createAlternativeButtons = this.createAlternativeButtons.bind(this);
    this.handleTimerEnd = this.handleTimerEnd.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  componentDidUpdate() {
    const { isDisabled } = this.props;
    const { timerStopped } = this.state;
    if (isDisabled && !timerStopped) {
      this.handleTimerEnd();
    }
  }

  async getQuestions() {
    const token = localStorage.getItem('token');
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    try {
      const response = await fetch(url);
      const json = await response.json();
      this.createQuestionsEl(json.results);
    } catch (e) {
      console.log(e);
    }
  }

  createAlternativeButtons(question) {
    const alternativesEl = question.incorrect_answers.map((awns, index) => (
      <button
        type="button"
        key={ `alternative-${index}` }
        data-testid={ `wrong-answer-${index}` }
        name="wrong"
        onClick={ this.handleAlternativeClick }
        className="alternative"
      >
        {awns}
      </button>
    ));
    alternativesEl.push(
      <button
        key={ `alternative-${alternativesEl.lenght}` }
        type="button"
        data-testid="correct-answer"
        name="correct"
        onClick={ this.handleAlternativeClick }
        className="alternative"
      >
        {question.correct_answer}
      </button>,
    );

    this.shuffleArray(alternativesEl);

    return alternativesEl;
  }

  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffleArray(array) {
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  }

  createQuestionsEl(questions) {
    const questionsEl = questions.map((question, index) => {
      const alternativesEl = this.createAlternativeButtons(question);
      return (
        <div key={ `question-${index}` } name={ question.difficulty }>
          <h3 data-testid="question-category">{question.category}</h3>
          <p data-testid="question-text">{question.question}</p>
          <section>{alternativesEl}</section>
        </div>
      );
    });
    this.setState({
      questions: questionsEl,
    });
  }

  savePoints(button) {
    const BASE_POINTS = 10;
    const { time } = this.props;
    const question = button.closest('div');
    const difficulty = this.difficultyPoints[question.getAttribute('name')];
    const points = BASE_POINTS + (time * difficulty);
    this.savePointsOnLocalStorage(points);
  }

  savePointsOnLocalStorage(points) {
    const localStorageState = JSON.parse(localStorage.getItem('state'));
    const savedPoints = localStorageState.player.score;
    const updatedState = {
      player: {
        ...localStorageState.player,
        score: savedPoints + points,
      },
    };
    localStorage.setItem('state', JSON.stringify(updatedState));
  }

  handleAlternativeClick({ target }) {
    const alternatives = document.querySelectorAll('.alternative');
    alternatives.forEach((alt) => {
      alt.classList.add(alt.name);
    });
    if (target.name === 'correct') {
      this.savePoints(target);
    }
    this.setState({ isNextVisible: true });
  }

  handleTimerEnd() {
    const alternatives = document.querySelectorAll('.alternative');
    alternatives.forEach((alt) => {
      alt.disabled = true;
    });
    this.setState({
      isNextVisible: true,
      timerStopped: true,
    });
  }

  handleNextClick() {
    const { resetTimer, history } = this.props;
    const { index } = this.state;
    const MAX_NUMBER_OF_QUESTIONS = 4;

    if (index < MAX_NUMBER_OF_QUESTIONS) {
      this.setState((state) => ({
        index: state.index + 1,
        isNextVisible: false,
      }));
      resetTimer();
      this.setState(({ timerStopped: false }));
    } else {
      console.log(history);
      history.push('/feedback');
    }
  }

  render() {
    const { questions, index, isNextVisible } = this.state;
    return (
      <div>
        <section>
          {questions[index]}
        </section>
        { isNextVisible && (
          <button
            data-testid="btn-next"
            type="button"
            onClick={ this.handleNextClick }
          >
            Próxima
          </button>
        ) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isDisabled: state.timer.timerEnded,
  time: state.timer.time,
});

const mapDispatchtoProps = (dispatch) => ({
  resetTimer: () => dispatch(resetTimerAction()),
});

Questions.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  time: PropTypes.number.isRequired,
  resetTimer: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchtoProps)(Questions);
