import { Game } from "@/store/reducers/game-page-slice";
import ApiClient, { API_ENDPOINT } from "./api-client";
import axios from "axios";

export type GamesListQueryType = Partial<{
  platform: string;
  genre: string;
  sortBy: string;
}>;

export type GameByIdQueryType = {
  id: number;
};

function prepareGamesQuery(query: GamesListQueryType) {
  let searchParams = new URLSearchParams(query).toString();
  //Delete empty queries
  searchParams = searchParams.replace(/[^=&]+=(?:&|$)/g, "");
  searchParams = searchParams.replace("sortBy", "sort-by");
  return searchParams;
}

let CANCEL_TOKEN_SOURCE = axios.CancelToken.source();

function generateNewCancelTokenSource() {
  CANCEL_TOKEN_SOURCE = axios.CancelToken.source();
}

const client = new ApiClient(API_ENDPOINT);

const apiGames = {
  getGames: async (query: GamesListQueryType): Promise<Game[]> => {
    const response = await client.get<Game[]>(
      `/games?${prepareGamesQuery(query)}`,
      null,
      { cancelToken: CANCEL_TOKEN_SOURCE.token }
    );
    return response?.data;
  },
  getGameById: async (query: GameByIdQueryType): Promise<Game> => {
    const response = await client.get<Game, GameByIdQueryType>("/game", query, {
      cancelToken: CANCEL_TOKEN_SOURCE.token,
    });
    return response?.data;
  },
  finishPendingRequests: () => {
    CANCEL_TOKEN_SOURCE.cancel();
    generateNewCancelTokenSource();
  },
};

export default apiGames;
