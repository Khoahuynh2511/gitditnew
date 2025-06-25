export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks: number;
  open_issues: number;
  language: string | null;
  created_at: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

export interface DateRange {
  start: string;
  end: string;
}

export interface TrendingFilters {
  dateRange: DateRange;
  language?: string;
  token?: string;
}

export interface RepositoryGroup {
  start: string;
  end: string;
  data: {
    items: Repository[];
    total_count: number;
  };
}

export interface AppPreferences {
  language: string;
  dateJump: 'day' | 'week' | 'month';
  viewType: 'list' | 'grid';
  options: {
    token?: string;
  };
}

export interface GitHubAPIResponse {
  items: Repository[];
  total_count: number;
} 