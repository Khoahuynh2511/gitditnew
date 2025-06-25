import React from 'react';
import GithubColors from 'github-colors';

import './styles.css';
import moment from 'moment';
import Star from '../../icons/star';
import Fork from '../../icons/fork';
import Issue from "../../icons/issue";
import { Repository } from '../../../types';

interface ListItemProps {
  repository: Repository;
}

const ListItem: React.FC<ListItemProps> = ({ repository }) => {
  const languageColor = repository.language ? GithubColors.get(repository.language) : undefined;

  return (
    <div className="col-12 list-item-container">
      <div className="list-item-body">
        <div className="repo-header">
          <h3>
            <a href={repository.html_url} rel="noopener noreferrer" target="_blank">
              <span className="text-normal">{repository.owner.login} / </span>
              {repository.name}
            </a>
          </h3>
          <p className="repo-meta text-muted small">
            Built by &middot; <a href={repository.owner.html_url} rel="noopener noreferrer" target="_blank">{repository.owner.login}</a> &middot; {moment(repository.created_at).format('MMMM D YYYY')}
          </p>
        </div>
        <div className="repo-body">
          <p>{repository.description || 'No description given.'}</p>
        </div>
        <div className="repo-footer">
          {repository.language && (
            <span className="d-inline-flex align-items-center mr-3">
              <span className="repo-language-color" style={{
                backgroundColor: languageColor ? languageColor.color : '#e8e8e8'
              }}></span>
              <span itemProp="programmingLanguage">
                {repository.language}
              </span>
            </span>
          )}
          <a className="muted-link d-inline-block mr-3"
             href={`${repository.html_url}/stargazers`}
             rel="noopener noreferrer"
             target="_blank">
            <Star />
            {repository.stargazers_count.toLocaleString()}
          </a>
          <a className="muted-link d-inline-block mr-3"
             href={`${repository.html_url}/network/members`}
             rel="noopener noreferrer"
             target="_blank">
            <Fork />
            {repository.forks ? repository.forks.toLocaleString() : 0}
          </a>
          <a className="muted-link d-inline-block mr-3"
             href={`${repository.html_url}/issues`}
             rel="noopener noreferrer"
             target="_blank">
            <Issue />
            {repository.open_issues ? repository.open_issues.toLocaleString() : 0}
          </a>
        </div>
      </div>

      <a href={repository.owner.html_url}
         target="_blank"
         rel="noopener noreferrer"
         className="author-link d-none d-lg-block d-xl-block d-md-block">
        <img className='author-img'
             src={repository.owner.avatar_url}
             onError={(e) => {
               e.currentTarget.src = '/img/logo.svg';
             }}
             alt={repository.owner.login} />
      </a>
    </div>
  );
};

export default ListItem; 