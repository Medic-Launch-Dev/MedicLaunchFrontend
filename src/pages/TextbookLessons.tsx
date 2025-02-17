import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import TextbookLessonContent from "../components/textbook/TextbookLessonContent";
import LinkButton from "../components/util/LinkButton";
import { TextbookLesson } from "../models/TextbookLesson";
import { useServiceProvider } from "../services/ServiceProvider";

const TextbookLessons = () => {
  const { specialityId = "" } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const lessonId = searchParams.get("lessonId") || "";
  const { textbookLessonStore, accountStore: { hasQuestionAuthorAccess } } = useServiceProvider();
  const [textbookLessons, setTextbookLessons] = useState<Record<string, TextbookLesson>>({});
  const selectedLesson = textbookLessons[lessonId];

  useEffect(() => {
    const fetchLessons = async () => {
      const lessons = await textbookLessonStore.getTextbookLessonsBySpeciality(specialityId);
      setTextbookLessons(
        lessons.reduce((acc, lesson) => {
          acc[lesson.id || ""] = lesson;
          return acc;
        }, {} as Record<string, TextbookLesson>)
      );
    };

    fetchLessons();
  }, []);

  const handleLessonChange = (newLessonId: string) => {
    setSearchParams({ lessonId: newLessonId });
  };

  return (
    <div style={{ display: "flex" }}>
      <div>
        {hasQuestionAuthorAccess && <LinkButton variant="contained" to={`/edit-textbook-lesson/${lessonId}`}>Edit</LinkButton>}
        <h3>{textbookLessons[lessonId]?.speciality?.name}</h3>
        <ul>
          {Object.values(textbookLessons).map((lesson) => (
            <li key={lesson.id}>
              <button onClick={() => handleLessonChange(lesson.id || "")}>
                {lesson.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: 1, padding: "20px" }}>
        {selectedLesson && <TextbookLessonContent textbookLesson={selectedLesson} />}
      </div>
    </div>
  );
};

export default TextbookLessons;