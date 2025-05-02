import { Box, Card, Chip, Link, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import Page from "../components/nav/Page";
import TextbookLessonContent from "../components/textbook/TextbookLessonContent";
import { TextbookLesson as TextbookLessonModel } from "../models/TextbookLesson";
import { useServiceProvider } from "../services/ServiceProvider";

const TextbookLesson = () => {
  const { specialityId = "" } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const lessonId = searchParams.get("lessonId") || "";
  const { textbookLessonStore, accountStore: { isSubscribed, hasQuestionAuthorAccess } } = useServiceProvider();
  const [textbookLessons, setTextbookLessons] = useState<Record<string, TextbookLessonModel>>({});
  const selectedLesson = textbookLessons[lessonId];

  useEffect(() => {
    const fetchLessons = async () => {
      const lessons = await textbookLessonStore.getTextbookLessonsBySpeciality(specialityId);
      setTextbookLessons(
        lessons.reduce((acc, lesson) => {
          acc[lesson.id || ""] = lesson;
          return acc;
        }, {} as Record<string, TextbookLessonModel>)
      );

      if (!lessonId && lessons.length > 0) {
        setSearchParams({ lessonId: lessons[0].id || "" });
      }
    };

    fetchLessons();
  }, []);

  const handleLessonChange = (newLessonId: string) => {
    setSearchParams({ lessonId: newLessonId });
  };

  if (isSubscribed === false) return <Navigate to="/subscribe" />;

  return (
    <Page withNav maxWidth="xl">
      <Box sx={{ display: "flex", gap: 4, p: 2, height: "100%" }}>
        <Stack width={350} gap={2} height="100%">
          <Card sx={{ flexShrink: 0, p: 2 }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography color="#B9B9B9" fontWeight={600} fontSize={13}>
                Speciality
              </Typography>
              <Link
                href="/clinical-companion"
                style={{ color: 'black', fontSize: 13, fontWeight: 500 }}
              >
                Change
              </Link>
            </Stack>
            <Typography variant="h4" color="primary" mt={0.5}>
              {textbookLessons[lessonId]?.speciality?.name || "Select a Speciality"}
            </Typography>
          </Card>
          <Card sx={{ flexGrow: 1, p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography color="#B9B9B9" fontWeight={600} fontSize={13}>
              Lessons
            </Typography>
            <Stack
              gap={2}
              mt={2}
              sx={{
                overflowY: 'auto',
                flexGrow: 1
              }}
            >
              {Object.values(textbookLessons)
                .sort((a, b) => (a.title || '').localeCompare(b.title || ''))
                .map((lesson) => (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography
                      key={lesson.id}
                      variant="h6"
                      color={lesson.id === lessonId ? "primary" : "#9e9e9e"}
                      onClick={() => handleLessonChange(lesson.id || "")}
                      sx={{ cursor: 'pointer' }}
                    >
                      {lesson.title}
                    </Typography>
                    {
                      (hasQuestionAuthorAccess && !lesson.isSubmitted) && (
                        <Chip label="Draft" />
                      )
                    }
                  </Stack>
                ))
              }
            </Stack>
          </Card>
        </Stack>
        <div style={{ flex: 1 }}>
          {selectedLesson && <TextbookLessonContent textbookLesson={selectedLesson} />}
        </div>
      </Box>
    </Page>
  );
};

export default TextbookLesson;