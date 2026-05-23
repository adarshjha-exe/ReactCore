import React from 'react';
import ReactDOM from 'react-dom/client';

const Header = () => (
  <div className='header-div'>
    <div className='logo'>
      <img
        src='https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg'
        alt='logo'
      />
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

const AppLayout = () => {
  return (
    <div className='app'>
      <Header />
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<AppLayout />);
