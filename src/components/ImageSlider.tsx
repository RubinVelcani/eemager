import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import { BiSolidChevronRightCircle, BiSolidChevronLeftCircle } from 'react-icons/bi'

const carouselResponsivity = {
	desktop: {
		breakpoint: {
			max: 3000,
			min: 1024,
		},
		items: 1,
	},
	mobile: {
		breakpoint: {
			max: 464,
			min: 0,
		},
		items: 1,
	},
	tablet: {
		breakpoint: {
			max: 1024,
			min: 464,
		},
		items: 1,
	},
}

const CustomRightArrow = ({ onClick }: { onClick?: () => void }) => (
	<button
		onClick={e => {
			e.stopPropagation()
			onClick && onClick()
		}}
	>
		<BiSolidChevronRightCircle className='absolute right-4 w-6 h-6 flex items-center justify-center text-[#213547] bg-[#DEE6DB] rounded-full' />
	</button>
)

const CustomLeftArrow = ({ onClick }: { onClick?: () => void }) => (
	<button
		onClick={e => {
			e.stopPropagation()
			onClick && onClick()
		}}
	>
		<BiSolidChevronLeftCircle className='absolute left-4 w-6 h-6 flex items-center justify-center text-[#213547] bg-[#DEE6DB] rounded-full' />
	</button>
)

const ImageSlider = ({ children, ...rest }: { children: React.ReactNode[]; slidesToSlide: number; className: string }) => {
	return (
		<Carousel responsive={carouselResponsivity} partialVisible={true} customRightArrow={<CustomRightArrow />} customLeftArrow={<CustomLeftArrow />} {...rest}>
			{...children}
		</Carousel>
	)
}

export default ImageSlider
