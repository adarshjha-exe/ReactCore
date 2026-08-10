import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Body from './components/Body';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Error from './components/Error.jsx';
import Contact from './components/Contact.jsx';
import RestaurantMenu from './components/RestaurantMenu.jsx';
import { lazy, Suspense, useState, useEffect } from 'react';
import UserContext from './utilities/UserContext.js';
import { Provider } from 'react-redux';
import appStore from './utilities/appStore.js';
import Cart from './components/Cart.jsx';

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
    // 2. Provided the store to the application, store props is important
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div className='app'>
          <Header />
          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
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
      {
        path: '/cart',
        element: <Cart />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<RouterProvider router={appRouter} />);
