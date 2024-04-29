import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Login from './pages/login';

import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<div><Link to="/">Home</Link> <Link to="/about">About</Link> <Link to="/news">News</Link>
            <br /> <Link to="/login">Login</Link>  </div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<div>About</div>} />
          <Route path="/news" element={<div>News</div>} />
        </Routes>
      </div>
    </BrowserRouter>);
}

export default App;
