import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div>
      <nav className="nav-container">
        <Link to="/homePage" className="nav-btn">TASKS</Link>
        <Link to="/" className="nav-btn">SIGN IN</Link>
        <Link to="/signup" className="nav-btn">SIGN UP</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Login />} /> {/* דף הבית */}
          <Route path="/homePage" element={<HomePage />} /> {/* דף התחברות */}
          <Route path="/signup" element={<Register />} /> {/* דף הרשמה */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;