import React from 'react'
import { AppProvider } from './app'

const StoreProvider: React.FC<{}> = ({ children }) => {

	return (
		<AppProvider>
			{children}
		</AppProvider>
	)
}

export default StoreProvider