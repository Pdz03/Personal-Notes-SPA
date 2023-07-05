import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/local-data';
import NoteInput from '../components/NoteInput';
import Swal from 'sweetalert2';
 
function AddPage() {
  const navigate = useNavigate();

  function onAddNoteHandler(note) {
    Swal.fire({
      title: 'Apakah anda yakin?',
      text: 'Anda akan menambahkan catatan ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Batal',
      confirmButtonText: 'Ya, tambahkan!'
    }).then((result) => {
      if (result.isConfirmed) {
        addNote(note);
        navigate('/');
        Swal.fire(
          'Ditambahkan!',
          'Catatan anda telah ditambahkan',
          'success'
        )
      }
    })
  }
 
  return (
    <section>
      <h2>Tambah Catatan</h2>
      <NoteInput addNote={onAddNoteHandler} />
    </section>
  )
}
 
export default AddPage;
