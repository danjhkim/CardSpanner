import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

//temp API
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const Crypto = () => {
	const [posts, setPosts] = useState([]);
	const [startIndex, setStartIndex] = useState(0);

	const visiblePosts = posts.slice(startIndex, startIndex + 4);

	useEffect(() => {
		fetch(API_URL)
			.then(response => response.json())
			.then(data => setPosts(data));
	}, []);

	return (
		<div>
			<Grid container spacing={2}>
				{visiblePosts.map(post => (
					<Grid item xs={12} md={3} key={post.id}>
						<Card>
							<CardContent>
								<Typography variant='h5'>
									{post.title}
								</Typography>
								<Typography variant='body2'>
									{post.body}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default Crypto;
