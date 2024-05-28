import { Button, Stack, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useSnackbar } from "../../hooks/useSnackbar";
import Speciality from "../../models/Speciality";
import { useServiceProvider } from "../../services/ServiceProvider";
import TextSelect from "../util/TextSelect";

const FlashCardEditView = () => {
  const { showSnackbar, snackbarProps } = useSnackbar();

  const { questionsStore, flashCardStore } = useServiceProvider();

  const [image, setImage] = useState<string>();
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState<string>();

  useEffect(() => {
    questionsStore
      .getSpecialities()
      .then((specialities) => {
        setSpecialities(specialities);
      })
      .catch((e) => {
        console.error(e);
        showSnackbar("Failed to get specialities", "error");
      });
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      // save image to backend
      const imageUrl = flashCardStore.uploadImage(file).catch((e) => {
        console.error(e);
        showSnackbar("Failed to upload image", "error");
      });

      console.log("Image URL: ", imageUrl);
    }
  };

  return (
    <div>
      <Stack direction="row" alignItems="center" spacing={1}>
        <TextSelect
          label="Speciality"
          sx={{ minWidth: 300, bgcolor: "white" }}
          options={specialities.map((speciality) => ({
            value: speciality.id,
            displayText: speciality.name,
          }))}
          selected={selectedSpeciality}
          setSelected={setSelectedSpeciality}
        />
        <TextField label="Condition" sx={{ minWidth: 300 }} />
      </Stack>
      <Stack alignItems="center" mt={2} spacing={2}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <Button component="span" variant="outlined" color="primary">
            {image ? "Replace Image" : "Upload Image"}
          </Button>
        </label>
        {image ? (
          <img
            src={image}
            alt="Uploaded"
            style={{ maxWidth: "100%", maxHeight: 600, borderRadius: 16 }}
          />
        ) : (
          <Typography py={5} fontSize={16}>
            Upload an image to preview it here
          </Typography>
        )}
      </Stack>
    </div>
  );
};

export default observer(FlashCardEditView);
