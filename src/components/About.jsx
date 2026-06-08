import UserClass from './UserClass';
import React from 'react';

class About extends React.Component {
  // constructor
  constructor(props) {
    super(props);
    console.log('parent constructor');
  }

  // render
  render() {
    console.log('parent render');
    return (
      <div>
        <h1>Welcome to the About Page</h1>
        <UserClass
          name={'Adarsh Jha Class'}
          username={'@adarshjha-exe class'}
        />
      </div>
    );
  }
}

// Named import in Class comp
export { About };
