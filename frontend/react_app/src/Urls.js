import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';

function PrivateRoute({ isAuthenticated, children }) {
  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/login/" replace />; 
  }
}

function Urls(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login/" element={<Login {...props} />}></Route>
        <Route
          exact
          path="/"
          element={
            <PrivateRoute isAuthenticated={props.isAuthenticated}>
              <Home {...props} />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Urls;
