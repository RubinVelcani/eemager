import { Provider } from 'react-redux'
import store from './store/store'

import Gallery from './components/Gallery'
import Layout from './layout'

function App() {
	return (
		<>
			<div className="w-full before:z-0 before:block before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[url('/leaf-bg.png')] before:opacity-30"></div>
			<Provider store={store}>
				<Layout>
					<Gallery />
				</Layout>
			</Provider>
		</>
	)
}

export default App
