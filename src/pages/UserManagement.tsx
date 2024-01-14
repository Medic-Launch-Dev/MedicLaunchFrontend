import { Add } from '@mui/icons-material';
import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { primaryGradientText } from '../theme';
import { Search } from '@mui/icons-material';

// Column Headers for the Datagrid 
const columns: GridColDef[] = [
    { 
        field: 'id', 
        headerName: '#',
        width: 30  
    },
    {
        field: 'fullName',
        headerName: 'USER',
        description: 'This column has a value getter and is not sortable.',
        width: 200,
        renderCell: (params: GridRenderCellParams) => (
            <div>
                <a style={{color: '#0c78a6', textDecoration: 'none'}} href="#">{`${params.row.firstName || ''} ${params.row.lastName || ''}`}</a>
            </div>
        ), 
    },
    {
        field: 'email',
        headerName: 'EMAIL',
        width: 200,
        renderCell: (params: GridRenderCellParams) => (
            <div>
                <a style={{color: '#0c78a6', textDecoration: 'none'}} href="#">{params.row.email}</a>
            </div>
        ),

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
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14, email: 'testemail@gmail.com', totalRevenue: "90", lastLoggedIn: '12/09/2024', mailingStatus: 'YES', totalProducts: 4 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31, email: 'testemail@gmail.com', totalRevenue: "90", lastLoggedIn: '12/09/2024', mailingStatus: 'YES', totalProducts: 4 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31, email: 'testemail@gmail.com', totalRevenue: "90", lastLoggedIn: '12/09/2024', mailingStatus: 'YES', totalProducts: 4 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11, email: 'testemail@gmail.com', totalRevenue: "90", lastLoggedIn: '12/09/2024', mailingStatus: 'YES', totalProducts: 4 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, email: 'testemail@gmail.com', totalRevenue: "90", lastLoggedIn: '12/09/2024', mailingStatus: 'YES', totalProducts: 4 },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150, email: 'testemail@gmail.com', totalRevenue: "90", lastLoggedIn: '12/09/2024', mailingStatus: 'YES', totalProducts: 4 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, email: 'testemail@gmail.com', totalRevenue: "90", lastLoggedIn: '12/09/2024', mailingStatus: 'YES', totalProducts: 4 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, email: 'testemail@gmail.com', totalRevenue: "90", lastLoggedIn: '12/09/2024', mailingStatus: 'YES', totalProducts: 4 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, email: 'testemail@gmail.com', totalRevenue: "90", lastLoggedIn: '12/09/2024', mailingStatus: 'YES', totalProducts: 4 },
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
                    disableRowSelectionOnClick
                    columnHeaderHeight={45}

                />
            </Box>
        </Container>
    </Container>
  );
}
