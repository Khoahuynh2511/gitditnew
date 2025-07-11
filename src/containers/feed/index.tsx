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
import { useTrendingRepositories, useSearchRepositories } from '../../hooks/useRepositories';

const FeedContainer: React.FC = () => {
  const { 
    state, 
    updateLanguage, 
    updateViewType, 
    updateDateJump, 
    searchQuery, 
    isSearchMode,
    clearSearch 
  } = useAppContext();
  const { preferences } = state;

  const trendingQuery = useTrendingRepositories({
    language: preferences.language,
    dateJump: preferences.dateJump,
    token: preferences.options.token,
  });

  const searchQuery_ = useSearchRepositories({
    query: searchQuery,
    token: preferences.options.token,
    enabled: isSearchMode,
  });

  // Transform search results to match trending format
  const repositories = isSearchMode 
    ? searchQuery_.data?.pages.map((page, index) => ({
        start: '',
        end: '',
        data: page
      })) || []
    : trendingQuery.repositories || [];

  const allRepositories = isSearchMode
    ? searchQuery_.data?.pages.flatMap(page => page.items) || []
    : trendingQuery.allRepositories || [];

  const activeQuery = isSearchMode ? searchQuery_ : trendingQuery;

  const renderTokenWarning = () => {
    return null;
  };

  const renderErrors = () => {
    if (!activeQuery.error) return null;

    let message: React.ReactNode = '';
    const errorMessage = typeof activeQuery.error === 'string' 
      ? activeQuery.error 
      : activeQuery.error.message;

    switch (errorMessage.toLowerCase()) {
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
        message = errorMessage;
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

  const renderSearchHeader = () => {
    if (!isSearchMode) return null;

    return (
      <div className="search-header mb-4">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h5 className="mb-1">
              Kết quả tìm kiếm cho: "<span className="text-primary">{searchQuery}</span>"
            </h5>
            <p className="mb-0 text-muted">
              {allRepositories.length > 0 && `Tìm thấy ${allRepositories.length} repositories`}
            </p>
          </div>
          <button
            className="btn btn-outline-secondary"
            onClick={clearSearch}
          >
            <i className="fa fa-arrow-left me-2"></i>
            Quay lại trending
          </button>
        </div>
      </div>
    );
  };

  const hasRepositories = repositories.length > 0;

  if (activeQuery.isLoading) {
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
          {renderSearchHeader()}
          
          {!isSearchMode && hasRepositories && (
            <GroupHeading
              start={repositories[0].start}
              end={repositories[0].end}
              dateJump={preferences.dateJump}
            />
          )}
          <div className="group-filters">
            {!isSearchMode && hasRepositories && (
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

          {(activeQuery.isFetching || activeQuery.isFetchingNextPage) && <Loader />}

          {!activeQuery.isFetching && hasRepositories && activeQuery.hasNextPage && (
            <button
              className="btn btn-primary shadow load-next-date"
              onClick={() => activeQuery.fetchNextPage()}
              disabled={activeQuery.isFetchingNextPage}
            >
              <i className="fa fa-refresh mr-2"></i>
              {isSearchMode ? 'Load more results' : `Load next ${preferences.dateJump}`}
            </button>
          )}

          {!activeQuery.isLoading && !hasRepositories && isSearchMode && (
            <div className="text-center py-5">
              <i className="fa fa-search fa-3x text-muted mb-3"></i>
              <h5 className="text-muted">Không tìm thấy repositories nào</h5>
              <p className="text-muted">Thử tìm kiếm với từ khóa khác</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedContainer; 