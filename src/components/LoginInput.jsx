import React from 'react';
import PropTypes from 'prop-types';
import LocaleContext from '../contexts/LocaleContexts';
import useInput from '../hooks/useInput';

function LoginInput ({ login }){
  const [email, onEmailChangeHandler] = useInput('');
  const [password, onPasswordChangeHandler] = useInput('');

  const { locale } = React.useContext(LocaleContext);
 
  function onSubmitHandler(event) {
    event.preventDefault();

    login({
     email: email,
     password: password,
    });
  }

  return (
      <form onSubmit={onSubmitHandler} className='input-login'>
        <label htmlFor='email'>Email</label>
        <input type="email" placeholder='Email' value={email} onChange={onEmailChangeHandler} />
        <label htmlFor='password'>{locale === 'id' ? 'Kata sandi' : 'Password'}</label>
        <input type="password" placeholder={locale === 'id' ? 'Kata Sandi' : 'Password'} value={password} onChange={onPasswordChangeHandler} />
        <button>{locale === 'id' ? 'Masuk' : 'Login'}</button>
      </form>
    );
}
 
LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};
 
export default LoginInput;