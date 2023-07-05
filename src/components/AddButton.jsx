import React from 'react';
import { BiSolidAddToQueue } from 'react-icons/bi';
import { Link } from 'react-router-dom';
 
function AddButton() {
  return <Link to='/notes/new'>
    <button className='action'><BiSolidAddToQueue /></button>
    </Link>
}
 
export default AddButton;
