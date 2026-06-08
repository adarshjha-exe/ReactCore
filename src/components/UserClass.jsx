import React from 'react';

class UserClass extends React.Component {
  constructor(props) {
    super(props);
  }

  // render method which return the piece of JSX
  render() {
    const { username } = this.props;
    return (
      <div className='user-div'>
        <h2>Name : {this.props.name}</h2>
        <h3>Location : BLR</h3>
        <h3>Contact : {username}</h3>
      </div>
    );
  }
}

export default UserClass;
