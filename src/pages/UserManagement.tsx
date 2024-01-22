import { Add } from '@mui/icons-material';
import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { primaryGradientText } from '../theme';
import { Search } from '@mui/icons-material';

// Column Headers for the Datagrid 
const columns: GridColDef[] = [
    { 
        field: 'id', 
        headerName: '#',
        width: 30,  
    },
    {
        field: 'fullName',
        headerName: 'USER',
        width: 200,
    },
    {
        field: 'email',
        headerName: 'EMAIL',
        width: 200,
    },
    {
        field: 'totalProducts',
        headerName: 'TOTAL PRODUCTS',
        width: 160,
        editable: false,
    },
    {
        field: 'totalRevenue',
        headerName: 'TOTAL REVENUE',
        width: 150,
        editable: false,
    },
    {
        field: 'lastLoggedIn',
        headerName: 'LAST LOGGED IN',
        flex: 1,
        editable: false,
    },
    {
        field: 'mailingStatus',
        headerName: 'MAILING STATUS',
        flex: 1,
        editable: false,
    },
    
   
];

// This data is just an example to display on the grid, the rows attribute in datagrid should take an array of objects
const rows = [
  { id: 1, fullName: 'Snow Jon', age: 14, email: 'testemail@gmail.com', totalRevenue: 90, lastLoggedIn: '12/09/2024', mailingStatus: 'YES', totalProducts: 24 },
  { id: 2, fullName: 'Lannister Cersei', age: 31, email: 'asd@gmail.com', totalRevenue: 290, lastLoggedIn: '12/09/2024', mailingStatus: 'YES', totalProducts: 2 },
  { id: 3, fullName: 'Lannister Jaime', age: 31, email: 'gfg@gmail.com', totalRevenue: 910, lastLoggedIn: '12/09/2024', mailingStatus: 'YES', totalProducts: 15},
  { id: 4, fullName: 'Stark Arya', age: 11, email: 'testemail@gmail.com', totalRevenue: 90, lastLoggedIn: '12/09/2024', mailingStatus: 'YES', totalProducts: 5},
  { id: 5, fullName: 'Targaryen Daenerys', age: null, email: 'ere@gmail.com', totalRevenue: 40, lastLoggedIn: '12/09/2024', mailingStatus: 'YES', totalProducts: 1},
  { id: 6, fullName: 'Melisandre', age: 150, email: 'testemail@gmail.com', totalRevenue: 90, lastLoggedIn: '12/09/2024', mailingStatus: 'YES', totalProducts: 5},
  { id: 7, fullName: 'Clifford Ferrara', age: 44, email: 'cxc@gmail.com', totalRevenue: 90, lastLoggedIn: '12/09/2024', mailingStatus: 'YES', totalProducts: 43 },
  { id: 8, fullName: 'Frances Rossini', age: 36, email: 'testemail@gmail.com', totalRevenue: 90, lastLoggedIn: '12/09/2024', mailingStatus: 'YES', totalProducts: 41 },
  { id: 9, fullName: 'Roxie Harvey', age: 65, email: 'testemail@gmail.com', totalRevenue: 9, lastLoggedIn: '12/09/2024', mailingStatus: 'YES', totalProducts: 4 },
];

export default function UserManagement() {
    const dataGridStyles = {
        '.MuiDataGrid-columnHeader': {
            backgroundColor: '#F9FAFD',
            color: '#687182',
            fontSize: '16px'
        },
        '&.MuiDataGrid-root': {
          border: 'none',
          width: '100%',
          margin: 0, 
        },
      }

      const searchBarInputLabel =  <Stack direction='row' alignItems='center' gap='15px' fontSize='15px'><Search/> Search</Stack>   

    return (
    <Container >
        <Stack direction='row' justifyContent='space-between' alignItems='baseline' mb={6} mt={4}>
            <Typography variant='h2' style={primaryGradientText}>Medic Launch HQ</Typography>
            <Button variant='contained' >Add User <Add/> </Button>
        </Stack>

        <Container sx={{'&.MuiContainer-root':{height: '100%', backgroundColor: '#fff', paddingLeft: 0, paddingRight: 0, borderRadius:'20px'}}}>
            <Stack direction='row' justifyContent='space-between' alignItems='center' m={4} pt={4} >
                <TextField
                    label={searchBarInputLabel}
                    sx={{ width:'40%'}}
                />
                <Stack direction='row' gap={2}>
                    <Button variant='contained'>Delete</Button>
                    <Button variant='contained'>Send Notification</Button>
                </Stack>
            </Stack>

            <Box sx={{ height: '100%'}}>
                <DataGrid
                    sx={dataGridStyles}
                    rows={rows}
                    columns={columns}
                    checkboxSelection
                    columnHeaderHeight={45}
                />
            </Box>
        </Container>
    </Container>
  );
}
