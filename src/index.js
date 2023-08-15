import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import keys from "./apiKey";
import Engine from "./Engine"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";


const lat = 40.741895;
const lon = -73.989308;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App lat={lat} lon={lon}/>
    ),
  },
  {
    path: "about",
    element: (
      <div>
        <h1>HIIIII!</h1>
      </div>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);







// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
