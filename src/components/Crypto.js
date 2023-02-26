import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import '../styles/Crypto.css';

//temp API
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const Crypto = () => {
	const [posts, setPosts] = useState([]);
	const [startIndex, setStartIndex] = useState(0);

	console.log(posts);

	const visiblePosts = posts.slice(startIndex, startIndex + 4);

	useEffect(() => {
		fetch(API_URL)
			.then(response => response.json())
			.then(data => setPosts(data));
	}, []);

	return (
		<div className='cryptoBlock'>
			<Grid container spacing={2}>
				{visiblePosts.map(post => (
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
				))}
			</Grid>
		</div>
	);
};

export default Crypto;
