import { AutoAwesome } from "@mui/icons-material";
import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { RichTextReadOnly } from "mui-tiptap";
import useExtensions from "../tiptap/useExtensions";
import { useServiceProvider } from "../../services/ServiceProvider";

interface ContentGeneratorButtonProps {
  title: string;
  endpoint: string;
  setContent: (content: string) => void;
  placeholder: string;
}

export default function ContentGeneratorButton({ title, endpoint, setContent, placeholder }: ContentGeneratorButtonProps) {
  const { questionsStore } = useServiceProvider();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState<string>();

  const extensions = useExtensions({ placeholder: "" });

  async function handleGenerate() {
    try {
      setLoading(true);
      const content = await questionsStore.generateContent(prompt, endpoint);
      setGeneratedContent(content);
    } catch (error) {
      console.error(`Error generating ${title}:`, error);
    } finally {
      setLoading(false);
    }
  }

  function handleApply() {
    if (!generatedContent) return;
    setContent(generatedContent);
    setOpen(false);
  }

  return (
    <>
      <Button size="small" startIcon={<AutoAwesome />} onClick={() => setOpen(true)}>
        Generate
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{`Generate ${title}`}</DialogTitle>
        <DialogContent>
          <Stack spacing={1} alignItems="end" sx={{ pt: 1 }}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Prompt"
              value={prompt}
              placeholder={placeholder}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={handleGenerate}
              startIcon={<AutoAwesome />}
              disabled={loading || !prompt}
              sx={{ flexShrink: 0 }}
            >
              Generate
            </Button>
          </Stack>

          {generatedContent && !loading && (
            <Stack spacing={2} mt={2}>
              <RichTextReadOnly content={generatedContent} extensions={extensions} />
              <Stack direction="row" spacing={1} justifyContent="right">
                <Button variant="outlined" onClick={() => setOpen(false)}>
                  Discard
                </Button>
                <Button variant="contained" onClick={handleApply}>
                  Apply
                </Button>
              </Stack>
            </Stack>
          )}

          {loading && (
            <Stack alignItems="center" justifyContent="center" my={5}>
              <CircularProgress />
            </Stack>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}