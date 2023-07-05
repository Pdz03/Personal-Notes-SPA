import React from 'react';
import NoteList from '../components/NoteList';
import { useSearchParams } from 'react-router-dom';
import { getAllNotes } from '../utils/local-data';
// import SearchBar from '../components/SearchBar';

// function HomePageWrapper() {
//     const [searchParams, setSearchParams] = useSearchParams();
//     const keyword = searchParams.get('keyword');
//     function changeSearchParams(keyword) {
//       setSearchParams({ keyword });
//     }
   
//     return <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
//   }
 
class HomePage extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
        notes: getAllNotes(),
        keyword: props.defaultKeyword || '',
      }
 
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    // this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }
 
  onDeleteHandler(id) {
    deleteContact(id);
 
    // update the contact state from data.js
    this.setState(() => {
      return {
        notes: getAllNotes(),
      }
    });
  }

  // onKeywordChangeHandler(keyword) {
  //   this.setState(() => {
  //     return {
  //       keyword,
  //     }
  //   });

  //   this.props.keywordChange(keyword);
  // }
 
  render() {
    // const contacts = this.state.notes.filter((note) => {
    //     return note.name.toLowerCase().includes(
    //       this.state.keyword.toLowerCase()
    //     );
    //   });
      
    return (
      <section>
        {/* <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} /> */}
        <h2>Daftar Catatan Aktif</h2>
        <NoteList notes={this.state.notes} onDelete={this.onDeleteHandler} />
      </section>
    )
  }
}
 
export default HomePage;