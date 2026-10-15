import React from 'react';
import { useAdmin } from '../context/AdminContext';
import { AdminLogin } from '../admin/AdminLogin';
import { AdminLayout } from '../admin/AdminLayout';

interface AdminPanelProps {
  onBackToHome: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBackToHome }) => {
  const { isAdminLoggedIn } = useAdmin();

  if (!isAdminLoggedIn) {
    return <AdminLogin onBackToWebsite={onBackToHome} />;
  }

  return <AdminLayout onBackToWebsite={onBackToHome} />;
};
