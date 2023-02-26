import React, { useState, useEffect } from 'react';
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

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

function App() {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [displayMode, setDisplayMode] = useState('card');
	const [itemsPerPage, setItemsPerPage] = useState(4);

	useEffect(() => {
		fetch(API_URL)
			.then(response => response.json())
			.then(data => setPosts(data));
	}, []);

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
			? posts.slice((page - 1) * itemsPerPage, page * itemsPerPage)
			: posts;

	const visibleRows =
		displayMode === 'table'
			? visiblePosts
					.slice((page - 1) * itemsPerPage, page * itemsPerPage)
					.map(post => (
						<TableRow key={post.id}>
							<TableCell>{post.title}dfsdfds</TableCell>
							<TableCell>{post.body}</TableCell>
						</TableRow>
					))
			: visiblePosts.map(post => (
					<Grid item xs={12} md={3} key={post.id}>
						<Card>
							<CardContent>
								<Typography variant='h5' sx={{ mb: 4 }}>
									{post.title}
								</Typography>
								<Typography variant='body1' sx={{ mb: 1 }}>
									Body: {post.body}
								</Typography>
								<Typography variant='body1' sx={{ mb: 1 }}>
									Body: {post.body}
								</Typography>
								<Typography variant='body1' sx={{ mb: 1 }}>
									Body: {post.body}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
			  ));

	return (
		<div className='cryptoBlock'>
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

				<Grid item xs={12}>
					{displayMode === 'table' && (
						<TextField
							label='Items per page'
							variant='outlined'
							type='number'
							value={itemsPerPage}
							onChange={handleItemsPerPageChange}
						/>
					)}
					<Pagination
						count={Math.ceil(posts.length / itemsPerPage)}
						page={page}
						onChange={handlePageChange}
						color='primary'
						size='large'
					/>
				</Grid>
				<Grid item xs={12}>
					<Button
						sx={{ mr: 4 }}
						variant='contained'
						color='primary'
						onClick={handleToggleDisplayMode}>
						{displayMode === 'card'
							? 'Switch to Table'
							: 'Switch to Card'}
					</Button>
				</Grid>
			</Grid>
		</div>
	);
}

export default App;
