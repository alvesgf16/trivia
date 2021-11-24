import React, { Component } from 'react';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      index: 0,
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.createQuestionsEl = this.createQuestionsEl.bind(this);
    this.createAlternativeButtons = this.createAlternativeButtons.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
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
      >
        {awns}
      </button>
    ));
    alternativesEl.push(
      <button
        key={ `alternative-${alternativesEl.lenght}` }
        type="button"
        data-testid="correct-answer"
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
        <div key={ `question-${index}` }>
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

  render() {
    const { questions, index } = this.state;
    return <div>{questions[index]}</div>;
  }
}

export default Questions;
