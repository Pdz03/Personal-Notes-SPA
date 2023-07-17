import React from 'react';
import NoteList from '../components/NoteList';
import { useSearchParams } from 'react-router-dom';
import { getArchivedNotes } from '../utils/network-data';
import SearchBar from '../components/SearchBar';
import PropTypes from 'prop-types';
import LocaleContext from '../contexts/LocaleContexts';
import PageLoader from '../components/PageLoader';

function ArchivePage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get('keyword') || ''
  });
  const { locale } = React.useContext(LocaleContext);

  React.useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getArchivedNotes().then(({ data }) => {
        setNotes(data);
        setIsLoading(false);
      });
    }, 500);
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

  const showFilteredNotes =  (
    <>
    {filteredNotes.length > 0 ?
    <NoteList notes={filteredNotes} />
    :<p className='notes-list-empty'>{locale === 'id' ? 'Tidak ada catatan' : 'Empty note'}</p>
    }
    </>
  )
 
  return (
      <section>
        <h2>{locale === 'id' ? 'Daftar Catatan Arsip' : 'Archived Note List'}</h2>
        <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
        {isLoading ? <PageLoader /> : showFilteredNotes }
      <div className='homepage__action'>
      </div>
      </section>
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};
 
export default ArchivePage;
