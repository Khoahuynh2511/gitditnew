import React from 'react';
import './styles.css';
import Logo from '../icons/logo';

const Launcher: React.FC = () => {
  return (
    <div className="launcher-container d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <div className="launcher-logo mb-3">
          <Logo />
        </div>
        <h1 className="h3 text-dark mb-2">GitHunt</h1>
        <p className="text-muted">Loading trending repositories...</p>
        <div className="spinner-border text-primary mt-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Launcher; 