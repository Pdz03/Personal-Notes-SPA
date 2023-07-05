import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
 
function NoteItemBody({ title, date, body, id }) {
 return (
   <div className='note-item__content'>
     <h3 className='note-item__title'>
     <Link to={`/notes/${id}`} style={{textDecoration: 'none'}}>{title}</Link>
     </h3>
     <p className='note-item__date'>{date}</p>
     <p className='note-item__body'>{body}</p>
   </div>
 );
}

NoteItemBody.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};
 
export default NoteItemBody;