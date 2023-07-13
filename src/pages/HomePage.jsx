import React from 'react';
import NoteList from '../components/NoteList';
import { useSearchParams } from 'react-router-dom';
import { getActiveNotes } from '../utils/network-data';
import SearchBar from '../components/SearchBar';
import AddButton from '../components/AddButton';
import PropTypes from 'prop-types';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get('keyword') || ''
  });

  React.useEffect(() => {
    getActiveNotes().then(({ data }) => {
      setNotes(data);
    });
  }, []);

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(
      keyword.toLowerCase()
    );
  });
 
  return (
      <section>
        <h2>Daftar Catatan Aktif</h2>
        <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
        {filteredNotes.length > 0 ? 
        <NoteList notes={filteredNotes} />
        :<p className='notes-list-empty'>Tidak ada catatan</p>
      }
      <div className='homepage__action'>
      <AddButton />
      </div>
      </section>
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};
 
export default HomePage;
