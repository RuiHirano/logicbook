import React, {
	createContext,
	useEffect,
	useReducer,
	useState,
} from 'react'
import API from '../api';
import { Typography } from '@mui/material';
import Loading from '../components/Loading';

export interface App {
	data: any
	data2: any
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
		data2: [],
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
		let id: NodeJS.Timer
		(async () => {
			id = setInterval(async function () {
				const api = new API()
				const data = await api.getData()
				const data2 = await api.getData2()
				dispatch({ type: "UPDATE_APP", app: { ...state.app, data: data, data2: data2 } as App })
				setLoading(false)
			}, 1000);
		})()
		return () => clearInterval(id)
	}, [])

	return (
		<AppStore.Provider value={{ state, dispatch }}>
			{loading && <Loading />}
			{!loading && children}
		</AppStore.Provider>
	)
}