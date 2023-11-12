import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaRegThumbsUp, FaRegThumbsDown, FaFire } from 'react-icons/fa'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import useClickOutside from '../hooks/useClickOutside'
import { selectSelectedImage, updateSelectedImage, NestedImageType } from '../store/imgurSlice'

import ImageSlider from './ImageSlider'

const ImagePopup: React.FunctionComponent = () => {
	const dispatch = useDispatch()
	const image = useSelector(selectSelectedImage)

	const popupRef = useRef(null)

	useClickOutside(popupRef, () => dispatch(updateSelectedImage('')))

	if (image)
		return (
			<div className='fixed z-30 top-0 left-0 w-full h-full bg-neutral-500/60'>
				<div
					ref={popupRef}
					className='fixed top-1/2 left-1/2 translate-x-1/2 translate-y-1/2 w-full max-h-[90vh] flex flex-col items-center md:max-w-lg xl:max-w-screen-lg text-amber-50 bg-[#766c51] rounded-lg shadow-2xl shadow-orange-100 p-8 sm:mx-4'
					style={{ transform: 'translate(-50%, -50%)' }}
				>
					<div className='relative w-full flex items-center justify-between mb-6'>
						<h4 className='text-lg self-start line-clamp-2'>{image.title}</h4>
						<AiOutlineCloseCircle className='text-2xl font-bold cursor-pointer' onClick={() => dispatch(updateSelectedImage(''))} />
					</div>
					<ImageSlider className='relative w-full max-w-[580px]' slidesToSlide={1}>
						{image.images.map((slide: NestedImageType) => (
							<div key={slide.id}>
								<img src={slide.link} alt={slide.description} />
								<div className='max-h-[150px] overflow-scroll'>{slide.description && <h5>{slide.description}</h5>}</div>
							</div>
						))}
					</ImageSlider>
					{image.description && <h5>{image.description}</h5>}
					<div className='w-full flex justify-between text-base font-medium py-2 px-4'>
						<div className='flex justify-between items-center gap-2'>
							<FaRegThumbsUp />
							{image.ups}
						</div>
						<div className='flex justify-between items-center gap-2'>
							<FaRegThumbsDown />
							{image.downs}
						</div>
						<div className='flex justify-between items-center gap-2'>
							<FaFire />
							{image.score}
						</div>
					</div>
				</div>
			</div>
		)
}

export default ImagePopup
