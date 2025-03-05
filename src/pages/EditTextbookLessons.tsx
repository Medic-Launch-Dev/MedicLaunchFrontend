import { Add } from "@mui/icons-material";
import { Button, Chip, CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Page from "../components/nav/Page";
import AddTextbookLessonModal from "../components/textbook/AddTextbookLessonModal";
import LinkButton from "../components/util/LinkButton";
import Unauthorised from "../components/util/Unauthorised";
import Speciality from "../models/Speciality";
import { TextbookLesson } from "../models/TextbookLesson";
import { useServiceProvider } from "../services/ServiceProvider";
import { primaryGradientText } from "../theme";

const EditTextbookLessons = () => {
  const [searchParams] = useSearchParams();
  const defaultSpeciality = searchParams.get('speciality');

  const { questionsStore, textbookLessonStore, accountStore: { hasQuestionAuthorAccess } } = useServiceProvider();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState<string>();
  const [textbookLessons, setTextbookLessons] = useState<TextbookLesson[]>();

  useEffect(() => {
    async function init() {
      const specialities = await questionsStore.getSpecialities();
      setSpecialities(specialities);
      if (defaultSpeciality) {
        setSelectedSpeciality(defaultSpeciality);
      } else if (specialities.length > 0) {
        setSelectedSpeciality(specialities[0].id);
      }
      setLoading(false);
    }
    init();
  }, [defaultSpeciality, questionsStore]);

  useEffect(() => {
    async function fetchTextbookLessons() {
      if (selectedSpeciality) {
        setLoading(true);
        const lessons = await textbookLessonStore.getTextbookLessonsBySpeciality(selectedSpeciality);
        setTextbookLessons(lessons);
        setLoading(false);
      }
    }
    fetchTextbookLessons();
  }, [selectedSpeciality, textbookLessonStore]);

  if (!hasQuestionAuthorAccess) return <Unauthorised />;

  return (
    <Page>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <LinkButton variant="contained" to="/author-portal">Author Portal</LinkButton>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>Add Lesson</Button>
      </Stack>

      <AddTextbookLessonModal open={open} onClose={() => setOpen(false)} specialityId={selectedSpeciality || ""} />

      <Typography style={primaryGradientText} variant="h3" mb={3}>Edit Textbook</Typography>

      <FormControl>
        <InputLabel>Specialities</InputLabel>
        <Select
          value={selectedSpeciality || ""}
          label={"Specialities"}
          onChange={e => setSelectedSpeciality(e.target.value as string)}
          sx={{ backgroundColor: "#fff", minWidth: 300, mb: 2 }}
        >
          {specialities.map(speciality => <MenuItem value={speciality.id} key={speciality.id}>{speciality.name}</MenuItem>)}
        </Select>
      </FormControl>

      {
        loading ?
          <Stack alignItems="center" my={3}>
            <CircularProgress />
          </Stack>
          :
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Condition</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Contents</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  textbookLessons && textbookLessons.length > 0 ?
                    textbookLessons
                      .sort((a, b) => (a.title || '').localeCompare(b.title || ''))
                      .map(lesson => (
                        <TableRow key={lesson.id}>
                          <TableCell>{lesson.title}</TableCell>
                          <TableCell>
                            {
                              lesson.isSubmitted ?
                                <Chip label="Submitted" sx={{ backgroundColor: "#A4E29F" }} /> :
                                <Chip label="Draft" />
                            }
                          </TableCell>
                          <TableCell>{lesson.contents.map(content => content.heading).join(", ")}</TableCell>
                          <TableCell>
                            <LinkButton
                              to={`/edit-textbook-lesson/${lesson.id}`}
                              variant="contained"
                              sx={{
                                fontWeight: 500,
                                fontSize: "14px",
                                width: "4px",
                                height: "32px",
                                paddingX: "0px",
                                paddingY: "20px"
                              }}
                            >
                              Edit
                            </LinkButton>
                          </TableCell>
                        </TableRow>
                      ))
                    :
                    <TableRow>
                      <TableCell colSpan={3} align="center" sx={{ py: 6 }}>No items in selected speciality</TableCell>
                    </TableRow>
                }
              </TableBody>
            </Table>
          </TableContainer>
      }
    </Page>
  );
}

export default observer(EditTextbookLessons);