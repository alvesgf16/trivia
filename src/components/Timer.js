import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  saveTime as saveTimeAction,
  timerEnded as timerEndedAction,
  timerReseted as timerResetedAction,
} from '../redux/actions';

class Timer extends Component {
  constructor() {
    super();
    this.TIMER_START_VALUE = 30;
    this.state = {
      time: this.TIMER_START_VALUE,
      intervalId: null,
    };

    this.resetarTimer = this.resetarTimer.bind(this);
    this.linkIntervalToId = this.linkIntervalToId.bind(this);
  }

  componentDidMount() {
    const { timerEnded, saveTime } = this.props;
    const ONE_SECOND = 1000;
    const interval = setInterval(() => {
      this.setState((state) => {
        if (!state.time) { // caso tenha chegado em 0
          timerEnded(); // Avisa que chegou em 0
        }
        const newTime = state.time === 0 ? 0 : state.time - 1;
        saveTime(newTime);
        return {
          time: newTime,
        };
      });
    }, ONE_SECOND);
    this.linkIntervalToId(interval);
  }

  componentDidUpdate() {
    const { resetTimer, timerReseted } = this.props;
    if (resetTimer) { // Se tiver action pra resetar
      timerReseted(); // Avisa que resetou
      this.resetarTimer();
    }
  }

  componentWillUnmount() {
    const { intervalId } = this.state;
    clearInterval(intervalId);
  }

  resetarTimer() {
    this.setState({ // Reseta o estado pro valor inicial
      time: this.TIMER_START_VALUE,
    });
  }

  linkIntervalToId(interval) {
    this.setState({
      intervalId: interval,
    });
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
  timerEnded: PropTypes.func.isRequired,
  timerReseted: PropTypes.func.isRequired,
  saveTime: PropTypes.func.isRequired,
  resetTimer: PropTypes.bool.isRequired,
};

const mapDispatchtoProps = (dispatch) => ({
  timerEnded: () => dispatch(timerEndedAction()),
  timerReseted: () => dispatch(timerResetedAction()),
  saveTime: (time) => dispatch(saveTimeAction(time)),
});

const mapStateToProps = (state) => ({
  resetTimer: state.timer.timerReset,
});

export default connect(mapStateToProps, mapDispatchtoProps)(Timer);
