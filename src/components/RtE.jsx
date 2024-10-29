import { Editor } from '@tinymce/tinymce-react';
import React from 'react';
import { Controller } from 'react-hook-form';


function RtE({ name, control, label, defaultValue = "" }) {
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Editor
            value={value} // Pass value from react-hook-form
            onEditorChange={(content, editor) => onChange(content)} // Update react-hook-form state
            apiKey='5o81i4kzaduopk20ivftiq7anhfq876k4qk9cvml1g8odiwg'
            
            init={{
              branding: false,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              readonly: false // Ensure this is set to false
            }}
          />
        )}
      />
    </div>
  );
}

export default RtE;
