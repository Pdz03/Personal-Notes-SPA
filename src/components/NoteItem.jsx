import React from 'react';
import NoteItemBody from './NoteItemBody';
import { showFormattedDate } from '../utils';
import PropTypes from 'prop-types';
 
function NoteItem({ title, body, createdAt, id }) {
 return (
   <div className='note-item'>
     <NoteItemBody title={title} body={body} date={showFormattedDate(createdAt)} id={id} />
   </div>
 );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};
 
export default NoteItem;
