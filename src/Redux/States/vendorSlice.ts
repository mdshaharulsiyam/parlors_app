import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectedTime } from '../../components/ManageShop/AvailableTme';
import { IAddressInput, IShopInput } from '../../utils/types/Types';

interface VendorState {
  address: IAddressInput | null;
  profile: IShopInput | null;
  availableTime: SelectedTime | null;
  index: 0 | 1 | 2;
}

const initialState: VendorState = {
  address: null,
  profile: null,
  availableTime: null,
  index: 0,
};

export const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<IAddressInput>) => {
      state.address = action.payload;
    },
    setProfile: (state, action: PayloadAction<IShopInput>) => {
      state.profile = action.payload;
    },
    setAvailableTime: (state, action: PayloadAction<SelectedTime>) => {
      state.availableTime = action.payload;
    },
    setIndex: (state, action: PayloadAction<0 | 1 | 2>) => {
      state.index = action.payload;
    },
  },
});

export const { setAddress, setProfile, setAvailableTime, setIndex } = vendorSlice.actions;

export default vendorSlice.reducer;
