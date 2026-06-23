import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Body from './components/Body';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Error from './components/Error.jsx';
import Contact from './components/Contact.jsx';
import RestaurantMenu from './components/RestaurantMenu.jsx';
import { lazy, Suspense, useState, useEffect } from 'react';
import UserContext from './utilities/UserContext.js';

// lazy import(import on demand)
const About = lazy(() => import('./components/About.jsx'));
const Groceries = lazy(() => import('./components/Groceries.jsx'));

const AppLayout = () => {
  const [userName, setUserName] = useState(null);

  // API call mock
  useEffect(() => {
    const data = {
      name: 'Adarsh',
    };
    setUserName(data.name);
  }, []);

  return (
    // 1. in context setting the loggedInUser & state variable function as well
    <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
      // Inside the app : "Adarsh"
      <div className='app'>
        // Inside header : "Elon Musk"
        <Header />
        <Outlet />
      </div>
    </UserContext.Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Body />,
      },
      {
        path: '/about',
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/groceries',
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Groceries />
          </Suspense>
        ),
      },
      {
        path: '/restaurant/:id',
        element: <RestaurantMenu />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<RouterProvider router={appRouter} />);
