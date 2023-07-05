import React from 'react';
// import { addContact } from '../utils/data';
// import ContactInput from '../components/ContactInput';
import { useNavigate } from 'react-router-dom';
 
function AddPage() {
  const navigate = useNavigate();

  // function onAddContactHandler(contact) {
  //   addContact(contact);
  //   navigate('/');
  // }
 
  return (
    <section>
      <h2>Tambah kontak</h2>
    </section>
  )
}
 
export default AddPage;