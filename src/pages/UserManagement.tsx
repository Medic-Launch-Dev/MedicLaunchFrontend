import { Add } from '@mui/icons-material';
import { Button, Card, Dialog, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import Page from '../components/nav/Page';
import UserProfile from '../components/profile/UserProfile';
import AddUserModal from '../components/userManagement/AddUserModal';
import Unauthorized from '../components/util/Unauthorized';
import { useServiceProvider } from '../services/ServiceProvider';
import { primaryGradientText } from '../theme';

interface TableRow {
	id: string;
	fullName: string;
	email: string;
	totalProducts: number;
	totalRevenue: number;
	lastLoggedIn: string;
	mailingStatus: string;
}

const dataGridStyles = {
	'.MuiDataGrid-columnHeader': {
		backgroundColor: '#F9FAFD',
		color: '#687182',
		fontSize: '14px'
	},
	'&.MuiDataGrid-root': {
		border: 'none',
		maxWidth: '100%',
	},
}


function UserManagement() {
	const [open, setOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const { userStore, accountStore: { hasAdminAccess } } = useServiceProvider();
	const [rows, setRows] = useState<TableRow[]>([]);
	const [selectedRows, setSelectedRows] = useState<TableRow[]>([]);

	const columns: GridColDef[] = [
		{
			field: 'fullName',
			headerName: 'USER',
			width: 200,
			renderCell: (params) => (
				<div style={{ color: "#2394c4", cursor: "pointer" }} onClick={e => {
					e.stopPropagation();
					userStore.userInViewIdx = parseInt(params.row.id);
					setEditOpen(true);
				}}>
					{params.value}
				</div>
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

	useEffect(() => {
		if (userStore.users) {
			const newRows: TableRow[] = userStore.users.map((user, idx) => ({
				id: idx.toString(),
				fullName: `${user.firstName} ${user.lastName}`,
				email: user.email,
				totalProducts: 0,
				totalRevenue: 0,
				lastLoggedIn: '',
				mailingStatus: user.subscribeToPromotions ? 'Subscribed' : 'Unsubscribed'
			}));
			setRows(newRows);
		}
	}, [userStore.users]);

	useEffect(() => {
		userStore.getUserList();
		return function cleanup() {
			userStore.userInViewIdx = null;
		};
	}, []);

	if (!hasAdminAccess) return <Unauthorized />;

	return rows && (
		<Page withNav fullWidth>
			<Stack direction='row' justifyContent='space-between' alignItems='baseline' my={4}>
				<Typography variant='h2' style={primaryGradientText}>Medic Launch HQ</Typography>
				<Button variant='contained' startIcon={<Add />} onClick={() => setOpen(true)}>
					Add User
				</Button>
			</Stack>

			<Stack direction='row' justifyContent='right' alignItems='center' pb={3} spacing={1}>
				<Button variant='contained' disabled={selectedRows.length !== 1}>Delete</Button>
				<Button variant='contained' disabled={selectedRows.length < 1}>Send Notification</Button>
			</Stack>

			<Card sx={{ height: '100%', p: 0, minWidth: 0 }}>
				<DataGrid
					sx={dataGridStyles}
					rows={rows}
					columns={columns}
					checkboxSelection
					columnHeaderHeight={45}
					onRowSelectionModelChange={(ids) => {
						const selectedIDs = new Set(ids);
						const selectedRowData = rows.filter(row => selectedIDs.has(row.id.toString()));
						setSelectedRows(selectedRowData);
					}}
				/>
			</Card>
			<AddUserModal open={open} onClose={() => setOpen(false)} />
			<Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="lg">
				<DialogTitle>View User Profile</DialogTitle>
				<DialogContent>
					<UserProfile adminView />
				</DialogContent>
			</Dialog>
		</Page>
	);
}

export default observer(UserManagement);