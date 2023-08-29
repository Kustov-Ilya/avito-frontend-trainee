import { Game } from "@/store/reducers/games-list-slice";
import ApiClient, { API_ENDPOINT } from "./api-client";

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

const client = new ApiClient(API_ENDPOINT);

const apiGames = {
  getGames: async (query: GamesListQueryType): Promise<Game[]> => {
    const response = await client.get<Game[]>(
      `/games?${prepareGamesQuery(query)}`
    );
    return response?.data;
  },
  getGameById: async (query: GameByIdQueryType): Promise<Game> => {
    const response = await client.get<Game, GameByIdQueryType>("/game", query);
    return response?.data;
  },
};

export default apiGames;
