import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/network-data';
import NoteInput from '../components/NoteInput';
import Swal from 'sweetalert2';
import LocaleContext from '../contexts/LocaleContexts';
 
function AddPage() {
  const navigate = useNavigate();
  const { locale } = React.useContext(LocaleContext);

  let titletext = '';
  let text = '';
  let confirm1 = '';
  let confirm2 = '';
  let buttoncancel = '';
  let buttonconfirm = '';

  if (locale === 'id'){
    titletext = 'Apakah anda yakin?';
    text = 'Anda akan menambahkan catatan ini!';
    buttonconfirm = 'Ya, tambahkan!';
    buttoncancel = 'Batal';
    confirm1 = 'Ditambahkan!';
    confirm2 = 'Catatan anda telah ditambahkan';
  }else{
    titletext = 'Are you sure?';
    text = 'You will add this note!';
    buttonconfirm = 'Yes, add it!';
    buttoncancel = 'Cancel';
    confirm1 = 'Added!'
    confirm2 = 'Your note have been added';
  }

  function onAddNoteHandler({ title, body }) {
    Swal.fire({
      title: titletext,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: buttoncancel,
      confirmButtonText: buttonconfirm
    }).then((result) => {
      if (result.isConfirmed) {
        addNote({ title, body });
        navigate('/');
        Swal.fire(
          confirm1,
          confirm2,
          'success'
        )
      }
    })
  }
 
  return (
    <section>
      <h2>{locale === 'id' ? 'Tambah Catatan' : 'Add Note'}</h2>
      <NoteInput addNote={onAddNoteHandler} />
    </section>
  )
}
 
export default AddPage;
