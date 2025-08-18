import React from 'react';
import { useUser } from '../../context/user_context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ThemeToggle from '../ui/ThemeToggle';

const Header = () => {
  const { currentUser, setCurrentUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  if (!currentUser) return null;

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <h3 className="app-title">GeekHaven</h3>
        </div>
        
        <div className="header-right">
          <div className="header-controls">
            <ThemeToggle />
            <div className="user-info">
              <span className="user-email">👋 {currentUser}</span>
              <button 
                onClick={handleLogout} 
                className="logout-button"
                type="button"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
