import React from 'react';
import ReactDOM from 'react-dom/client';

const heading = React.createElement('div', { id: 'parent' }, [
  React.createElement('h1', { id: 'heading-1', key: '1' }, 'Heading 1'),
  React.createElement('h2', { id: 'heading-2', key: '2' }, 'Heading 2'),
]);

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(heading);
