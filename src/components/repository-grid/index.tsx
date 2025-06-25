import React from 'react';
import './styles.css';
import GridItem from './grid-item';
import { RepositoryGroup } from '../../types';

interface RepositoryGridProps {
  repositories: RepositoryGroup[];
  dateJump: 'day' | 'week' | 'month';
}

const RepositoryGrid: React.FC<RepositoryGridProps> = ({ repositories, dateJump }) => {
  return (
    <div className="repository-grid">
      <div className="row">
        {repositories.map((group, index) => (
          <React.Fragment key={`${group.start}-${group.end}-${index}`}>
            {group.data.items.map((repository) => (
              <GridItem
                key={repository.id}
                repository={repository}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RepositoryGrid; 