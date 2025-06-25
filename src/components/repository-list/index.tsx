import React from 'react';
import './styles.css';
import ListItem from './list-item';
import { RepositoryGroup } from '../../types';

interface RepositoryListProps {
  repositories: RepositoryGroup[];
  dateJump: 'day' | 'week' | 'month';
}

const RepositoryList: React.FC<RepositoryListProps> = ({ repositories, dateJump }) => {
  return (
    <div className="repository-list">
      {repositories.map((group, index) => (
        <div key={`${group.start}-${group.end}-${index}`} className="repository-group">
          {group.data.items.map((repository) => (
            <ListItem
              key={repository.id}
              repository={repository}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default RepositoryList; 