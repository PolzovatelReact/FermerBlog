import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TypesEvents } from "../../types/typesEvents";

interface EventsState {
  isLoading: boolean;
  hasError: boolean;
  event: TypesEvents[];
}

const initialState: EventsState = {
  isLoading: false,
  hasError: false,
  event: [],
};

export const fetchEvents = createAsyncThunk<
  TypesEvents[],
  void,
  { rejectValue: string }
>("event/fetchEvents", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:5050/api/events`);
    const events = await response.json();
    return events;
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    } else {
      return rejectWithValue("Произошла неизвестная ошибка");
    }
  }
});

const eventsSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.event = action.payload;
      })
      .addCase(fetchEvents.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export default eventsSlice.reducer;
