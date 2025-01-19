import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // ייבוא קובץ ה-CSS

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // מצב לניהול תצוגת הסיסמה
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        username,
        password,
      });
      // Save the JWT token in sessionStorage
      sessionStorage.setItem('token', response.data.token);
      // Redirect to the homepage
      navigate('/homePage');
    } catch (error) {
      if (error.response) {
        navigate('/signup');
      } else {
        setError('Invalid username or password.');
      }    }
  };

  return (
    <div className="auth-container">
      <h2>SIGN IN</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
        <label>Password:</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"} // שינוי סוג השדה בהתאם למצב
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"} {/* אייקון עין */}
            </button>
          </div>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn">SIGN IN</button>
      </form>
      <p>Don't have an account? <a href="/signup">SIGN UP</a></p>
    </div>
  );
};

export default Login;
