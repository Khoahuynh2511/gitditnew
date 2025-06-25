import moment from 'moment';
import { TrendingFilters, GitHubAPIResponse, RepositoryGroup } from '../types';

const API_URL = 'https://api.github.com/search/repositories';

const transformFilters = (filters: TrendingFilters) => {
  const startMoment = moment(filters.dateRange.start);
  const endMoment = moment(filters.dateRange.end);
  const reposDate = `created:${startMoment.format()}..${endMoment.format()}`;
  const reposLanguage = filters.language ? `language:${filters.language} ` : '';

  return {
    q: reposLanguage + reposDate,
    sort: 'stars',
    order: 'desc',
    per_page: '50',
  };
};

export const fetchTrendingRepositories = async (
  filters: TrendingFilters
): Promise<RepositoryGroup> => {
  const params = new URLSearchParams(transformFilters(filters));
  const url = `${API_URL}?${params}`;

  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'GitHunt-App/2.0',
  };

  if (filters.token) {
    headers.Authorization = `Bearer ${filters.token}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(url, {
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Bad credentials');
      }
      if (response.status >= 500) {
        throw new Error('GitHub server error');
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data: GitHubAPIResponse = await response.json();

    return {
      start: filters.dateRange.start,
      end: filters.dateRange.end,
      data,
    };
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
    throw new Error('Network error');
  }
};

export const getNextDateRange = (
  lastRange: { start: string; end: string } | null,
  dateJump: 'day' | 'week' | 'month'
) => {
  if (lastRange) {
    return {
      start: moment(lastRange.start).subtract(1, dateJump).startOf('day').format(),
      end: lastRange.start,
    };
  }

  return {
    start: moment().subtract(1, dateJump).startOf('day').format(),
    end: moment().startOf('day').format(),
  };
}; 