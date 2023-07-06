import React from 'react';
import NoteList from '../components/NoteList';
import { useSearchParams } from 'react-router-dom';
import { getActiveNotes } from '../utils/local-data';
import SearchBar from '../components/SearchBar';
import AddButton from '../components/AddButton';
import PropTypes from 'prop-types';

function HomePageWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword') || '';
    function changeSearchParams(keyword) {
      setSearchParams({ keyword });
    }
   
    return <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  }
 
class HomePage extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
        notes: getActiveNotes(),
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
        <h2>Daftar Catatan Aktif</h2>
        <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
        {noteList.length > 0 ? 
        <NoteList notes={noteList} />
        :<p className='notes-list-empty'>Tidak ada catatan</p>
      }
      <div className='homepage__action'>
      <AddButton />
      </div>
      </section>
    )
  }
}

HomePage.propTypes = {
  defaultKeyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};
 
export default HomePageWrapper;
