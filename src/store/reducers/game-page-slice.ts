import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiGames, {
  GameByIdQueryType,
  GamesListQueryType,
} from "@/api/api-games";
import { Status } from "@/types/status-enum";

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

interface GamePageState {
  game?: Game;
  gameLoadedStatus: Status;
}

const initialState: GamePageState = {
  game: undefined,
  gameLoadedStatus: Status.PENDING,
};

export const getGameById = createAsyncThunk(
  "games/getGameById",
  async (query: GameByIdQueryType, thunkAPI) => {
    try {
      return await apiGames.getGameById(query);
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: (error as Error | null)?.message,
      });
    }
  }
);

const gamePageSlice = createSlice({
  name: "gamesList",
  initialState,
  reducers: {},
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
