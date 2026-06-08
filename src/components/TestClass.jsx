import React from 'react';

class TestClass extends React.Component {
  // const
  constructor(props) {
    super(props);
    console.log(this.props.name, 'constructor');
  }

  render() {
    console.log(this.props.name, 'Render');
    return <h1>{this.props.name} Rendered</h1>;
  }
}

export default TestClass;
