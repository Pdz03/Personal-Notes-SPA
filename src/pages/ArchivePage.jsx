import React from 'react';
import NoteList from '../components/NoteList';
import { useSearchParams } from 'react-router-dom';
import { getArchivedNotes } from '../utils/local-data';
import SearchBar from '../components/SearchBar';
import PropTypes from 'prop-types';

function ArchivePageWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword') || '';
    function changeSearchParams(keyword) {
      setSearchParams({ keyword });
    }
   
    return <ArchivePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  }
 
class ArchivePage extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
        notes: getArchivedNotes(),
        keyword: props.defaultKeyword || '',
      }
    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }


  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      }
    });

    this.props.keywordChange(keyword);
  }
 
  render() {
    const notes = this.state.notes;
    const noteList = notes.filter((note) => {
        return note.title.toLowerCase().includes(
          this.state.keyword.toLowerCase()
        );
    });
      
    return (
      <section>
        <h2>Daftar Arsip Catatan</h2>
        <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
        {noteList.length > 0 ? 
        <NoteList notes={noteList} />
        :<p className='notes-list-empty'>Tidak ada catatan</p>
      }
      </section>
    )
  }
}

ArchivePage.propTypes = {
  defaultKeyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};
 
export default ArchivePageWrapper;
