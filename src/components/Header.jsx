import { APP_LOGO } from '../utilities/mockData';

const Header = () => (
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
      </ul>
    </div>
  </div>
);

export default Header;
