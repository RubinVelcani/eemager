import { useSelector } from 'react-redux'

import { selectSelectedImage } from './store/imgurSlice'

import Header from './components/Header'
import ImagePopup from './components/ImagePopup'

type LayoutProps = {
	children: JSX.Element
}
const Layout = ({ children }: LayoutProps) => {
	const selectedImage = useSelector(selectSelectedImage)

  return (
		<div className='w-full relative z-30'>
			<Header />
			{selectedImage && <ImagePopup />}
			{children}
		</div>
	)
}

export default Layout
