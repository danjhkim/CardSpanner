import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Grid,
	Card,
	CardContent,
	Typography,
	Button,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TableContainer,
	Paper,
	Pagination,
	TextField,
} from '@mui/material';
import '../styles/Crypto.css';
import { fetchCoins } from '../slices/coinList';

const Crypto = () => {
	const [page, setPage] = useState(1);
	const [displayMode, setDisplayMode] = useState('card');
	const [itemsPerPage, setItemsPerPage] = useState(4);
	const coins = useSelector(state => state.coinReducer.coins);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCoins());
	}, [dispatch]);

	const handlePageChange = (event, value) => {
		setPage(value);
	};

	const handleToggleDisplayMode = () => {
		setDisplayMode(displayMode === 'card' ? 'table' : 'card');
	};

	useEffect(() => {
		if (displayMode === 'card') {
			setItemsPerPage(4);
		}
	}, [displayMode]);

	const handleItemsPerPageChange = event => {
		const newValue = parseInt(event.target.value, 10);
		setItemsPerPage(newValue);
		setPage(1);
	};

	const visiblePosts =
		displayMode === 'card'
			? coins.slice((page - 1) * itemsPerPage, page * itemsPerPage)
			: coins;

	const visibleRows =
		displayMode === 'table'
			? visiblePosts
					.slice((page - 1) * itemsPerPage, page * itemsPerPage)
					.map(coin => (
						<TableRow key={coin.id}>
							<TableCell>{coin.title}</TableCell>
							<TableCell>{coin.body}</TableCell>
						</TableRow>
					))
			: visiblePosts.map(coin => (
					<Grid item xs={12} md={3} key={coin.id}>
						<Card>
							<CardContent>
								<Typography variant='h5' sx={{ mb: 4 }}>
									{coin.title}
								</Typography>
								<Typography variant='body1' sx={{ mb: 1 }}>
									<span className='subtitle'>Brand:</span>{' '}
									{coin.body}
								</Typography>
								<Typography variant='body1' sx={{ mb: 1 }}>
									<span className='subtitle'>Info:</span>{' '}
									{coin.body}
								</Typography>
								<Typography variant='body1' sx={{ mb: 1 }}>
									<span className='subtitle'>Contact:</span>{' '}
									{coin.body}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
			  ));

	return (
		<div className='cryptoBlock' data-testid='Crypto-test'>
			<Grid container spacing={2}>
				{displayMode === 'card' && visibleRows}
				{displayMode === 'table' && (
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Title</TableCell>
									<TableCell>Body</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>{visibleRows}</TableBody>
						</Table>
					</TableContainer>
				)}
				<div className='botNav'>
					<Grid item xs={12}>
						{displayMode === 'table' && (
							<TextField
								sx={{ ml: 2 }}
								label='Items per page'
								variant='outlined'
								type='number'
								value={itemsPerPage}
								onChange={handleItemsPerPageChange}
							/>
						)}
						<Pagination
							className='pagination'
							sx={{ mt: 2 }}
							count={Math.ceil(coins.length / itemsPerPage)}
							page={page}
							onChange={handlePageChange}
							color='primary'
							size='medium'
						/>
					</Grid>
					<Grid item xs={12} className='button' sx={{ mt: 2 }}>
						<Button
							variant='contained'
							color='primary'
							onClick={handleToggleDisplayMode}>
							{displayMode === 'card'
								? 'Switch to Table'
								: 'Switch to Card'}
						</Button>
					</Grid>
				</div>
			</Grid>
		</div>
	);
};

export default Crypto;
