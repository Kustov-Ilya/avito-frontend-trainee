import { configureStore } from '@reduxjs/toolkit';
import gamesListReducer from '../reducers/games-list-slice';
import gamePageReducer from '../reducers/game-page-slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: { gamesList: gamesListReducer, gamePage: gamePageReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
