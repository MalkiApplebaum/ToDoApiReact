import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // ייבוא קובץ ה-CSS

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // שינוי מ-mail ל-email
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // מצב לניהול תצוגת הסיסמה
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, {
        userName: username,
        email: email, // שינוי מ-mail ל-email
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*'
        }
      });

      setSuccess('User registered successfully.');
      setError('');

      // Redirect to the login page
      navigate('/');
    } catch (error) {
      setError(error.response?.data || 'Registration failed.');
      setSuccess('');
    }
  };

  return (
    <div className="auth-container">
      <h2>SIGN UP</h2>
      <form onSubmit={handleRegister}>
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
          <label>Email:</label>
          <input
            type="email"
            value={email} // שינוי מ-mail ל-email
            onChange={(e) => setEmail(e.target.value)} // שינוי מ-mail ל-email
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
        {success && <p className="success">{success}</p>}
        <button type="submit" className="btn">SIGN UP</button>
      </form>
    </div>
  );
};

export default Register;
