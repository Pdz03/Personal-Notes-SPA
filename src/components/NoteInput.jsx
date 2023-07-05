import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'auto-bind';
import { BiSolidCheckCircle } from 'react-icons/bi';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    // inisialisasi state
    this.state = {
      title: '',
      body: '',
    }

    autoBind(this);
  }

  onTitleChangeEventHandler(event) {
    this.setState(() => {
      return {
        title: event.target.value,
      }
    });
  }

  onBodyChangeEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.innerHTML,
      }
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.addNote(this.state);
  }

  render() {
   return (
     <form onSubmit={this.onSubmitEventHandler}>
        <div className='add-new-page__input'>
        <input
          className='add-new-page__input__title'
          placeholder='Catatan Rahasia'
          onChange={this.onTitleChangeEventHandler}
        />
       <div
          className='add-new-page__input__body'
          data-placeholder='Sebenarnya saya adalah ....'
          onInput={this.onBodyChangeEventHandler}
          contentEditable
        />
        </div>
        <div className='add-new-page__action'>
       <button type='submit' className='action'><BiSolidCheckCircle /></button>
       </div>
     </form>
   )
 }
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired
}

export default NoteInput;

