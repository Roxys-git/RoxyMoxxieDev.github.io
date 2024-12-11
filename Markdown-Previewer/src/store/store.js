import { configureStore, createSlice } from '@reduxjs/toolkit';

const markdownSlice = createSlice({
  name: 'markdown',
  initialState: {
    content: `
<div id="title-from-js">
  <a href="https://roxymoxxiedev.github.io">RoxyMoxxie Dev</a>
</div>
  <h1>You can create your Website,<br> 
    based on Hypertext Marking Language,<br> 
    within your own files.<br>
  </h1>

  <img src="Logo Entwurf 1.png" alt="RoxyMoxxieDev">

  <p>Roxana Zwicky<br>
     <a href="https://roxymoxxiedev.github.io">RoxyMoxxie Dev</a><br>
     <a href="https://github.com/RoxyMoxxieDev/RoxyMoxxieDev.github.io">GitHub</a><br>
     <a href="www.linkedin.com/in/roxana-anastasia-zwicky-544a1b32b">LinkedIn</a><br>
     <a href="mailto:roxanaanastasiazwicky@gmail.com">&#9993</a><br>
     <a href="tel:+41-77-283-12-36">&#9990</a>
  <p>
`,
  },
  reducers: {
    updateContent(state, action) {
      state.content = action.payload;
    },
  },
});

export const { updateContent } = markdownSlice.actions;

const store = configureStore({
  reducer: {
    markdown: markdownSlice.reducer,
  },
});

export default store;
