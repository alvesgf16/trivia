import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends Component {

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default connect()(Game);
