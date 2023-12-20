import styled from "@emotion/styled";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

interface ProgressIndicatorProps {
  correctValue: number;
  incorrectValue: number;
}

export default function ProgressIndicator({ correctValue, incorrectValue }: ProgressIndicatorProps) {
  const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.bar}`]: {
      backgroundColor: '#FFABAB',
    },
    [`& .${linearProgressClasses.barColorPrimary}`]: {
      borderRadius: 5,
      backgroundColor: '#A4E29F',
    },
  }));

  return <StyledLinearProgress variant="buffer" value={correctValue} valueBuffer={incorrectValue} />
}