import React from 'react';
import PropTypes from 'prop-types';
import LocaleContext from '../contexts/LocaleContexts';
import useInput from '../hooks/useInput';

function RegisterInput ({ register }){
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onPasswordConfirm] = useInput('');

  const { locale } = React.useContext(LocaleContext);

  function onSubmitHandler(event) {
    event.preventDefault();
 
    register({
      name: name,
      email: email,
      password: password,
    });
  }

  return (
    <form onSubmit={onSubmitHandler} className='input-register'>
      <label htmlFor='nama'>{locale === 'id' ? 'Nama' : 'Name'}</label>
      <input type="text" placeholder="Nama" value={name} onChange={onNameChange} />
      <label htmlFor='email'>Email</label>
      <input type="email" placeholder="Email" value={email} onChange={onEmailChange} />
      <label htmlFor='password'>{locale === 'id' ? 'Kata sandi' : 'Password'}</label>
      <input type="password" placeholder={locale === 'id' ? 'Kata Sandi' : 'Password'} autoComplete='current-password' value={password} onChange={onPasswordChange} />
      <label htmlFor='password'>{locale === 'id' ? 'Konfirmasi Kata Sandi' : 'Password Confirmation'}</label>
      <input type="password" placeholder={locale === 'id' ? 'Konfirmasi Kata Sandi' : 'Password Confirmation'} autoComplete='current-password' value={confirmPassword} onChange={onPasswordConfirm} />
      <button disabled={password != confirmPassword}>{locale === 'id' ? 'Daftar' : 'Register'}</button>
    </form>
  )
}
 
RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};
 
export default RegisterInput;