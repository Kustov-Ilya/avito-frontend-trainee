import { useAppDispatch, useAppSelector } from '@/store';
import { getGameById, setGame } from '@/reducers/game-page-slice';
import { useEffect, useMemo } from 'react';
import browserStorageService from '@/services/browser-storage-service';

const useGameSelector = (id: string) => {
  const dispatch = useAppDispatch();
  const storedGame = useMemo(
    () => browserStorageService.getStoredGame(id),
    [id],
  );
  const currentGame = useAppSelector((store) => {
    const { game } = store.gamePage;
    if (game && game.id.toString() == id) {
      return game;
    }
    return undefined;
  });

  useEffect(() => {
    if (storedGame) {
      dispatch(setGame(storedGame));
    } else {
      dispatch(getGameById({ id: +id }));
    }
  }, []);

  useEffect(() => {
    if (currentGame && !storedGame) {
      browserStorageService.storeGame(currentGame);
    }
  }, [currentGame]);

  return currentGame;
};

export default useGameSelector;
