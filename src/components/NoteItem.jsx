import React from 'react';
import NoteItemBody from './NoteItemBody';
import { showFormattedDate } from '../utils';
 
function NoteItem({ title, body, createdAt, id }) {
 return (
   <div className='note-item'>
     <NoteItemBody title={title} body={body} date={showFormattedDate(createdAt)} id={id} />
   </div>
 );
}
 
export default NoteItem;