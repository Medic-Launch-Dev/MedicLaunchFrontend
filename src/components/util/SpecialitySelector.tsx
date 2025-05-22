import { Box, CircularProgress, Grid, Snackbar, Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../hooks/useSnackbar";
import Speciality from "../../models/Speciality";
import { useServiceProvider } from "../../services/ServiceProvider";
import SpecialityOption from "../createSession/SpecialityOption";

interface SpecialitySelectorProps {
  selectedSpecialityId: string;
  setSelectedSpecialityId: (specialityId: string) => void;
  redirectPath?: string;
  limitToFirst4?: boolean;
}

export const SpecialitySelector = observer(({
  selectedSpecialityId,
  setSelectedSpecialityId,
  redirectPath,
  limitToFirst4 = false,
}: SpecialitySelectorProps) => {
  const navigate = useNavigate();
  const { questionsStore } = useServiceProvider();
  const { showSnackbar, snackbarProps } = useSnackbar();
  const [specialities, setSpecialitiesList] = useState<Speciality[]>([]);

  const handleSpecialityClick = (speciality: string) => {
    setSelectedSpecialityId(speciality);
  };

  useEffect(() => {
    if (selectedSpecialityId && redirectPath) {
      navigate(redirectPath);
    }

    questionsStore.getSpecialities()
      .then((specialities) => {
        setSpecialitiesList(specialities);
      })
      .catch(e => {
        console.error(e);
        showSnackbar('Failed to get specialities', 'error');
      });
  }, []);

  const isInFirst4 = (specialityId: string) => {
    const first4Ids = specialities.slice(0, 4).map(s => s.id);
    return first4Ids.includes(specialityId);
  }

  return (
    <Box sx={{
      bgcolor: "white",
      borderRadius: 1.5,
      p: 4,
      maxHeight: "100%",
      overflowY: "scroll",
    }}>
      <Snackbar {...snackbarProps} />
      {specialities && specialities.length > 0 ? (
        <Grid container spacing={2}>
          {specialities.map((speciality) => (
            <Grid item xs={12} sm={6} md={3} key={speciality.id}>
              <SpecialityOption
                selected={selectedSpecialityId === speciality.id}
                setSelected={handleSpecialityClick}
                speciality={speciality}
                locked={limitToFirst4 && !isInFirst4(speciality.id)}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
      )}
    </Box>
  );
});