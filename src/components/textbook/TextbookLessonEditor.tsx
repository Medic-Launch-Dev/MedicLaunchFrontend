import { DeleteOutline, DragIndicator } from "@mui/icons-material";
import { Button, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { TextbookLesson } from "../../models/TextbookLesson";
import { RichQuestionTextEditor } from "../tiptap/RichQuestionTextEditor";
import TextSelect from "../util/TextSelect";

interface TextbookLessonEditorProps {
  textbookLesson: TextbookLesson;
  setTextbookLesson: (textbookLesson: TextbookLesson) => void;
}

export default function TextbookLessonEditor({ textbookLesson, setTextbookLesson }: TextbookLessonEditorProps) {
  const [newContent, setNewContent] = useState({ heading: "", text: "" });

  const handleContentChange = (id: string, field: "heading" | "text", value: string) => {
    setTextbookLesson({
      ...textbookLesson,
      contents: textbookLesson.contents.map(content =>
        content.id === id ? { ...content, [field]: value } : content
      ),
    });
  };

  const handleAddContent = () => {
    if (!newContent.heading.trim() || !newContent.text.trim()) return;

    const newEntry = {
      id: String(Date.now()), // Temporary unique ID
      heading: newContent.heading,
      text: newContent.text,
    };

    setTextbookLesson({
      ...textbookLesson,
      contents: [...textbookLesson.contents, newEntry],
    });

    setNewContent({ heading: "", text: "" });
  };

  const handleDeleteContent = (id: string) => {
    setTextbookLesson({
      ...textbookLesson,
      contents: textbookLesson.contents.filter(content => content.id !== id),
    });
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(textbookLesson.contents);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTextbookLesson({
      ...textbookLesson,
      contents: items,
    });
  };

  return (
    <div>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
        <Typography variant="h3">{textbookLesson.title}</Typography>
        <TextSelect
          size="small"
          options={[
            { value: "false", displayText: "Draft" },
            { value: "true", displayText: "Submitted" }
          ]}
          selected={String(textbookLesson.isSubmitted || false)}
          setSelected={(value) => setTextbookLesson({
            ...textbookLesson,
            isSubmitted: value === "true"
          })}
          sx={{ minWidth: 150 }}
        />
      </Stack>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="contents">
          {(provided) => (
            <Stack
              spacing={2}
              mt={3}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {textbookLesson.contents.map((content, index) => (
                <Draggable key={content.id} draggableId={content.id || ""} index={index}>
                  {(provided) => (
                    <Paper
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      sx={{ p: 3 }}
                    >
                      <Stack spacing={2}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <TextField
                            fullWidth
                            label="Heading"
                            variant="outlined"
                            size="small"
                            value={content.heading}
                            onChange={e => handleContentChange(content.id || "", "heading", e.target.value)}
                          />
                          <IconButton {...provided.dragHandleProps}>
                            <DragIndicator />
                          </IconButton>
                        </Stack>
                        <RichQuestionTextEditor
                          placeholderText="Add content here..."
                          initialValue={content.text}
                          setValue={value => handleContentChange(content.id || "", "text", value)}
                        />
                      </Stack>
                      <Stack alignItems="end">
                        <IconButton sx={{ mt: 2 }} onClick={() => handleDeleteContent(content.id || "")}>
                          <DeleteOutline />
                        </IconButton>
                      </Stack>
                    </Paper>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <Paper sx={{ p: 2.5 }}>
                <Typography variant="h5">Add content</Typography>
                <Stack spacing={2} mt={2}>
                  <TextField
                    label="Heading"
                    variant="outlined"
                    size="small"
                    value={newContent.heading}
                    onChange={e => setNewContent({ ...newContent, heading: e.target.value })}
                  />
                  <RichQuestionTextEditor
                    key={newContent.text} // Ensures re-mounting on reset
                    placeholderText="Add content here..."
                    initialValue={newContent.text}
                    setValue={(value) => setNewContent({ ...newContent, text: value })}
                  />
                </Stack>
                <Stack alignItems="end">
                  <Button variant="contained" sx={{ mt: 2 }} onClick={handleAddContent} disabled={!newContent.heading || !newContent.text}>
                    Add
                  </Button>
                </Stack>
              </Paper>
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}