import React from 'react';
import moment from 'moment';
import './styles.css';

interface GroupHeadingProps {
  start: string;
  end: string;
  dateJump: 'day' | 'week' | 'month';
}

const GroupHeading: React.FC<GroupHeadingProps> = ({ start, end, dateJump }) => {
  const formatDate = (date: string) => {
    return moment(date).format('MMM D, YYYY');
  };

  const getDateRangeText = () => {
    const startFormatted = formatDate(start);
    const endFormatted = formatDate(end);
    
    if (dateJump === 'day') {
      return startFormatted;
    }
    
    return `${startFormatted} - ${endFormatted}`;
  };

  return (
    <div className="group-heading">
      <h2 className="h4 mb-0 text-dark">
        Trending repositories for {getDateRangeText()}
      </h2>
    </div>
  );
};

export default GroupHeading; 