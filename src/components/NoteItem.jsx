import React from 'react';
import NoteItemBody from './NoteItemBody';
import { showFormattedDate } from '../utils';
 
function NoteItem({ title, body, createdAt, id, isArchive }) {
 return (
   <div className='note-item'>
     <NoteItemBody title={title} body={body} date={showFormattedDate(createdAt)} id={id} archived={isArchive} />
   </div>
 );
}
 
export default NoteItem;