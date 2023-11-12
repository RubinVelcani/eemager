import logo from '/logo.png'
import Filters from './Filters'

const Header: React.FunctionComponent = () => {
	return (
		<header className='flex justify-between items-center mb-10 px-3 lg:justify-center'>
			<img alt='logo' src={logo} className='my-16' />
			<Filters />
		</header>
	)
}

export default Header
