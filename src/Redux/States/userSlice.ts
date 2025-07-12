import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUserProfile} from '../../utils/types/Types';

interface UserState {
  user: IUserProfile | null;
  token: string | null;
  role: string | null;
  resetToken: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
  role: null,
  resetToken: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<IUserProfile>) => {
      state.user = action.payload;
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    setResetToken: (state, action: PayloadAction<string>) => {
      state.resetToken = action.payload;
    },
  },
});

export const {setToken, setUser, setRole, setResetToken} = userSlice.actions;

export default userSlice.reducer;
