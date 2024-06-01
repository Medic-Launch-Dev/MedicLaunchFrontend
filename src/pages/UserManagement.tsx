import { Add, Search } from '@mui/icons-material';
import { Button, Container, InputAdornment, OutlinedInput, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageWithNav from '../components/nav/PageWithNav';
import AddUserModal from '../components/userManagement/AddUserModal';
import { primaryGradientText } from '../theme';
import { useServiceProvider } from '../services/ServiceProvider';

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
		renderCell: (params) => (
			<Link to={`/my-profile`} style={{ color: "#2394c4", textDecoration: 'none' }}>{params.value}</Link>
		)
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

// const rows = [
// 	{ id: 1, fullName: 'Abdullah Raja', age: 24, email: 'abdullah@gmail.com', totalRevenue: 90, lastLoggedIn: '12/09/2024', mailingStatus: 'YES', totalProducts: 24 },
// 	{ id: 2, fullName: 'Khalid Abdilahi', age: 27, email: 'khalid@gmail.com', totalRevenue: 290, lastLoggedIn: '12/09/2024', mailingStatus: 'YES', totalProducts: 2 },
// 	{ id: 3, fullName: 'Elyas Faiq', age: 12, email: 'elyas@gmail.com', totalRevenue: 40, lastLoggedIn: '12/09/2024', mailingStatus: 'YES', totalProducts: 1 },
// 	{ id: 4, fullName: 'Sajjad Khalil', age: 25, email: 'sajjad@gmail.com', totalRevenue: 910, lastLoggedIn: '12/09/2024', mailingStatus: 'YES', totalProducts: 15 },
// 	{ id: 5, fullName: 'Riaz Riaz', age: 21, email: 'riaz@gmail.com', totalRevenue: 90, lastLoggedIn: '12/09/2024', mailingStatus: 'YES', totalProducts: 5 },
// 	{ id: 6, fullName: 'Dawud Mehmood', age: 150, email: 'technowhizz@gmail.com', totalRevenue: 90, lastLoggedIn: '12/09/2024', mailingStatus: 'YES', totalProducts: 5 },
// 	{ id: 7, fullName: 'Clifford Ferrara', age: 44, email: 'cxc@gmail.com', totalRevenue: 90, lastLoggedIn: '12/09/2024', mailingStatus: 'YES', totalProducts: 43 },
// 	{ id: 8, fullName: 'Frances Rossini', age: 36, email: 'testemail@gmail.com', totalRevenue: 90, lastLoggedIn: '12/09/2024', mailingStatus: 'YES', totalProducts: 41 },
// 	{ id: 9, fullName: 'Roxie Harvey', age: 65, email: 'testemail@gmail.com', totalRevenue: 9, lastLoggedIn: '12/09/2024', mailingStatus: 'YES', totalProducts: 4 },
// ];

const dataGridStyles = {
	'.MuiDataGrid-columnHeader': {
		backgroundColor: '#F9FAFD',
		color: '#687182',
		fontSize: '14px'
	},
	'&.MuiDataGrid-root': {
		border: 'none',
		width: '100%',
		margin: 0,
	},
}


export default function UserManagement() {
	const [open, setOpen] = useState(false);
	const { userStore } = useServiceProvider();
	const [rows, setRows] = useState([]);
	
// Create use effect to fetch data from the server
useEffect(() => {
	// Fetch data from the server
	userStore.getUserList().then((data) => {
		setRows(data);
	}).catch(e => {
		console.error(e);
	});
}, []);

	return rows && (
		<PageWithNav>
			<Container >
				<Stack direction='row' justifyContent='space-between' alignItems='baseline' my={4}>
					<Typography variant='h2' style={primaryGradientText}>Medic Launch HQ</Typography>
					<Button variant='contained' startIcon={<Add />} onClick={() => setOpen(true)}>
						Add User
					</Button>
				</Stack>

				<Container sx={{ '&.MuiContainer-root': { height: '100%', backgroundColor: '#fff', paddingLeft: 0, paddingRight: 0, borderRadius: '20px' } }}>
					<Stack direction='row' justifyContent='space-between' alignItems='center' p={3} >
						<OutlinedInput
							size="small"
							placeholder="Search"
							startAdornment={
								<InputAdornment position="start">
									<Search />
								</InputAdornment>
							}
							sx={{ width: '40%' }}
						/>
						<Stack direction='row' gap={1}>
							<Button variant='contained'>Delete</Button>
							<Button variant='contained'>Send Notification</Button>
						</Stack>
					</Stack>

					<Box sx={{ height: '100%' }}>
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
			<AddUserModal open={open} onClose={() => setOpen(false)} />
		</PageWithNav>
	);
}
