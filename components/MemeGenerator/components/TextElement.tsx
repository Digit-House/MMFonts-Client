import React, { useContext } from 'react';
import ReactHtmlParser from 'react-html-parser';
import ReactQuill, { Quill } from 'react-quill';
import MemeContext, { ICanvasComponent } from '@context/MemeContext';
import 'react-quill/dist/quill.snow.css';
import { fontList, sizeList } from './Toolbar';

const Size = Quill.import('attributors/style/size');
Size.whitelist = sizeList;

const Font = Quill.import('attributors/style/font');
Font.whitelist = fontList;

Quill.register(Font, true);
Quill.register(Size, true);

const TextElement = (props: ICanvasComponent) => {
  const { content, id, isReadOnly, dimension } = props;
  const { actions } = useContext(MemeContext);
  const editorRef = React.useRef(null);

  const updateEditorValue = (value: string) => {
    actions?.updateCanvasData({ id, content: value });
  };

  const modules = {
    toolbar: '#toolbar',
  };

  return (
    <>
      <div>
        {isReadOnly ? (
          <div
            className="ql-editor"
            style={{
              fontFamily: 'Arial',
              fontSize: '16px',
              padding: 0,
            }}
          >
            {ReactHtmlParser(content || '')}
          </div>
        ) : (
          <ReactQuill
            ref={editorRef}
            readOnly={isReadOnly}
            theme="snow"
            className="quill-container"
            modules={modules}
            value={content}
            onChange={updateEditorValue}
          />
        )}
      </div>
    </>
  );
};

export default TextElement;
