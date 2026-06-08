import React from 'react';

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    // state varibale( object)
    this.state = {
      count3: 3,
      count4: 4,
    };
  }

  // render method which return the piece of JSX
  render() {
    const { username } = this.props;
    const { count4 } = this.state;
    return (
      <div className='user-div'>
        <h2>Count3 class : {this.state.count3}</h2>
        <h2>Count4 class : {count4}</h2>
        <h2>Name : {this.props.name}</h2>
        <h3>Location : BLR</h3>
        <h3>Contact : {username}</h3>
      </div>
    );
  }
}

export default UserClass;
