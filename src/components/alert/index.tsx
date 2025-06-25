import React, { ReactNode } from 'react';

interface AlertProps {
  type: 'warning' | 'danger' | 'success' | 'info';
  children: ReactNode;
}

const Alert: React.FC<AlertProps> = ({ type, children }) => {
  return (
    <div className={`alert alert-${type}`} role="alert">
      {children}
    </div>
  );
};

export default Alert; 