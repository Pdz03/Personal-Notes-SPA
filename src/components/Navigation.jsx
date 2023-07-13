import React from 'react';
import { Link } from 'react-router-dom';
import { getUserLogged, putAccessToken } from '../utils/network-data';
import autoBind from 'auto-bind';
import { FiLogOut } from 'react-icons/fi'

// function Navigation({ logout, name }) {
//   return (
//     <nav className="navigation">
//     <ul>
//     <li>Tema</li>
//     <li>Bahasa</li>
//       <li>{name}<button onClick={logout}> <FiLogOut /></button></li>
//     </ul>
//   </nav>
//   );
// }
 
class Navigation extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      authedUser: null,
      initializing: true,
      localeContext: {
        locale: localStorage.getItem('locale') || 'id',
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale = prevState.localeContext.locale === 'id' ? 'en' : 'id';
            localStorage.setItem('locale', newLocale);
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
      )
    }

  return (
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
        <li>{this.state.authedUser.name} <button onClick={this.onLogout}> <FiLogOut /></button></li>
      </ul>
    </nav>
  );
  }
}
 
export default Navigation;
