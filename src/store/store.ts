import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import imgurReducer from './imgurSlice'

const rootReducer = combineReducers({
	imgur: imgurReducer,
})

export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
	reducer: rootReducer,
})

export default store
