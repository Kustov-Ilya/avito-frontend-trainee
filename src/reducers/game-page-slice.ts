import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiGames from '@/api/api-games';
import { Status } from '@/constants/status';
import { GameByIdQueryType } from '@/types/api-games';
import { Game } from '@/types/game';

interface GamePageState {
  game?: Game;
  gameLoadedStatus: Status;
}

const initialState: GamePageState = {
  game: undefined,
  gameLoadedStatus: Status.PENDING,
};

export const getGameById = createAsyncThunk(
  'games/getGameById',
  async (query: GameByIdQueryType, thunkAPI) => {
    try {
      const response = await apiGames.getGameById(query);

      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: (error as Error | null)?.message,
      });
    }
  },
);

const gamePageSlice = createSlice({
  name: 'gamesList',
  initialState,
  reducers: {
    setGame(state, action: PayloadAction<Game>) {
      state.game = action.payload;
      state.gameLoadedStatus = Status.FULFILED;
    },
    clearGame(state) {
      state.game = undefined;
      state.gameLoadedStatus = Status.PENDING;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGameById.fulfilled, (state, action) => {
        state.game = action.payload;
        state.gameLoadedStatus = Status.FULFILED;
      })
      .addCase(getGameById.pending, (state) => {
        state.game = undefined;
        state.gameLoadedStatus = Status.PENDING;
      })
      .addCase(getGameById.rejected, (state) => {
        state.game = undefined;
        state.gameLoadedStatus = Status.REJECTED;
      });
  },
});

export default gamePageSlice.reducer;
export const { setGame, clearGame } = gamePageSlice.actions;
