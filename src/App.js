import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link ,useNavigate} from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';

function App() {

  const navigate = useNavigate();

  const handleLogout = () => {
    // מחיקת הטוקן מ-sessionStorage
    sessionStorage.removeItem('token');
    // הפניה לדף ההתחברות
    navigate('/');
  };

  return (
      <div>
      <nav className="nav-container">
        <Link to="/homePage" className="nav-btn">TASKS</Link>
        <Link to="/" className="nav-btn">SIGN IN</Link>
        <Link to="/signup" className="nav-btn">SIGN UP</Link>
        <button onClick={handleLogout} className="nav-btn">LOGOUT</button>

        </nav>

        <Routes>
          <Route path="/" element={<Login />} /> {/* דף הבית */}
          <Route path="/homePage" element={<HomePage />} /> {/* דף התחברות */}
          <Route path="/signup" element={<Register />} /> {/* דף הרשמה */}
        </Routes>
      </div>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
