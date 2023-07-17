import PropTypes from 'prop-types';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { BiSolidArchiveIn, BiSolidArchiveOut } from 'react-icons/bi'
import { showFormattedDate } from '../utils/index';
import LocaleContext from '../contexts/LocaleContexts';


function Detail({ id, title, body, createdAt, archived, onDelete, onArchive, onUnarchive }) {
  const { locale } = React.useContext(LocaleContext);

  let lang = '';
  if (locale === 'id'){
    lang = 'id-ID';
  }else{
    lang = 'en-EN';
  }

  const formattedDate = showFormattedDate(createdAt, lang);

  return (
    <>
    <div className='section'>
      <div className='detail-page'>
        <h2 className='detail-page__title'>{title}</h2>
        <p className='detail-page__createdAt'>{formattedDate}</p>
        <p className='detail-page__body' dangerouslySetInnerHTML={{ __html: body }} />
        {archived ? 
        <p className='detail-page__status'>Status : {locale === 'id' ? 'Catatan Diarsipkan' : 'Archived Note'}</p>
        :
        <p className='detail-page__status'>Status : {locale === 'id' ? 'Catatan Aktif' : 'Active Note'}</p>
        }
        
        <div className='detail-page__action'>
          {archived ?
          <button className='action' type='button' onClick={() => onUnarchive(id)}>
          <BiSolidArchiveOut />
          </button>         
          : 
          <button className='action' type='button' onClick={() => onArchive(id)}>
          <BiSolidArchiveIn />
          </button>
          }
          <button className='action' type='button' onClick={() => onDelete(id)}>
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

Detail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired,
};

export default Detail;
