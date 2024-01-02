// src/Tiptap.jsx
import {
  EditorProvider,
  FloatingMenu,
  BubbleMenu,
  EditorContent,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

// define your extension array
const extensions = [StarterKit, Image];

const content = "<p>Hello World!</p>";

const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: "<p>Hello World</p>",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      // Do something with the updated HTML, like saving it to your backend
    },
  });

  return <EditorContent editor={editor} />;
};

export default RichTextEditor;
