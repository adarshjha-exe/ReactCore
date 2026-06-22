import React from 'react';

class TestClass extends React.Component {
  // constructor
  constructor(props) {
    super(props);
    // console.log(this.props.name, 'constructor');
  }

  // componentDidMount
  componentDidMount() {
    // console.log(this.props.name, 'componentDidMount');
  }

  render() {
    // console.log(this.props.name, 'Render');
    return <h1>{this.props.name} Rendered</h1>;
  }
}

export default TestClass;
