export type GamesListQueryType = Partial<{
  platform: string;
  genre: string;
  sortBy: string;
}>;

export type GameByIdQueryType = {
  id: number;
};
