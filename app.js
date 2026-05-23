import React from 'react';
import ReactDOM from 'react-dom/client';

// 1. Create a Nested header Element using React.createElement
const headingReactElement = React.createElement('div', { className: 'title' }, [
  React.createElement('h1', { key: '1' }, 'This is heading 1'),
  React.createElement('h2', { key: '2' }, 'This is Heading 2'),
  React.createElement('h3', { key: '3' }, 'This is heading 3'),
]);

console.log(headingReactElement); // object

// 2. Create the same element using JSX
const JSXElem = (
  <div className='title' random='random-d'>
    <h1>This is Heading 1 from JSX</h1>
    <h2>This is Heading 2 from JSX</h2>
    <h3>This is Heading 3 from JSX</h3>
  </div>
);

console.log(JSXElem); // object

// 3. Create a functional component(return JSX) of the same with JSX
const BodyComp = () => {
  return (
    <div>
      <h1>This is Heading 1 from functional comp</h1>
      <h2>This is Heading 2 from functional comp</h2>
      <h3>This is Heading 3 from functional comp</h3>
    </div>
  );
};
console.log(typeof BodyComp); // function

// 3.1 function comp
const HeadComponent = () => (
  <div id='parent' className='cls-parent'>
    <h1>This is Head Component</h1>
    <BodyComp />
  </div>
);

//4. react element inside the component
const spanElemJSX = (
  <div className='parent'>
    <span>This is span</span>
  </div>
);

const Footer = () => (
  <div className='footer'>
    {spanElemJSX}
    {`: 3 + 4`}
    {console.log('Js inside function comp using {}')}
    <h3>This is footer</h3>
    // three ways to use the func comp
    <HeadComponent />
    {HeadComponent()}
    <HeadComponent></HeadComponent>
  </div>
);

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<Footer />);
