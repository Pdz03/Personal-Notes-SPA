import React from 'react';
import PropTypes from 'prop-types';
import { BiSolidCheckCircle } from 'react-icons/bi';
import LocaleContext from '../contexts/LocaleContexts';
import useInput from '../hooks/useInput';
import useInputHTML from '../hooks/useInputHTML';

function NoteInput ({ addNote }){
  const [title, onTitleChangeEventHandler] = useInput('');
  const [body, onBodyChangeEventHandler] = useInputHTML('');

  const { locale } = React.useContext(LocaleContext);

  function onSubmitEventHandler(event) {
    event.preventDefault();

    console.log(body);

    addNote({ 
      title : title,
      body : body,
    });
  }

  return (
    <form onSubmit={onSubmitEventHandler}>
       <div className='add-new-page__input'>
       <input
         className='add-new-page__input__title'
         placeholder={locale === 'id' ? 'Catatan Rahasia' : 'Secret Note'}
         onChange={onTitleChangeEventHandler}
       />
      <div
         className='add-new-page__input__body'
         data-placeholder={locale === 'id' ? 'Isi catatan ...' : 'Note content ...'}
         onInput={onBodyChangeEventHandler}
         contentEditable
       />
       </div>
       <div className='add-new-page__action'>
      <button type='submit' className='action'><BiSolidCheckCircle /></button>
      </div>
    </form>
  )
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
}

export default NoteInput;

