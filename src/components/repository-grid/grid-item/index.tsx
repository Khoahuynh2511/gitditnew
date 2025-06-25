import React from 'react';
import GithubColors from 'github-colors';
import moment from 'moment';

import './styles.css';
import Star from '../../icons/star';
import Fork from '../../icons/fork';
import Issue from '../../icons/issue';
import { Repository } from '../../../types';

interface GridItemProps {
  repository: Repository;
}

const GridItem: React.FC<GridItemProps> = ({ repository }) => {
  const languageColor = repository.language ? GithubColors.get(repository.language) : null;

  return (
    <div className="col-lg-4 col-md-6 col-12 mb-4">
      <div className="card grid-item h-100">
        <div className="card-body d-flex flex-column">
          <div className="repo-header mb-2">
            <h5 className="card-title">
              <a href={repository.html_url} rel="noopener noreferrer" target="_blank">
                <span className="text-muted">{repository.owner.login} / </span>
                {repository.name}
              </a>
            </h5>
            <p className="card-text text-muted small">
              {moment(repository.created_at).format('MMMM D, YYYY')}
            </p>
          </div>
          
          <div className="repo-body flex-grow-1 mb-3">
            <p className="card-text">
              {repository.description || 'No description given.'}
            </p>
          </div>
          
          <div className="repo-footer mt-auto">
            <div className="d-flex justify-content-between align-items-center mb-2">
              {repository.language && (
                <span className="d-inline-flex align-items-center">
                  <span 
                    className="repo-language-color me-1" 
                    style={{
                      backgroundColor: languageColor ? languageColor.color : '#e8e8e8'
                    }}>
                  </span>
                  <small>{repository.language}</small>
                </span>
              )}
            </div>
            
            <div className="d-flex justify-content-between">
              <a className="text-muted text-decoration-none d-flex align-items-center"
                 href={`${repository.html_url}/stargazers`}
                 rel="noopener noreferrer"
                 target="_blank">
                <Star />
                <small className="ms-1">{repository.stargazers_count.toLocaleString()}</small>
              </a>
              
              <a className="text-muted text-decoration-none d-flex align-items-center"
                 href={`${repository.html_url}/network/members`}
                 rel="noopener noreferrer"
                 target="_blank">
                <Fork />
                <small className="ms-1">{repository.forks ? repository.forks.toLocaleString() : 0}</small>
              </a>
              
              <a className="text-muted text-decoration-none d-flex align-items-center"
                 href={`${repository.html_url}/issues`}
                 rel="noopener noreferrer"
                 target="_blank">
                <Issue />
                <small className="ms-1">{repository.open_issues ? repository.open_issues.toLocaleString() : 0}</small>
              </a>
            </div>
          </div>
        </div>
        
        <div className="card-footer bg-transparent border-0 pt-0">
          <div className="d-flex align-items-center">
            <img 
              className="rounded-circle me-2" 
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
              width="20"
              height="20"
              onError={(e) => {
                e.currentTarget.src = '/img/logo.svg';
              }}
            />
            <small className="text-muted">
              <a href={repository.owner.html_url} target="_blank" rel="noopener noreferrer">
                {repository.owner.login}
              </a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridItem; 