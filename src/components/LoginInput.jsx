import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'auto-bind';
 
class LoginInput extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      email: '',
      password: '',
    };
 
    autoBind(this);
  }
 
  onEmailChangeHandler(event) {
    this.setState(() => {
      return {
        email: event.target.value
      }
    })
  }
 
  onPasswordChangeHandler(event) {
    this.setState(() => {
      return {
        password: event.target.value
      };
    });
  }
 
  onSubmitHandler(event) {
    event.preventDefault();
 
    this.props.login({
      email: this.state.email,
      password: this.state.password,
    });
  }
 
  render() {
    return (
      <form onSubmit={this.onSubmitHandler} className='input-login'>
        <label htmlFor='email'>Email</label>
        <input type="email" placeholder='Email' value={this.state.email} onChange={this.onEmailChangeHandler} />
        <label htmlFor='password'>Password</label>
        <input type="password" placeholder='Password' value={this.state.password} onChange={this.onPasswordChangeHandler} />
        <button>Masuk</button>
      </form>
    );
  }
}
 
LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
}
 
export default LoginInput;