import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import uiReducer from './slices/uiSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
