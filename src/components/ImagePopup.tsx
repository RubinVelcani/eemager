import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { FaRegThumbsUp, FaRegComments, FaRegEye, FaRegThumbsDown } from 'react-icons/fa'

import useClickOutside from '../hooks/useClickOutside'
import { selectSelectedImage, updateSelectedImage, ImgurImageType } from '../store/imgurSlice'

import ImageSlider from './ImageSlider'

const ImagePopup = () => {
	const dispatch = useDispatch()
	const image = useSelector(selectSelectedImage)

	const popupRef = useRef(null)

	useClickOutside(popupRef, () => dispatch(updateSelectedImage('')))

	if (image)
		return (
			<div className='fixed z-30 top-0 left-0 w-full h-full bg-neutral-500/60'>
				<div
					ref={popupRef}
					className='fixed top-1/2 left-1/2 translate-x-1/2 translate-y-1/2 w-full h-fit flex flex-col items-center md:max-w-lg text-amber-50 bg-[#696047] p-8 sm:mx-4'
					style={{ transform: 'translate(-50%, -50%)' }}
				>
					<h4 className='text-lg self-start line-clamp-2 px-4 mb-6'>{image.title}</h4>
					<ImageSlider className='relative w-full max-w-[580px]' slidesToSlide={1}>
						{image.images.map((slide: ImgurImageType) => (
							<div key={image.id}>
								<img src={slide.link} alt={image.title} />
							</div>
						))}
					</ImageSlider>
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
							<FaRegComments />
							{image.comment_count}
						</div>
						<div className='flex justify-between items-center gap-2'>
							<FaRegEye />
							{image.views}
						</div>
					</div>
				</div>
			</div>
		)
}

export default ImagePopup
