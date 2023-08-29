import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiGames, {
  GamesListQueryType,
} from "@/api/api-games";
import { Game } from "./game-page-slice";
import { Status } from "@/types/status-enum";

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
    platform: "",
    genre: "",
    sortBy: "relevance",
  },
};

export const getGames = createAsyncThunk(
  "games/getGames",
  async (query: GamesListQueryType, thunkAPI) => {
    try {
      return await apiGames.getGames(query);
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: (error as Error | null)?.message,
      });
    }
  }
);

const gamesListSlice = createSlice({
  name: "gamesList",
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
        state.gamesLoadedStatus = Status.REJECTED;
      });
  },
});

export default gamesListSlice.reducer;
export const { setPlatform, setGenre, setSortBy } = gamesListSlice.actions;
