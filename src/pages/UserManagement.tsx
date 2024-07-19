import { Add, Search } from '@mui/icons-material';
import { Button, Container, InputAdornment, OutlinedInput, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Page from '../components/nav/Page';
import AddUserModal from '../components/userManagement/AddUserModal';
import Unauthorized from '../components/util/Unauthorized';
import { useServiceProvider } from '../services/ServiceProvider';
import { primaryGradientText } from '../theme';

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
	const { userStore, accountStore: { hasAdminAccess } } = useServiceProvider();
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

	if (!hasAdminAccess) return <Unauthorized />;

	return rows && (
		<Page withNav>
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
			<AddUserModal open={open} onClose={() => setOpen(false)} />
		</Page>
	);
}
