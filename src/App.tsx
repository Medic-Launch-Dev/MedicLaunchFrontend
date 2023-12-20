import Button from '@mui/material/Button';
import AppShell from './components/nav/AppShell';
import PageWithDrawer from './components/nav/PageWithDrawer';

function App() {
  return (
    <AppShell>
      <PageWithDrawer>
        <Button variant="contained">yo</Button>
      </PageWithDrawer>
    </AppShell>
  );
}

export default App;