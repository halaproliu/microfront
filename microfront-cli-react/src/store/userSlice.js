import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: 'single-spa测试',
    age: 88
  },
  reducers: {
    setUsername: (state, action) => {
      state.name = action.payload;
    }
  }
});

// actions
export const { setUsername } = userSlice.actions;

// state 获取，用在 useSeletor hook 上
export const selectUser = (state) => state.user;

// reducer
export default userSlice.reducer;
