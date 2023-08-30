import { Game } from '@/types/game';

type StoredGameType = {
  game: Game;
  expiryDate: number;
};

const STORED_TIME_MS: number = 5 * 60 * 1000;

const browserStorageService = {
  getStoredGame: (id: string) => {
    const storedGameRecord = sessionStorage.getItem(id);

    if (!storedGameRecord) return null;

    const storedGame = JSON.parse(storedGameRecord) as StoredGameType;
    const { expiryDate } = storedGame;
    const currentTime: number = new Date().getTime();

    if (expiryDate < currentTime) {
      sessionStorage.removeItem(id);
      return null;
    }

    return storedGame.game;
  },

  storeGame: (game: Game) => {
    const currentTime: number = new Date().getTime();
    const expiryDate = currentTime + STORED_TIME_MS;

    sessionStorage.setItem(
      game.id.toString(),
      JSON.stringify({ game, expiryDate }),
    );
  },
};

export default browserStorageService;
