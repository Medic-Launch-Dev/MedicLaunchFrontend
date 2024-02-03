import styled from "@emotion/styled";
import { LinearProgress } from "@mui/material";

export const Loading = styled(LinearProgress)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: 3,
  zIndex: 10000,
})