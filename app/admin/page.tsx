'use client';

import { useState, useEffect,useCallback } from 'react';
import Link from 'next/link';
import AdminLogin from './AdminLogin.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import  supabase  from '@/lib/supabaseClient.js';
import brand from '@/public/assets/logo.png';
import Image from 'next/image.js';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is already authenticated
    const checkAuth = async () => {
      // Simulate an authentication check
      // In a real application, you would replace this with an actual API call to check authentication
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error fetching session:', error);
        setIsAuthenticated(false);
        return;
      }

      if(!data.session) {
        console.log('No active session found');
        setIsAuthenticated(false);
        return;
      }

      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error('Error fetching user data:', userError);
        setIsAuthenticated(false);
        return;
      }
  }
  checkAuth();
  }, []);


  // Function to handle login
  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  // Function to handle logout
  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  // Render the admin page

  return (
    <main className="admin-shell min-h-screen">
      <header className="admin-header">
        <div className="admin-header-inner">
          <Link href="/" className="admin-brand">
            <span className="admin-brand-mark">
              <Image src={brand} alt="Veltraxis Logistics" fill priority sizes="56px" />
            </span>
            <span className="admin-brand-copy">
              <strong>Veltraxis Logistics</strong>
              <small>Driven by Speed. Defined by Trust.</small>
            </span>
          </Link>
          <div className="admin-header-actions">
            <span className="admin-portal-label"><i className="ri-shield-user-line" /> Admin Portal</span>
            <Link href="/" className="admin-home-link"><i className="ri-arrow-left-line" /> <span>Back to site</span></Link>
          </div>
        </div>
      </header>

      {!isAuthenticated ? (
        <AdminLogin onLogin={handleLogin} />
      ) : (
        <AdminDashboard onLogout={handleLogout} />
      )}
    </main>
  );
}