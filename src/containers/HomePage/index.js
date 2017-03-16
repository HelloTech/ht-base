import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { displayErrors } from '../../utils/request';
import { HTButton } from '../../components/HTKit/Buttons/index';
import styles from './styles.scss';

class HomePage extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props, context) {
    super(props, context);
    this.testNoticeStack = this.testNoticeStack.bind(this);
  }

  testNoticeStack() {
    this.props.displayErrors({ data: { errors: ['Something wrong has happened 0..'] } });
    this.props.displayErrors({ data: { errors: ['Something wrong has happened 1..'] } });
    this.props.displayErrors({ data: { errors: ['Something wrong has happened 2..'] } });
    console.log(this)
  }

  render() {
    return (
      <div>
        <h1 className={styles.test}>
          <span className={styles.testTitle}>Home Page</span>
        </h1>
        <HTButton scheme="tealGreen" onClick={this.testNoticeStack}>tealGreen</HTButton>
        <HTButton scheme="htBlue" onClick={() => alert('htBlue button')}>htBlue</HTButton>
      </div>
    );
  }
}

HomePage.propTypes = {
  displayErrors: PropTypes.func.isRequired,
};

export default connect(() => ({}), { displayErrors })(HomePage);
