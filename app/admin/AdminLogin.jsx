'use client';

import { useState } from 'react';
import  supabase  from '@/lib/supabaseClient';
export default function AdminLogin( { onLogin }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!credentials.email || !credentials.password) {
      setError('Please fill in all fields');
      return;
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password
    });

    // If using Supabase, you might want to check the user role or other details
    // For example, you can check if the user has an 'admin' role in your database
    if (data.user && data.user.role !== 'admin') {
      setError('You do not have permission to access this area');
    }
    // Handle the response from Supabase
    // If the login was successful, redirect or perform any other action
    if (data.user && data.user.role === 'admin') {
      onLogin();
    }

    // if (error || !data) {
    //   setError('Invalid email, username or password');
    // } else {
    //   onLogin();
    // }

    // Reset the loading state
    setIsLoading(false);
  };

  // Create an async function to handle admin login:
  // 1. Prevent the default form submission behavior.
  // 2. Validate the input fields.
  // 3. sign in using supabase with email and password.
  // 4. show error if login fails or user is not an admin/found.
  // 5. Check if the user's role in user data is 'admin'.
  // 6. Show error if role is not 'admin'.
  // 7. If everything is valid, call onLogin function to proceed with the admin dashboard access and stop loading state.

  // This function will handle the form submission for the admin login
  // It will validate the input fields, check the credentials, and call the onLogin function
  // if the login is successful
 
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (!onLogin) {
      throw new Error('onLogin function is required');
    }
    if (isLoading) return;
    if (error) {
      setError('');
    }
    if (credentials.email === '' || credentials.password === '') {
      setError('Please fill in all fields');
      return;
    } else if (credentials.email !== 'admin@admin.com') {
      setError('Invalid email or password');
      return;
    } else if (credentials.password !== 'Admin@123') {
      setError('Invalid email or password');
      return;
    }
    try{
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });
      if (error) {
        setError('Invalid email or password', error.message);
        setIsLoading(false);
        return;
      }
      // If the login is successful, call the onLogin function
      onLogin();
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login. Please try again later.');
      setIsLoading(false);
      return;
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="admin-login">
      <div className="admin-login-panel">
        <div className="admin-login-heading">
            <div className="admin-login-mark">
              <i className="ri-shield-user-line"></i>
            </div>
            <p className="admin-eyebrow">Operations access</p>
            <h2>Admin sign in</h2>
            <p>Manage shipments and customer records.</p>
          </div>

          {error && (
            <div className="admin-login-error">
              <div className="flex items-center">
                <i className="ri-error-warning-line"></i>
                {error}
              </div>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="admin-login-form">
            <div>
              <label htmlFor="admin-email">Email address</label>
              <input
                id="admin-email"
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
                required
                autoComplete="username"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label htmlFor="admin-password">Password</label>
              <input
                id="admin-password"
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                required
                autoComplete="current-password"
                placeholder="Enter password"
              />
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <i className="ri-loader-4-line animate-spin"></i>
                  Signing In...
                </div>
              ) : (
                <><span>Sign in</span><i className="ri-arrow-right-line" /></>
              )}
            </button>
          </form>
      </div>
    </div>
  );
}