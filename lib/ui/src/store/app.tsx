import React, {
	createContext,
	useEffect,
	useReducer,
	useState,
} from 'react'
import API from '../api';
import { Typography } from '@mui/material';

export interface App {
	data: any[]
}

export type AppActionType = "UPDATE_APP"

export type AppAction = {
	type: AppActionType
	app: App
}

type ContextValue = {
	state: AppState
	dispatch: (action: AppAction) => void
}

type AppState = typeof initialState

const initialState = {
	app: {
		data: [],
	} as App,
}

export const AppStore = createContext({} as ContextValue)

export const AppProvider: React.FC<{}> = ({ children }) => {
	const [state, dispatch] = useReducer(
		(state: AppState, action: AppAction) => {
			switch (action.type) {
				case "UPDATE_APP":
					return { ...state, app: action.app }
				default:
					throw new Error()
			};
		},
		initialState,
	)

	const [loading, setLoading] = useState(true)

	useEffect(() => {
		(async () => {
			const backendAddr = "http://localhost:8000"
			const api = new API(backendAddr)
			const data = await api.getData()
			dispatch({ type: "UPDATE_APP", app: { ...state.app, data: data } as App })
			setLoading(false)
		})()
	}, [])

	return (
		<AppStore.Provider value={{ state, dispatch }}>
			{loading && <Typography>Loading...</Typography>}
			{!loading && children}
		</AppStore.Provider>
	)
}