import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsSlice";
import projectsReducer from "./slices/projectsSlice";
import labsReducer from "./slices/labsSlice";
import videosReducer from "./slices/videosSlice";
import statsReducer from "./slices/statsSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    projects: projectsReducer,
    labs: labsReducer,
    videos: videosReducer,
    stats: statsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
