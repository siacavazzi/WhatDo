import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './Main';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ProfilePage } from './ProfilePage';
import CreateProfile from "./CreateProfile"
import { getProfileLoader } from './loaders';
import AboutPage from "./AboutPage";
import SavedLocations from './SavedLocationsPage';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    loader: getProfileLoader,
    children: [
      {
        index: true,
        element: <Main/>,
      },
      {
        path: "profile",
        element: <ProfilePage/>
      },
      {
        path: "new-profile",
        element: <CreateProfile/>
      },
      {
        path: "about",
        element: <AboutPage/>
      },
      {
        path:"saved-locs",
        element:<SavedLocations/>
      }
    ]
  },
])
  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);







// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
