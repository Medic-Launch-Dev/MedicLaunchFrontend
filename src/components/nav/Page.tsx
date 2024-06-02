import { Alert, Box, Container, ContainerProps } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useServiceProvider } from "../../services/ServiceProvider";
import NavMenu from "./NavMenu";

interface PageProps extends ContainerProps {
  children: React.ReactNode;
  withNav?: boolean;
  fullWidth?: boolean;
}

function Page({ children, withNav, maxWidth, fullWidth, sx, ...rest }: PageProps) {
  const { errorStore } = useServiceProvider();

  return (
    <Container sx={{ display: 'flex', ...sx,  }} maxWidth={fullWidth ? false : maxWidth || 'lg'} {...rest}>
      {withNav && <NavMenu />}
      <Box sx={{ width: '100%', height: '100%' }}>
        {
          errorStore.errorMessage &&
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorStore.errorMessage}
          </Alert>
        }
        {children}
      </Box>
    </Container>
  )
}

export default observer(Page);