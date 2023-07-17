import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Detail from '../components/Detail';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import Swal from 'sweetalert2';
import LocaleContext from '../contexts/LocaleContexts';
import PageLoader from '../components/PageLoader';

function DetailPage (){
  const [isLoading, setIsLoading] = React.useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [notes, setNote] = React.useState(null);

  const { locale } = React.useContext(LocaleContext);

  let titletext = '';
  let text = '';
  let confirm1 = '';
  let confirm2 = '';
  let buttoncancel = '';
  let buttonconfirm = '';

  React.useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      (async () => {
        const { data } = await getNote(id);
        setNote(data);
        setIsLoading(false);
      })();
    }, 500);
  }, [id]);

  const onDeleteHandler = async(id) => {
    if (locale === 'id'){
      titletext = 'Apakah anda yakin?';
      text = 'Anda akan menghapus catatan ini!';
      buttonconfirm = 'Ya, hapus!';
      buttoncancel = 'Batal';
      confirm1 = 'Terhapus!';
      confirm2 = 'Catatan anda telah dihapus';
    }else{
      titletext = 'Are you sure?';
      text = 'You will delete this note!';
      buttonconfirm = 'Yes, delete it!';
      buttoncancel = 'Cancel';
      confirm1 = 'Deleted!'
      confirm2 = 'Your note have been deleted';
    }

    await Swal.fire({
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
        deleteNote(id);
        navigate('/');
        Swal.fire(
          confirm1,
          confirm2,
          'success'
        )
      }
    })
  }

  const onArchiveHandler = async(id) => {
    if (locale === 'id'){
      titletext = 'Apakah anda yakin?';
      text = 'Anda akan mengarsipkan catatan ini!';
      buttonconfirm = 'Ya, arsipkan!';
      buttoncancel = 'Batal';
      confirm1 = 'Terarsip!';
      confirm2 = 'Catatan anda telah diarsipkan';
    }else{
      titletext = 'Are you sure?';
      text = 'You will archive this note!';
      buttonconfirm = 'Yes, archive it!';
      buttoncancel = 'Cancel';
      confirm1 = 'Archived!'
      confirm2 = 'Your note have been archived';
    }

    await Swal.fire({
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
        archiveNote(id);
        navigate('/archives');
        Swal.fire(
          confirm1,
          confirm2,
          'success'
        )
      }
    })
  }

  const onUnarchiveHandler = async(id) => {
    if (locale === 'id'){
      titletext = 'Apakah anda yakin?';
      text = 'Anda akan membuka arsip catatan ini!';
      buttonconfirm = 'Ya, buka!';
      buttoncancel = 'Batal';
      confirm1 = 'Terbuka!';
      confirm2 = 'Arsip catatan anda telah terbuka';
    }else{
      titletext = 'Are you sure?';
      text = 'You will open this archived note!';
      buttonconfirm = 'Yes, open it!';
      buttoncancel = 'Cancel';
      confirm1 = 'Actived!'
      confirm2 = 'Your note have been actived';
    }

    await Swal.fire({
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
        unarchiveNote(id);
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
      {isLoading ? <PageLoader /> : 
        <Detail {...notes} 
        onDelete={onDeleteHandler} 
        onArchive={onArchiveHandler} 
        onUnarchive={onUnarchiveHandler}/>
      }
    </section>
);
}

export default DetailPage;
