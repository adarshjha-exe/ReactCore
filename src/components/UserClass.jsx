import React from 'react';
import TestClass from './TestClass';

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    // state variable( object)
    this.state = {
      count3: 3,
      count4: 4,
    };
    console.log(this.props.name, 'constructor');
  }

  // render method which return the piece of JSX
  render() {
    console.log(this.props.name, 'render');
    const { username } = this.props;
    const { count4 } = this.state;

    // update the state variable
    return (
      <div className='user-div'>
        <h2>Count4 class : {count4}</h2>
        <button
          onClick={() => {
            this.setState({
              count4: this.state.count4 + 1,
              count3: this.state.count3 + 1,
            });
          }}
        >
          Increase Count
        </button>
        <h2>Name : {this.props.name}</h2>
        <h3>Location : BLR</h3>
        <h3>Contact : {username}</h3>
        <TestClass name={'GrandChild'} />
      </div>
    );
  }
}

export default UserClass;
