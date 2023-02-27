import { createSlice, createAsyncThunk } from '@reduxjs/toolkit/';

const initialState = {
	status: null,
	error: null,
	coins: [],
};

export const fetchCoins = createAsyncThunk(
	'/coins',
	async (dispatch, getState) => {
		try {
			const res = await fetch(
				'https://jsonplaceholder.typicode.com/posts',
			);
			const data = await res.json();
			return data;
		} catch (err) {
			console.log(err);
		}
	},
);

const coinSlice = createSlice({
	name: 'coinSlice',
	initialState,
	extraReducers(builder) {
		builder
			.addCase(fetchCoins.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchCoins.fulfilled, (state, action) => {
				state.status = 'succeeded';
				// Add any fetched posts to the array
				state.coins = state.coins.concat(action.payload);
			})
			.addCase(fetchCoins.rejected, (state, action) => {
				state.status = 'failed';
				state.error = 'rejected';
			});
	},
});

//exporting all reducer from counterSlice.reducer
export default coinSlice.reducer;
