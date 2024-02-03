// The code in this folder is based on the example at: https://github.com/sjdemartini/mui-tiptap
// Codesandbox: https://codesandbox.io/p/devbox/mui-tiptap-demo-3zl2l6?file=%2Fsrc%2FEditor.tsx%3A11%2C16
import { TextFields } from "@mui/icons-material";
import { Box, GlobalStyles, Stack } from "@mui/material";
import type { EditorOptions } from "@tiptap/core";
import { useEditor } from "@tiptap/react";
import {
  LinkBubbleMenu,
  MenuButton,
  RichTextEditor,
  TableBubbleMenu,
  insertImages
} from "mui-tiptap";
import { useCallback, useState } from "react";
import EditorMenuControls from "./EditorMenuControls";
import useExtensions from "./useExtensions";

function fileListToImageFiles(fileList: FileList): File[] {
  return Array.from(fileList).filter((file) => {
    const mimeType = (file.type || "").toLowerCase();
    return mimeType.startsWith("image/");
  });
}

// TODO: add auto-save to local storage to prevent author losing content
interface IQuestionTextEditorProps {
  placeholderText?: string;
  initialValue: string;
  setValue: (newValue: string) => void;
}

export const RichQuestionTextEditor = (props: IQuestionTextEditorProps) => {
  const extensions = useExtensions({
    placeholder: props.placeholderText
      ? props.placeholderText
      : "Add question content here...",
  });

  const editor = useEditor({
    extensions,
    content: props.initialValue || '',
  })

  const [isEditable, setIsEditable] = useState(true);
  const [showMenuBar, setShowMenuBar] = useState(true);

  const handleNewImageFiles = useCallback(
    (files: File[], insertPosition?: number): void => {
      if (!editor) {
        return;
      }

      const attributesForImageFiles = files.map((file) => ({
        src: URL.createObjectURL(file),
        alt: file.name,
      }));

      insertImages({
        images: attributesForImageFiles,
        editor: editor,
        position: insertPosition,
      });
    },
    []
  );

  const handleDrop: NonNullable<EditorOptions["editorProps"]["handleDrop"]> =
    useCallback(
      (view, event, _slice, _moved) => {
        if (!(event instanceof DragEvent) || !event.dataTransfer) {
          return false;
        }

        const imageFiles = fileListToImageFiles(event.dataTransfer.files);
        if (imageFiles.length > 0) {
          const insertPosition = view.posAtCoords({
            left: event.clientX,
            top: event.clientY,
          })?.pos;

          handleNewImageFiles(imageFiles, insertPosition);

          event.preventDefault();
          return true;
        }

        return false;
      },
      [handleNewImageFiles]
    );

  const handlePaste: NonNullable<EditorOptions["editorProps"]["handlePaste"]> =
    useCallback(
      (_view, event, _slice) => {
        if (!event.clipboardData) {
          return false;
        }

        const pastedImageFiles = fileListToImageFiles(
          event.clipboardData.files
        );
        if (pastedImageFiles.length > 0) {
          handleNewImageFiles(pastedImageFiles);
          return true;
        }

        return false;
      },
      [handleNewImageFiles]
    );

  // const [submittedContent, setSubmittedContent] = useState("");

  return (
    <>
      <GlobalStyles
        styles={{
          "&.MuiTiptap-RichTextField-content": {
            backgroundColor: "#fff",
            borderRadius: "12px 12px 0px 0px",
          },
          "&.MuiTiptap-RichTextContent-root": {
            borderRadius: 0,
          },
        }}
      />
      <Box
        sx={{
          "& .ProseMirror": {
            "& h1, & h2, & h3, & h4, & h5, & h6": {
              scrollMarginTop: showMenuBar ? 50 : 0,
            },
          },
          bgcolor: "#fff",
          borderRadius: 1,
        }}
      >
        <RichTextEditor
          onBlur={({ editor }) => props.setValue(editor.getHTML())}
          extensions={extensions}
          content={props.initialValue}
          editable={isEditable}
          editorProps={{
            handleDrop: handleDrop,
            handlePaste: handlePaste,
          }}
          renderControls={() => <EditorMenuControls />}
          RichTextFieldProps={{
            variant: "outlined",
            MenuBarProps: {
              hide: !showMenuBar,
            },
            footer: (
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{
                  borderTopStyle: "solid",
                  borderTopWidth: 1,
                  borderTopColor: (theme) => theme.palette.divider,
                  py: 1,
                  px: 1.5,
                }}
              >
                <MenuButton
                  value="formatting"
                  tooltipLabel={
                    showMenuBar ? "Hide formatting" : "Show formatting"
                  }
                  size="small"
                  onClick={() =>
                    setShowMenuBar((currentState) => !currentState)
                  }
                  selected={showMenuBar}
                  IconComponent={TextFields}
                />

                {/* <MenuButton
                  value="formatting"
                  tooltipLabel={
                    isEditable
                      ? "Prevent edits (use read-only mode)"
                      : "Allow edits"
                  }
                  size="small"
                  onClick={() => setIsEditable((currentState) => !currentState)}
                  selected={!isEditable}
                  IconComponent={isEditable ? Lock : LockOpen}
                /> */}

                {/* <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    props.onSaveEditorContent(
                      rteRef.current?.editor?.getHTML() ?? ""
                    );
                  }}
                >
                  Save
                </Button> */}
              </Stack>
            ),
          }}
        >
          {() => (
            <>
              <LinkBubbleMenu />
              <TableBubbleMenu />
            </>
          )}
        </RichTextEditor>
      </Box>
    </>
  );
};
