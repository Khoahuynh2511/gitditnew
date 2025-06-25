import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchTrendingRepositories, getNextDateRange } from '../services/githubApi';
import { TrendingFilters, RepositoryGroup } from '../types';

interface UseRepositoriesProps {
  language: string;
  dateJump: 'day' | 'week' | 'month';
  token?: string;
}

export const useRepositories = ({ language, dateJump, token }: UseRepositoriesProps) => {
  return useInfiniteQuery(
    ['repositories', language, dateJump],
    async ({ pageParam = null }) => {
      const dateRange = getNextDateRange(pageParam, dateJump);
      const filters: TrendingFilters = {
        dateRange,
        language: language || undefined,
        token,
      };
      
      return fetchTrendingRepositories(filters);
    },
    {
      getNextPageParam: (lastPage: RepositoryGroup) => ({
        start: lastPage.start,
        end: lastPage.end,
      }),
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
      refetchOnWindowFocus: false,
      retry: (failureCount: number, error: Error) => {
        // Don't retry on auth errors
        if (error.message === 'Bad credentials') {
          return false;
        }
        return failureCount < 3;
      },
    }
  );
};

export const useTrendingRepositories = (props: UseRepositoriesProps) => {
  const query = useRepositories(props);
  
  const repositories = query.data?.pages || [];
  const allRepositories = repositories.flatMap((page: RepositoryGroup) => page.data.items);
  
  return {
    repositories,
    allRepositories,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error?.message || null,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
  };
}; 