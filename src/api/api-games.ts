import { Game } from '@/types/game';
import ApiClient, { API_ENDPOINT } from './api-client';
import axios, { AxiosPromise } from 'axios';
import prepareGamesQuery from '@/utils/prepare-games-query';
import { GameByIdQueryType, GamesListQueryType } from '@/types/api-games';

const client = new ApiClient(API_ENDPOINT);
let CANCEL_TOKEN_SOURCE = axios.CancelToken.source();

const generateNewCancelTokenSource = () => {
  CANCEL_TOKEN_SOURCE = axios.CancelToken.source();
};

const apiGames = {
  getGames: (query: GamesListQueryType): AxiosPromise<Game[]> => {
    return client.get<Game[]>(`/games?${prepareGamesQuery(query)}`, null, {
      cancelToken: CANCEL_TOKEN_SOURCE.token,
    });
  },
  getGameById: (query: GameByIdQueryType): AxiosPromise<Game> => {
    return client.get<Game, GameByIdQueryType>('/game', query, {
      cancelToken: CANCEL_TOKEN_SOURCE.token,
    });
  },
  finishPendingRequests: () => {
    CANCEL_TOKEN_SOURCE.cancel();
    generateNewCancelTokenSource();
  },
};

export default apiGames;
