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
import { FiLogOut } from 'react-icons/fi';
import { ThemeProvider } from './contexts/ThemeContext';
import { LocaleProvider } from './contexts/LocaleContexts';
import ToggleTheme from './components/ToggleTheme';
import ToggleLocale from './components/ToggleLocale';

class App extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      authedUser: null,
      initializing: true,
      theme: localStorage.getItem('theme') || 'light',
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', newTheme);
          return {
            theme: newTheme
          };
        });
      },
      localeContext: {
        locale: localStorage.getItem('lang') || 'id',
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale = prevState.localeContext.locale === 'id' ? 'en' : 'id';
            localStorage.setItem('lang', newLocale);
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: newLocale
              }
            }
          });
        }
      }
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
    document.documentElement.setAttribute('data-theme', this.state.theme);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute('data-theme', this.state.theme);
    }
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
        <LocaleProvider value={this.state.localeContext}>
        <ThemeProvider value={this.state}>
        <div className="app-container">
        <header>
        <h1><Link to="/" style={{textDecoration: 'none'}}>
          {this.state.localeContext.locale === 'id' ? 'Aplikasi Catatan Pribadi' : 'Personal Notes Apps'}
          </Link></h1>
        <nav className='navigation'>
        <ul>
          <li>
            <ToggleTheme />
          </li>
          <li>
            <ToggleLocale />
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
      </ThemeProvider>
      </LocaleProvider>
      )
    }

  return (
    <LocaleProvider value={this.state.localeContext}>
    <ThemeProvider value={this.state}>
    <div className="app-container">
      <header>
      <h1><Link to="/" style={{textDecoration: 'none'}}>{this.state.localeContext.locale === 'id' ? 'Aplikasi Catatan Pribadi' : 'Personal Notes Apps'}</Link></h1>
      <nav className='navigation'>
      <ul>
        <li>
          <Link to='/archives' style={{textDecoration:'none'}}>{this.state.localeContext.locale === 'id' ? 'Catatan Arsip' : 'Archived Notes'}</Link>
        </li>
        <li>
          <ToggleTheme />  
        </li>
        <li>
          <ToggleLocale />
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
    </ThemeProvider>
    </LocaleProvider>
  );
  }
}

export default App;
