import React from 'react';
import { useSelector } from 'react-redux';
import { marked } from 'marked';

function Previewer() {
  const content = useSelector((state) => state.markdown.content);

  const renderMarkdown = () => {
    marked.setOptions({
      breaks: true,
      gfm: true,
    });
    return { __html: marked(content) };
  };

  return (
    <div>
      <div id="previewer-title">Previewer</div>
      <div
        id="preview"
        dangerouslySetInnerHTML={renderMarkdown()}
      ></div>
    </div>
  );
}

export default Previewer;
