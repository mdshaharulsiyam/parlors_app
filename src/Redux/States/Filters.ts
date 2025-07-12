import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IFilters {
  search: string;
}

const initialState: IFilters = {
  search: '',
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = filtersSlice.actions;
export default filtersSlice.reducer;
