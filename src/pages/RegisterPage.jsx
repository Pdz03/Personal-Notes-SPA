import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { register } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContexts';
 
function RegisterPage() {
    const navigate = useNavigate();
    const { locale } = React.useContext(LocaleContext);
 
    async function onRegisterHandler(user) {
      const { error } = await register(user);
      if (!error) {
        navigate('/');
      }
    }
 
  return (
    <section>
      <h2>{locale === 'id' ? 'Silakan isi data di bawah ini untuk mendaftar' : 'Please fill in the data below to register'}</h2>
      <RegisterInput register={onRegisterHandler} />
      <p>{locale === 'id' ? 'Sudah punya akun? ' : 'Already have an account? '}
      <Link to="/">{locale === 'id' ? 'Masuk Di Sini' : 'Login Here'}</Link></p>
    </section>
  )
}
 
export default RegisterPage;