import React from 'react';
// import DeleteButton from './DeleteButton';
// import ArchiveButton from './ArchiveButton';
import NoteItemBody from './NoteItemBody';
import { showFormattedDate } from '../utils';
 
function NoteItem({ title, body, createdAt, id, onDelete, onArchive, isArchive }) {
 return (
   <div className='note-item'>
     <NoteItemBody title={title} body={body} date={showFormattedDate(createdAt)} />
     <div className='note-item__action'>
     {/* <DeleteButton id={id} onDelete={onDelete} />
     <ArchiveButton id={id} onArchive={onArchive} isArchive={isArchive}/> */}
     </div>
   </div>
 );
}
 
export default NoteItem;