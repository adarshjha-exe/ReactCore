import React from 'react';

class UserClass extends React.Component {
  // render method which return the piece of JSX
  render() {
    return (
      <div className='user-div'>
        <h2>Name : Adarsh</h2>
        <h3>Location : BLR</h3>
        <h3>Contact : @adarshjha-exe</h3>
      </div>
    );
  }
}

export default UserClass;
