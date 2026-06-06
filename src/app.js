import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Body from './components/Body';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { About } from './components/About.jsx';
import Error from './components/Error.jsx';

const AppLayout = () => {
  return (
    <div className='app'>
      <Header />
      <Body />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
  },
  {
    path: '/about',
    element: <About />,
  },
]);

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<RouterProvider router={appRouter} />);
