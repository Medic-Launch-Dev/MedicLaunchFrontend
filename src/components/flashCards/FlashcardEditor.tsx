import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Snackbar, Stack, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useSnackbar } from "../../hooks/useSnackbar";
import { Flashcard } from "../../models/Flashcard";
import Speciality from "../../models/Speciality";
import { useServiceProvider } from "../../services/ServiceProvider";
import TextSelect from "../util/TextSelect";

interface FlashcardEditorProps {
  flashcard: Flashcard;
  setFlashcard: (flashcard: Flashcard) => void;
}


const FlashcardEditor = ({ flashcard, setFlashcard }: FlashcardEditorProps) => {
  const { showSnackbar, snackbarProps } = useSnackbar();

  const { questionsStore, flashCardStore } = useServiceProvider();

  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState<string>(flashcard?.specialityId || '');

  useEffect(() => {
    questionsStore.getSpecialities()
      .then((specialities) => {
        setSpecialities(specialities);
      })
      .catch(e => {
        console.error(e);
        showSnackbar('Failed to get specialities', 'error');
      });
  }, []);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        setLoadingImage(true);
        const imageUrl = await flashCardStore.uploadFlashCardImage(file);
        if (imageUrl) setFlashcard({ ...flashcard, imageUrl });
      } catch (e) {
        console.error(e);
        showSnackbar('Failed to upload image', 'error');
      } finally {
        setLoadingImage(false);
      }
    }
  };

  return (
    <div>
      <Snackbar {...snackbarProps} />
      <Stack direction="row" alignItems="center" spacing={1}>
        <TextSelect
          label="Speciality"
          sx={{ minWidth: 300, bgcolor: 'white' }}
          options={specialities.map(speciality => ({
            value: speciality.id,
            displayText: speciality.name
          }))}
          selected={flashcard.specialityId}
          setSelected={(specialityId) => setFlashcard({ ...flashcard, specialityId })}
        />
        <TextField
          label="Condition"
          sx={{ minWidth: 300 }}
          value={flashcard.name || ''}
          onChange={(e) => setFlashcard({ ...flashcard, name: e.target.value })}
        />
      </Stack>
      <Stack alignItems="center" mt={2} spacing={2}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <LoadingButton
            component="span"
            variant="outlined"
            color="primary"
            loading={loadingImage}
            loadingPosition="start"
            startIcon={<AddPhotoAlternateOutlined />}
          >
            {
              flashcard.imageUrl ? "Replace Image" : "Upload Image"
            }
          </LoadingButton>
        </label>
        {
          flashcard.imageUrl ?
            <img src={flashcard.imageUrl} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: 600, borderRadius: 16 }} />
            :
            <Typography py={5} fontSize={16}>Upload an image to preview it here</Typography>
        }
      </Stack>
    </div>
  );
}

export default observer(FlashcardEditor);