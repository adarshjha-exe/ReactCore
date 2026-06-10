import UserClass from './UserClass';
import React from 'react';

class About extends React.Component {
  // constructor
  constructor(props) {
    super(props);
    console.log('parent constructor');
  }

  // componentDidMount
  componentDidMount() {
    console.log('Parent componentDidMount');
  }

  // render
  render() {
    console.log('parent render');
    return (
      <div>
        <h1>Welcome to the About Page</h1>
        <UserClass name={'1st Child'} username={'@adarshjha-exe class'} />
        <UserClass name={'2nd Child'} username={'@elon-exe class'} />
      </div>
    );
  }
}
// Note: Named exports are more useful for utilities/helpers, not for components
export default About;
