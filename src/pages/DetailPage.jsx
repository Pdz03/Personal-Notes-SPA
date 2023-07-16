import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Detail from '../components/Detail';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import Swal from 'sweetalert2';
// import NoteDetailEmpty from '../components/DetailNote/NoteDetailEmpty';

function DetailPage (){
  const { id } = useParams();
  const navigate = useNavigate();
  const [notes, setNote] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const { data } = await getNote(id);
      setNote(data);
    })();
  }, [id]);

  const onDeleteHandler = async(id) => {
    await Swal.fire({
      title: 'Apakah anda yakin?',
      text: 'Anda akan menghapus catatan ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Batal',
      confirmButtonText: 'Ya, hapus!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNote(id);
        navigate('/');
        Swal.fire(
          'Deleted!',
          'Catatan telah terhapus.',
          'success'
        )
      }
    })
  }

  const onArchiveHandler = async(id) => {
    await Swal.fire({
      title: 'Apakah anda yakin?',
      text: 'Anda akan mengarsipkan catatan ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Batal',
      confirmButtonText: 'Ya, arsipkan!'
    }).then((result) => {
      if (result.isConfirmed) {
        archiveNote(id);
        navigate('/archives');
        Swal.fire(
          'Archived!',
          'Catatan anda telah diarsipkan',
          'success'
        )
      }
    })
  }

  const onUnarchiveHandler = async(id) => {
    await Swal.fire({
      title: 'Apakah anda yakin?',
      text: 'Anda akan membuka arsip catatan ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Batal',
      confirmButtonText: 'Ya, buka arsip!'
    }).then((result) => {
      if (result.isConfirmed) {
        unarchiveNote(id);
        navigate('/');
        Swal.fire(
          'Actived!',
          'Arsip catatan anda telah terbuka',
          'success'
        )
      }
    })
  }

  return (
    <section>
      <Detail {...notes} 
      onDelete={onDeleteHandler} 
      onArchive={onArchiveHandler} 
      onUnarchive={onUnarchiveHandler}/>
    </section>
);
}

export default DetailPage;
