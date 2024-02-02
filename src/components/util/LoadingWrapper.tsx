import { CircularProgress, Stack } from "@mui/material";

export const LoadingWrapper = ({ children, isLoading }) => {
  if (isLoading) {
    return (
      <Stack alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }
  return children;
};
