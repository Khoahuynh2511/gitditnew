import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import './styles.css';
import Logo from '../icons/logo';
import LanguageFilter from '../filters/language-filter';
import ViewFilter from '../filters/view-filter';
import DateJumpFilter from '../filters/date-jump-filter';

const TopNav: React.FC = () => {
  const { preferences, updateDateJump, updateViewType, updateLanguage } = useAppContext();

  return (
    <nav className="top-nav">
      <div className="container-fluid px-4">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <Link className="logo d-flex align-items-center text-decoration-none hover-lift" to="/">
              <div className="floating">
                <Logo />
              </div>
              <div className="logo-text">
                <h4 className="mb-0 gradient-text">GitDit</h4>
                <p className="mb-0">Khám phá repositories thịnh hành</p>
              </div>
            </Link>
          </div>
          
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="nav-controls d-flex justify-content-end align-items-center gap-3">
              <div className="hover-lift">
                <LanguageFilter
                  selectedLanguage={preferences.language}
                  updateLanguage={updateLanguage}
                />
              </div>
              <div className="hover-lift">
                <ViewFilter
                  selectedViewType={preferences.viewType}
                  updateViewType={updateViewType}
                />
              </div>
              <div className="hover-lift">
                <DateJumpFilter
                  selectedDateJump={preferences.dateJump}
                  updateDateJump={updateDateJump}
                />
              </div>
              
              <Link 
                className="btn btn-secondary hover-lift glass-effect"
                to="/options"
                title="Cài đặt"
              >
                <i className="fa fa-cog me-2"></i>
                Cài đặt
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav; 