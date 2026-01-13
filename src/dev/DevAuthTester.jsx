import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useApp } from '@/context/AppContext';

// Development helper to simulate admin and non-admin logins quickly
export default function DevAuthTester() {
  if (process.env.NODE_ENV === 'production') return null;
  const { login, logout } = useApp();
  const navigate = useNavigate();

  const doAdmin = () => {
    login({ user: { id: '1', fullname: 'Admin User', email: 'admin@dev', role: 'admin' }, token: 'dev-admin-token' });
    navigate('/admin');
  };

  const doUser = () => {
    login({ user: { id: '2', fullname: 'Regular User', email: 'user@dev', role: 'user' }, token: 'dev-user-token' });
    navigate('/');
  };

  // Dev-only helpers should not embed real tokens.

  const doLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Dev Auth Tester</h2>
      <div className="space-x-3">
        <Button type="primary" onClick={doAdmin}>Login as Admin</Button>
        <Button onClick={doUser}>Login as User</Button>
        <Button danger onClick={doLogout}>Logout</Button>
      </div>
      <p className="text-sm text-gray-500 mt-3">This is a dev-only helper. Tokens here are fake — use only for UI testing.</p>
    </div>
  );
}
