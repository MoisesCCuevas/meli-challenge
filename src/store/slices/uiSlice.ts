import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface uiState {
  loading: boolean;
  searchValue: string;
}

const initialState: uiState = {
  loading: false,
  searchValue: '',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading : (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const { setLoading, setSearchValue } = uiSlice.actions;
export default uiSlice.reducer;
