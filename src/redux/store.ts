import { configureStore } from "@reduxjs/toolkit";
import { jobsApi } from "./api/api";
const store = configureStore({
  reducer: {
    [jobsApi.reducerPath]: jobsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobsApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
