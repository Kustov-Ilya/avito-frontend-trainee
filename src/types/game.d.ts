type ScreenshotType = { id: number; image: string };

type MinSystemReqsType = {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
};

export interface Game {
  id: number;
  developer: string;
  freetogame_profile_url: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  release_date: string;
  short_description: string;
  thumbnail: string;
  title: string;
  description?: string;
  screenshots?: ScreenshotType[];
  minimum_system_requirements?: MinSystemReqsType;
}
