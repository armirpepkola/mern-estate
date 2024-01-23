import { combineReducers, configureStore } from '@reduxjs/toolkit';

// Import the userReducer from the userSlice file
import userReducer from './user/userSlice';

// Import modules for Redux persist
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Combine reducers to create the root reducer
const rootReducer = combineReducers({ user: userReducer });

// Configuration for Redux persist
const persistConfig = {
  key: 'root',       // Key for the persist storage
  storage,           // Storage engine (local storage, etc.)
  version: 1,        // Version of the persisted data
};

// Create a persisted reducer using the persist configuration and the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store with the persisted reducer and middleware options
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for Redux persist
    }),
});

// Create and export a persistor for the Redux store
export const persistor = persistStore(store);