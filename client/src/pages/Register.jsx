import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SuccessModal from '../components/SuccessModal'; // 1. Import the component
import '../styles/Register.css'; 

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [error, setError] = useState('');
  
  // 2. New State for the Modal
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  const navigate = useNavigate();

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            firstName, 
            lastName, 
            email, 
            password,
            type: 'user', 
            isActive: true 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 3. Instead of alert(), show the modal and wait before redirecting
        setShowSuccessPopup(true);
        setTimeout(() => {
             navigate('/login');
        }, 2000); // 2 second delay so they can read the message
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Unable to connect to the server.');
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <div className="register-header">
            <h2>Start Your Story</h2>
            <p>Join our community to archive and share your journey.</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={onSubmit} className="register-form">
          
          <div className="name-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={onChange}
                  required
                />
              </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="reader@example.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Create a password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              placeholder="Confirm password"
              required
            />
          </div>

          <button type="submit" className="submit-btn">Create Account</button>
        </form>

        <div className="register-footer">
            <p>Already have an account? <Link to="/login">Sign In</Link></p>
        </div>
      </div>

      {/* 4. Render the SuccessModal */}
      <SuccessModal 
        isOpen={showSuccessPopup} 
        title="Welcome!" 
        message="Your account has been successfully created." 
        subMessage="Redirecting to login..." 
      />
    </div>
  );
};

export default Register;