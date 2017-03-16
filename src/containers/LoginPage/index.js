import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loginUser } from './actions';

class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props, context) {
    super(props, context);
    this.loginUser = this.loginUser.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
    this.state = {
      password: '',
      email: '',
    };
  }

  loginUser(e) {
    e.preventDefault();

    this.props.loginUser({ email: this.state.email, password: this.state.password });
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

  keyPressed(e) {
    if (e.key === 'Enter') {
      this.props.loginUser({ email: this.state.email, password: this.state.password });
    }
  }

  render() {
    return (
      <div>
        <Helmet
          title="Login"
        />
        <h1>
          Sign In
        </h1>
        <div style={{ backgroundColor: 'gray' }}>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            type="email"
            id="emailAddress"
            style={{ backgroundColor: 'white' }}
            value={this.state.email}
            onChange={this.handleEmailChange}
            onKeyPress={this.keyPressed}
          />
        </div>
        <div style={{ backgroundColor: 'gray' }}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            style={{ backgroundColor: 'white' }}
            type="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            onKeyPress={this.keyPressed}
          />
        </div>
        <input
          type="submit"
          onClick={this.loginUser}
        />
      </div>
    );
  }
}

LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

export default connect(null, { loginUser })(LoginPage);
