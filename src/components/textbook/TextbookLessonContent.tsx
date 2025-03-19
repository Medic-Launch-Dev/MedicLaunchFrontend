import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Stack, Typography } from "@mui/material";
import { RichTextReadOnly } from "mui-tiptap";
import { TextbookLesson } from "../../models/TextbookLesson";
import { useServiceProvider } from "../../services/ServiceProvider";
import { primaryGradientText } from "../../theme";
import useExtensions from '../tiptap/useExtensions';
import LinkButton from "../util/LinkButton";

interface TextbookLesssonContentProps {
  textbookLesson: TextbookLesson;
}

const TextbookLessonContent = ({ textbookLesson }: TextbookLesssonContentProps) => {
  const { accountStore: { hasQuestionAuthorAccess } } = useServiceProvider();

  const extensions = useExtensions({
    placeholder: ""
  });

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h3" sx={primaryGradientText}>
          {textbookLesson.title}
        </Typography>
        {hasQuestionAuthorAccess && (
          <LinkButton
            variant="contained"
            to={`/edit-textbook-lesson/${textbookLesson.id}`}
          >
            Edit
          </LinkButton>
        )}
      </Stack>

      {
        (hasQuestionAuthorAccess && !textbookLesson.isSubmitted) &&
        <Alert severity="info" sx={{ mb: 2 }}>
          This is a draft lesson. Students won't be able to see it until it's submitted.
        </Alert>
      }

      <Stack spacing={1}>
        {textbookLesson.contents.map((content, index) => (
          <Accordion
            key={index}
            disableGutters
            sx={{
              borderRadius: 1,
              '&:before': {
                display: 'none',  // This removes the separator
              },
              boxShadow: 'none',  // Optional: removes the default shadow
              border: '1px solid rgba(0, 0, 0, 0.12)'  // Optional: adds a consistent border
            }}
            defaultExpanded={index === 0}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`content-${index}-content`}
              id={`content-${index}-header`}
            >
              <Typography variant="h5">
                {content.heading}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <RichTextReadOnly content={content.text} extensions={extensions} />
            </AccordionDetails>
          </Accordion>
        ))}

      </Stack>
    </Box>
  );
};

export default TextbookLessonContent;