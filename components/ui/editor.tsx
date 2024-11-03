import React, { FC } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface EditorComponentProps {
  setText: (text: string) => void;
  initialValue?: string;
}

const EditorComponent: FC<EditorComponentProps> = ({
  setText,
  initialValue = '',
}) => {
  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
      initialValue={initialValue}
      onChange={e => setText(e.target.getContent())}
      init={{
        skin: 'oxide-dark',
        content_css: 'dark',
        plugins:
          'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
        toolbar:
          'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
      }}
    />
  );
};
export default EditorComponent;
