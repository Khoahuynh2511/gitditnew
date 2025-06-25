import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppPreferences } from '../types';

type Action =
  | { type: 'UPDATE_LANGUAGE'; payload: string }
  | { type: 'UPDATE_DATE_JUMP'; payload: 'day' | 'week' | 'month' }
  | { type: 'UPDATE_VIEW_TYPE'; payload: 'list' | 'grid' }
  | { type: 'UPDATE_TOKEN'; payload: string };

interface AppState {
  preferences: AppPreferences;
}

const initialState: AppState = {
  preferences: {
    language: 'javascript',
    dateJump: 'day',
    viewType: 'grid',
    options: {
      token: '',
    },
  },
};

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'UPDATE_LANGUAGE':
      return {
        ...state,
        preferences: { ...state.preferences, language: action.payload },
      };
    case 'UPDATE_DATE_JUMP':
      return {
        ...state,
        preferences: { ...state.preferences, dateJump: action.payload },
      };
    case 'UPDATE_VIEW_TYPE':
      return {
        ...state,
        preferences: { ...state.preferences, viewType: action.payload },
      };
    case 'UPDATE_TOKEN':
      return {
        ...state,
        preferences: { 
          ...state.preferences, 
          options: { ...state.preferences.options, token: action.payload }
        },
      };
    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  preferences: AppPreferences;
  updateLanguage: (language: string) => void;
  updateDateJump: (dateJump: 'day' | 'week' | 'month') => void;
  updateViewType: (viewType: 'list' | 'grid') => void;
  updateToken: (token: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const updateLanguage = (language: string) => {
    dispatch({ type: 'UPDATE_LANGUAGE', payload: language });
  };

  const updateDateJump = (dateJump: 'day' | 'week' | 'month') => {
    dispatch({ type: 'UPDATE_DATE_JUMP', payload: dateJump });
  };

  const updateViewType = (viewType: 'list' | 'grid') => {
    dispatch({ type: 'UPDATE_VIEW_TYPE', payload: viewType });
  };

  const updateToken = (token: string) => {
    dispatch({ type: 'UPDATE_TOKEN', payload: token });
  };

  const value: AppContextType = {
    state,
    preferences: state.preferences,
    updateLanguage,
    updateDateJump,
    updateViewType,
    updateToken,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}; 