import { useState } from 'react';
import { APP_LOGO } from '../utilities/mockData';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className='header-div'>
      <div className='logo'>
        <img src={APP_LOGO} alt='logo' />
      </div>
      <div className='nav-tags'>
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
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
