import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import Alert from '../../components/alert';
import Loader from '../../components/loader';
import TopNav from '../../components/top-nav';
import Filters from '../../components/filters';
import GroupHeading from '../../components/group-heading';
import RepositoryList from '../../components/repository-list';
import RepositoryGrid from '../../components/repository-grid';

import { useAppContext } from '../../context/AppContext';
import { useTrendingRepositories } from '../../hooks/useRepositories';

const FeedContainer: React.FC = () => {
  const { state, updateLanguage, updateViewType, updateDateJump } = useAppContext();
  const { preferences } = state;

  const {
    repositories,
    allRepositories,
    isLoading,
    isFetching,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTrendingRepositories({
    language: preferences.language,
    dateJump: preferences.dateJump,
    token: preferences.options.token,
  });

  const renderTokenWarning = () => {
    return null;
  };

  const renderErrors = () => {
    if (!error) return null;

    let message: React.ReactNode = '';
    switch (error.toLowerCase()) {
      case 'bad credentials':
        message = (
          <span>
            Token is invalid, try <Link to="/options">updating the token</Link> on the options page
          </span>
        );
        break;
      case 'network error':
        message = 'Error trying to connect to GitHub servers';
        break;
      default:
        message = error;
        break;
    }

    return <Alert type="danger">{message}</Alert>;
  };

  const renderAlerts = () => {
    const tokenWarning = renderTokenWarning();
    const errorAlert = renderErrors();

    if (tokenWarning || errorAlert) {
      return (
        <div className="alert-group">
          {tokenWarning}
          {errorAlert}
        </div>
      );
    }

    return null;
  };

  const renderRepositoriesList = () => {
    if (preferences.viewType === 'grid') {
      return (
        <RepositoryGrid
          repositories={repositories}
          dateJump={preferences.dateJump}
        />
      );
    }

    return (
      <RepositoryList
        repositories={repositories}
        dateJump={preferences.dateJump}
      />
    );
  };

  const hasRepositories = repositories.length > 0;

  if (isLoading) {
    return (
      <div className="page-wrap">
        <TopNav />
        <div className="container">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <TopNav />

      {renderAlerts()}

      <div className="container mb-5 pb-4">
        <div className="header-row clearfix">
          {hasRepositories && (
            <GroupHeading
              start={repositories[0].start}
              end={repositories[0].end}
              dateJump={preferences.dateJump}
            />
          )}
          <div className="group-filters">
            {hasRepositories && (
              <Filters
                selectedLanguage={preferences.language}
                selectedViewType={preferences.viewType}
                updateLanguage={updateLanguage}
                updateViewType={updateViewType}
                updateDateJump={updateDateJump}
                selectedDateJump={preferences.dateJump}
              />
            )}
          </div>
        </div>
        <div className="body-row">
          {renderRepositoriesList()}

          {(isFetching || isFetchingNextPage) && <Loader />}

          {!isFetching && hasRepositories && hasNextPage && (
            <button
              className="btn btn-primary shadow load-next-date"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              <i className="fa fa-refresh mr-2"></i>
              Load next {preferences.dateJump}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedContainer; 