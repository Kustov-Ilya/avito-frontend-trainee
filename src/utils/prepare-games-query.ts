import { GamesListQueryType } from '@/types/api-games';

const prepareGamesQuery = (query: GamesListQueryType) => {
  let searchParams = new URLSearchParams(query).toString();

  searchParams = searchParams.replace(/[^=&]+=(?:&|$)/g, '');
  searchParams = searchParams.replace('sortBy', 'sort-by');
  return searchParams;
};

export default prepareGamesQuery;
