import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import Crypto from '../components/Crypto';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();

describe('App Component tests', () => {
	let store;

	beforeEach(() => {
		store = mockStore({
			coinReducer: {
				coins: [
					{ id: 1, title: 'Post 1', body: 'Body of post 1' },
					{ id: 2, title: 'Post 2', body: 'Body of post 2' },
					{ id: 3, title: 'Post 3', body: 'Body of post 3' },
					{ id: 4, title: 'Post 4', body: 'Body of post 4' },
					{ id: 5, title: 'Post 5', body: 'Body of post 5' },
				],
				status: 'succeeded',
				error: null,
			},
		});

		store.dispatch = jest.fn();
	});

	it('renders Crypto component', () => {
		render(
			<Provider store={store}>
				<Crypto />
			</Provider>,
		);

		const linkElement = screen.getByTestId('Crypto-test');
		expect(linkElement).toBeInTheDocument();
	});

	it('switch to table button exists', () => {
		render(
			<Provider store={store}>
				<Crypto />
			</Provider>,
		);

		const cardViewButton = screen.getByRole('button', {
			name: 'Switch to Table',
		});
		expect(cardViewButton).toBeInTheDocument();
	});

	it('switches to the table view when the button is clicked', () => {
		render(
			<Provider store={store}>
				<Crypto />
			</Provider>,
		);

		const toggleViewButton = screen.getByRole('button', {
			name: 'Switch to Table',
		});
		fireEvent.click(toggleViewButton);

		const tableViewButton = screen.getByRole('button', {
			name: 'Switch to Card',
		});
		expect(tableViewButton).toBeInTheDocument();
	});

	it('shows the correct number of items per page in the table view', () => {
		render(
			<Provider store={store}>
				<Crypto />
			</Provider>,
		);

		const toggleViewButton = screen.getByRole('button', {
			name: 'Switch to Table',
		});
		fireEvent.click(toggleViewButton);

		const itemsPerPageInput = screen.getByLabelText('Items per page');
		fireEvent.change(itemsPerPageInput, { target: { value: '5' } });

		const visibleRows = screen.getAllByRole('row').slice(1); // ignore table header row
		expect(visibleRows).toHaveLength(5);
	});

	it('paginates correctly in the card view', () => {
		render(
			<Provider store={store}>
				<Crypto />
			</Provider>,
		);

		// initial page load should show first 4 items
		expect(screen.getByText('Post 1')).toBeInTheDocument();
		expect(screen.getByText('Post 2')).toBeInTheDocument();
		expect(screen.getByText('Post 3')).toBeInTheDocument();
		expect(screen.getByText('Post 4')).toBeInTheDocument();
		expect(screen.queryByText('Post 5')).not.toBeInTheDocument();
	});
});
