import React from 'react';
import './styles.css';

interface FiltersProps {
  selectedLanguage: string;
  selectedViewType: 'list' | 'grid';
  selectedDateJump: 'day' | 'week' | 'month';
  updateLanguage: (language: string) => void;
  updateViewType: (viewType: 'list' | 'grid') => void;
  updateDateJump: (dateJump: 'day' | 'week' | 'month') => void;
}

const Filters: React.FC<FiltersProps> = ({
  selectedLanguage,
  selectedViewType,
  selectedDateJump,
  updateLanguage,
  updateViewType,
  updateDateJump,
}) => {
  // Filters đã được đưa lên TopNav, không cần hiển thị ở đây nữa
  return null;
};

export default Filters; 