import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import themeReducer from './features/themeSlice';
import { shazamCoreApi } from './services/shazamCore';

export const store = configureStore({
    reducer: {
        [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
        player: playerReducer,
        theme: themeReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazamCoreApi.middleware)
});
