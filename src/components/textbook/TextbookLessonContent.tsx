import { TextbookLesson } from "../../models/TextbookLesson";
interface TextbookLesssonContentProps {
  textbookLesson: TextbookLesson;
}

const TextbookLessonContent = ({ textbookLesson }: TextbookLesssonContentProps) => {
  return (
    <div>
      <h1>{textbookLesson.title}</h1>
      {
        textbookLesson.contents.map((content, index) => (
          <div key={index}>
            <h2>{content.heading}</h2>
            <p>{content.text}</p>
          </div>
        ))
      }
    </div>
  );
};

export default TextbookLessonContent;