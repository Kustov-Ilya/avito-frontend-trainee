import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiGames from '@/api/api-games';
import { Status } from '@/constants/status';
import { GamesListQueryType } from '@/types/api-games';
import { Game } from '@/types/game';

interface GamesListState {
  games: Game[];
  gamesLoadedStatus: Status;
  filters: {
    platform: string;
    genre: string;
    sortBy: string;
  };
}

const initialState: GamesListState = {
  games: [],
  gamesLoadedStatus: Status.PENDING,
  filters: {
    platform: '',
    genre: '',
    sortBy: 'relevance',
  },
};

export const getGames = createAsyncThunk(
  'games/getGames',
  async (query: GamesListQueryType, thunkAPI) => {
    try {
      const response = await apiGames.getGames(query);

      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: (error as Error | null)?.message,
      });
    }
  },
);

const gamesListSlice = createSlice({
  name: 'gamesList',
  initialState,
  reducers: {
    setPlatform(state, action: PayloadAction<string>) {
      console.log(state);
      state.filters.platform = action.payload;
    },
    setGenre(state, action: PayloadAction<string>) {
      console.log(state);
      state.filters.genre = action.payload;
    },
    setSortBy(state, action: PayloadAction<string>) {
      console.log(state);
      state.filters.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGames.fulfilled, (state, action) => {
        state.games = action.payload;
        state.gamesLoadedStatus = Status.FULFILED;
      })
      .addCase(getGames.pending, (state) => {
        state.games = [];
        state.gamesLoadedStatus = Status.PENDING;
      })
      .addCase(getGames.rejected, (state) => {
        state.games = [];
        console.log('qwer');
        state.gamesLoadedStatus = Status.REJECTED;
      });
  },
});

export default gamesListSlice.reducer;
export const { setPlatform, setGenre, setSortBy } = gamesListSlice.actions;
