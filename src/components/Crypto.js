import React, { useState, useEffect } from 'react';

//temp API
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const Crypto = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch(API_URL)
			.then(response => response.json())
			.then(data => setPosts(data));
	}, []);

	return <div>Crypto</div>;
};

export default Crypto;
