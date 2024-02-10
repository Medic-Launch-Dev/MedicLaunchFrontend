import { Box, Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import theme from "../../theme";
import IMGIcon from "../icons/IMGIcon";
import MedicalStudentIcon from "../icons/MedicalStudentIcon";
import QuestionBankOption from "./QuestionBankOption";

export const QuestionBankSelection = observer(() => {
  const questionBanks = [
    {
      name: "UKMLA AKT MEDICAL STUDENT",
      icon: IMGIcon,
    },
    {
      name: "UKMLA AKT IMG",
      icon: MedicalStudentIcon,
    }
  ]
  const [selectedQB, setSelectedQB] = useState(questionBanks[0].name);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', bgcolor: 'white', borderRadius: 1.5 }}>
      <Stack sx={{ maxWidth: 400, m: 'auto' }} spacing={3}>
        {
          questionBanks.map(({ name, icon: Icon }) => (
            <QuestionBankOption
              text={name}
              selected={selectedQB === name}
              setSelected={setSelectedQB}
              icon={selectedQB === name ? <Icon color={theme.palette.primary.main} /> : <Icon color="white" />}
            />
          ))
        }
      </Stack>
    </Box>
  )
})