import React, { useState } from 'react';
import { Typography, TextField, Button, Box, Alert } from '@mui/material';

const AuthModal = ({ onEmailLogin, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    onEmailLogin(email, password);
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        {/* <img
          src="/icon.png"
          alt="Audio to Text"
          className="modal-logo"
        /> */}
        <Typography variant="h4" component="h2" sx={{ mb: 1, fontWeight: 600 }}>
          Welcome to Audix
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Sign in to continue to the converter interface
        </Typography>
      </div>
      
      <form onSubmit={handleSubmit} className="login-form">
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
          className="modern-textfield"
        />
        
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          sx={{ mb: 3 }}
          className="modern-textfield"
        />
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          className="login-button"
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  );
};

export default AuthModal; 