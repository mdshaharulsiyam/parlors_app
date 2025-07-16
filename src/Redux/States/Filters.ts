import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IFilters {
  search: string;
  divisions: string;
  districts: string;
  upazilas: string;
  unions: string;
  street_address: string;
}

const initialState: IFilters = {
  search: '',
  divisions: '',
  districts: '',
  upazilas: '',
  unions: '',
  street_address: '',
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setDivisions: (state, action: PayloadAction<string>) => {
      state.divisions = action.payload;
    },
    setDistricts: (state, action: PayloadAction<string>) => {
      state.districts = action.payload;
    },
    setUpazilas: (state, action: PayloadAction<string>) => {
      state.upazilas = action.payload;
    },
    setUnions: (state, action: PayloadAction<string>) => {
      state.unions = action.payload;
    },
    setStreetAddress: (state, action: PayloadAction<string>) => {
      state.street_address = action.payload;
    },
  },
});

export const { setSearch, setDivisions, setDistricts, setUpazilas, setUnions, setStreetAddress } = filtersSlice.actions;
export default filtersSlice.reducer;
