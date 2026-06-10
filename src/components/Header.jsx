import { useState } from 'react';
import { APP_LOGO } from '../utilities/mockData';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utilities/useOnlineStatus';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const status = useOnlineStatus();
  return (
    <div className='header-div'>
      <div className='logo'>
        <img src={APP_LOGO} alt='logo' />
      </div>
      <div className='nav-tags'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About Us</Link>
          </li>
          <li>
            <Link to='/contact'>Contact Us</Link>
          </li>
          <li>
            <Link to='/cart'>Cart</Link>
          </li>
          <li>{status ? "🟢" : "🔴"}</li>
          <li>
            <button
              className='login-btn'
              type='submit'
              onClick={() => {
                setIsLoggedIn(!isLoggedIn);
              }}
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
