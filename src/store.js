import { configureStore } from '@reduxjs/toolkit';
import coinReducer from './slices/coinList';
// import naming convention is kind of weird emeryjs does it?

export default configureStore({
	reducer: { coinReducer },
});
