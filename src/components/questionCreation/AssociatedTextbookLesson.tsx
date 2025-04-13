import { Card, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Question } from "../../models/Question";
import { TextbookLesson } from "../../models/TextbookLesson";
import { useServiceProvider } from "../../services/ServiceProvider";
import { primaryGradientText } from "../../theme";
import LinkButton from "../util/LinkButton";
import GenerateLessonFromQuestionButton from "./GenerateLessonFromQuestionButton";

interface AssociatedTextbookLessonProps {
  question?: Question;
}

export default function AssociatedTextbookLesson({ question }: AssociatedTextbookLessonProps) {
  const navigate = useNavigate();
  const { textbookLessonStore } = useServiceProvider();
  const [associatedLesson, setAssociatedLesson] = useState<TextbookLesson | null>(null);

  useEffect(() => {
    fetchAssociatedLesson();
  }, [question]);

  async function fetchAssociatedLesson() {
    if (question?.id) {
      const lesson = await textbookLessonStore.getTextbookLessonByQuestionId(question.id);
      setAssociatedLesson(lesson);
    }
  }

  const handleViewLesson = () => {
    if (associatedLesson?.id) {
      navigate(`/clinical-companion/${associatedLesson.specialityId}?lessonId=${associatedLesson.id}`);
    }
  };

  return (
    <Stack spacing={1}>
      <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" sx={primaryGradientText}>
          Clinical Companion
        </Typography>
        {
          associatedLesson ?
            <LinkButton size="small" variant="text" to={`/edit-clinical-companion-lesson/${associatedLesson.id}`}>
              Edit
            </LinkButton>
            :
            (
              question &&
              <GenerateLessonFromQuestionButton
                learningPoints={question.learningPoints}
                questionId={question.id}
                specialityId={question.specialityId}
                refetchAssociatedLesson={fetchAssociatedLesson}
              />
            )
        }
      </Stack>

      {associatedLesson ? (
        <Card onClick={handleViewLesson} sx={{ cursor: "pointer", ":hover": { color: "primary.main" } }}>
          <Stack spacing={1}>
            <Typography variant="body1" fontWeight={500}>
              {associatedLesson.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {associatedLesson.contents.map(content => content.heading).join(', ')}
            </Typography>
          </Stack>
        </Card>
      ) : (
        <Card>
          <Typography color="text.secondary">
            No associated lesson found
          </Typography>
        </Card>
      )}
    </Stack>
  );
}