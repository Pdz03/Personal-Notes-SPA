import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'auto-bind';
 
class RegisterInput extends React.Component {
  constructor(props) {
    super(props)
 
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordconfirm: '',
    }
 
    autoBind(this);
  }
 
  onNameChange(event) {
    this.setState(() => {
      return {
        name: event.target.value,
      };
    });
  }
 
  onEmailChange(event) {
    this.setState(() => {
      return {
        email: event.target.value
      };
    });
  }
 
  onPasswordChange(event) {
    this.setState(() => {
      return {
        password: event.target.value
      };
    })
  }

  onPasswordConfirm(event) {
    this.setState(() => {
      return {
        passwordconfirm: event.target.value
      };
    })
  }
 
  onSubmitHandler(event) {
    event.preventDefault();
 
    this.props.register({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    });
  }
 
  render() {
    return (
      <form onSubmit={this.onSubmitHandler} className='input-register'>
        <label htmlFor='nama'>Nama</label>
        <input type="text" placeholder="Nama" value={this.state.name} onChange={this.onNameChange} />
        <label htmlFor='email'>Email</label>
        <input type="email" placeholder="Email" value={this.state.email} onChange={this.onEmailChange} />
        <label htmlFor='password'>Password</label>
        <input type="password" placeholder="Password" autoComplete='current-password' value={this.state.password} onChange={this.onPasswordChange} />
        <label htmlFor='password'>Konfirmasi Password</label>
        <input type="password" placeholder="Konfirmasi Password" autoComplete='current-password' value={this.state.passwordconfirm} onChange={this.onPasswordConfirm} />
        <button disabled={this.state.password != this.state.passwordconfirm}>Register</button>
      </form>
    )
  }
}
 
RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};
 
export default RegisterInput;