import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { login } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContexts';
 
function LoginPage({ loginSuccess }) {
  const { locale } = React.useContext(LocaleContext);

  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });
 
    if (!error) {
      loginSuccess(data);
    }
  }
 
  return (
    <section>
      <h2>{locale === 'id' ? 'Silakan masuk untuk melanjutkan ...' : 'Please login to continue ...'}</h2>
      <LoginInput login={onLogin} />
      <p>{locale === 'id' ? 'Belum punya akun? ' : `Don't have an account? `} 
      <Link to="/register">{locale === 'id' ? 'Daftar Di Sini' : 'Register Here'}</Link></p>
    </section>
  );
}
 
LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
}
 
export default LoginPage;