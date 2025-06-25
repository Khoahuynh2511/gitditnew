import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import TopNav from '../../components/top-nav';
import { useAppContext } from '../../context/AppContext';

const OptionsContainer: React.FC = () => {
  const { state, updateToken } = useAppContext();
  const [tokenInput, setTokenInput] = useState(state.preferences.options.token || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateToken(tokenInput);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="page-wrap">
      <TopNav />
      
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow">
              <div className="card-header">
                <h4 className="mb-0">Options</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSave}>
                  <div className="form-group">
                    <label htmlFor="github-token">
                      GitHub Personal Access Token
                    </label>
                    <input
                      type="text"
                      id="github-token"
                      className="form-control"
                      value={tokenInput}
                      onChange={(e) => setTokenInput(e.target.value)}
                      placeholder="Enter your GitHub token"
                    />
                    <small className="form-text text-muted">
                      This helps avoid rate limiting. The token is stored locally in your browser.
                      <br />
                      <a 
                        href="https://github.com/settings/tokens/new" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Create a new token
                      </a>
                    </small>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/" className="btn btn-secondary">
                      ← Back to Feed
                    </Link>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={isSaved}
                    >
                      {isSaved ? 'Saved!' : 'Save Token'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsContainer;