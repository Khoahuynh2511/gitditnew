import React from 'react';
import './styles.css';

const Loader: React.FC = () => {
  return (
    <div className="loader-container d-flex justify-content-center align-items-center py-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader; 