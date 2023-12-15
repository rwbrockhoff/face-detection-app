import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Search from './containers/Search/Search';
import Register from './containers/Register/Register';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Search />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
  { path: 'register', element: <Search /> },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
