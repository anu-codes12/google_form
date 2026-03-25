import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Plus, LogOut, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-indigo-600">
            <FileText size={28} />
            FormHub
          </Link>

          <div className="flex gap-4 items-center">
            {user ? (
              <>
                <Link to="/" className="flex items-center gap-2 btn-secondary">
                  <FileText size={18} />
                  My Forms
                </Link>
                <Link to="/create" className="flex items-center gap-2 btn-primary">
                  <Plus size={18} />
                  Create Form
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 btn-secondary bg-red-100 text-red-700 hover:bg-red-200">
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center gap-2 btn-secondary">
                  <LogIn size={18} />
                  Login
                </Link>
                <Link to="/register" className="flex items-center gap-2 btn-primary">
                  <UserPlus size={18} />
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
