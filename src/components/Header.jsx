import { useContext, useState } from 'react';
import { APP_LOGO } from '../utilities/mockData';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utilities/useOnlineStatus';
import UserContext from '../utilities/UserContext.js';
import { useSelector } from 'react-redux';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const status = useOnlineStatus();

  const { loggedInUser } = useContext(UserContext);

  // subscribing to the store using hook useSelector
  const cartItems = useSelector((store) => store.cart.items); // store → just a parameter name (can be anything)|| store.cart → accesses the cart slice of the Redux state || store.cart.items → accesses the items inside that slice

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
            <Link to='/groceries'> Groceries</Link>
          </li>
          <li>
            <Link to='/cart'>CartItems - {`(${cartItems.length})`}</Link>
          </li>
          <li>{status ? '🟢' : '🔴'}</li>
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
          <li>{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
