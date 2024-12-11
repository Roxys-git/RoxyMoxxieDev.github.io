import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateContent } from '../store/store';

function Editor() {
  const content = useSelector((state) => state.markdown.content);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(updateContent(e.target.value));
  };

  return (
    <div>
      <div id="editor-title">Editor</div>
      <div id="title">
        <a href="https://roxymoxxiedev.github.io">RoxyMoxxie Dev</a>
      </div>
      <textarea
        id="editor"
        value={content}
        onChange={handleChange}
      ></textarea>
    </div>
  );
}

export default Editor;
