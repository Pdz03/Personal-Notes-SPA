import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import AddPage from './pages/AddPage';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import ArchivePageWrapper from './pages/ArchivePage';
import NoteFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { getUserLogged, putAccessToken } from './utils/network-data';
import autoBind from 'auto-bind';
import { FiLogOut } from 'react-icons/fi'

class App extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      authedUser: null,
      initializing: true,
      // localeContext: {
      //   locale: localStorage.getItem('locale') || 'id',
      //   toggleLocale: () => {
      //     this.setState((prevState) => {
      //       const newLocale = prevState.localeContext.locale === 'id' ? 'en' : 'id';
      //       localStorage.setItem('locale', newLocale);
      //       return {
      //         localeContext: {
      //           ...prevState.localeContext,
      //           locale: newLocale
      //         }
      //       }
      //     });
      //   }
      // }
    };

    autoBind(this);
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  async componentDidMount() {
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
        initializing: false
      }
    });
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null
      }
    });
    putAccessToken('');
  }

  render(){
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <div className="app-container">
        <header>
        <h1><Link to="/" style={{textDecoration: 'none'}}>Personal Notes Apps</Link></h1>
        <nav className='navigation'>
        <ul>
          <li>
            <Link to='/archives' style={{textDecoration:'none'}}>Tema</Link>
          </li>
          <li>
            <Link to='/archives' style={{textDecoration:'none'}}>Bahasa</Link>
          </li>
        </ul>
        </nav>
        </header>
        <main>
        <Routes>
            <Route path="/*" element={<LoginPage loginSuccess={this.onLoginSuccess} />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
        </main>
      </div>
      )
    }

  return (
    <div className="app-container">
      <header>
      <h1><Link to="/" style={{textDecoration: 'none'}}>Personal Notes Apps</Link></h1>
      <nav className='navigation'>
      <ul>
        <li>
          <Link to='/archives' style={{textDecoration:'none'}}>Catatan Arsip</Link>
        </li>
        <li>
          <Link to='/archives' style={{textDecoration:'none'}}>Tema</Link>
        </li>
        <li>
          <Link to='/archives' style={{textDecoration:'none'}}>Bahasa</Link>
        </li>
        <li><button onClick={this.onLogout} className='button-logout'><FiLogOut />{this.state.authedUser.name} </button></li>
      </ul>
    </nav>
      </header>
      <main>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/archives" element={<ArchivePageWrapper />} />
          <Route path="/notes/new" element={<AddPage />} />
          <Route path="/notes/:id" element={<DetailPage />} />
      </Routes>
      </main>
    </div>
  );
  }
}

export default App;
