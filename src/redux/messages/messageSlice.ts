import { createSlice } from "@reduxjs/toolkit";
import { getSingleThread, myThreads } from "./thunkActions";
import { IMessage, IThread } from "@/types/messages";

export interface IState {
  loading: "failed" | "loading" | "successful" | "idle";
  messages: IMessage[];
  threads: IThread[];
  thread: IThread;
}
const initialState: IState = {
  loading: "idle",
  messages: [] as IMessage[],
  threads: [] as IThread[],
  thread: {} as IThread,
};

const MessageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(myThreads.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(myThreads.fulfilled, (state, action) => {
      return {
        ...state,
        loading: "successful",
        threads: action.payload,
      };
    });
    builder.addCase(myThreads.rejected, (state) => {
      return { ...state, loading: "failed" };
    });
    builder.addCase(getSingleThread.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(getSingleThread.fulfilled, (state, action) => {
      return {
        ...state,
        loading: "successful",
        thread: action.payload,
      };
    });
    builder.addCase(getSingleThread.rejected, (state) => {
      return { ...state, loading: "failed" };
    });
  },
});

export const MessageReducer = MessageSlice.reducer;
