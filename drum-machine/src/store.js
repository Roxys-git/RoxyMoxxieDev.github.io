import { configureStore, createSlice } from '@reduxjs/toolkit';

// Create a slice for display
const drumSlice = createSlice({
  name: 'drum',
  initialState: {
    display: 'Drum Machine Ready',
  },
  reducers: {
    setDisplay: (state, action) => {
      state.display = action.payload;
    },
  },
});

export const { setDisplay } = drumSlice.actions;

const store = configureStore({
  reducer: {
    drum: drumSlice.reducer,
  },
});

export default store;
