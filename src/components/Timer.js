import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      time: 5,
    };
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    const { handleTimerEnd } = this.props;
    setInterval(() => {
      this.setState((state) => {
        if (!state.time) {
          handleTimerEnd();
        }
        return {
          time: state.time === 0 ? 0 : state.time - 1,
        };
      });
    }, ONE_SECOND);
  }

  render() {
    const { time } = this.state;
    return (
      <section>
        Tempo:
        {time}
      </section>);
  }
}

Timer.propTypes = {
  handleTimerEnd: PropTypes.func.isRequired,
};

export default Timer;
