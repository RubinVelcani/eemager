import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaRegThumbsUp, FaRegComments, FaRegEye } from 'react-icons/fa'
import 'react-lazy-load-image-component/src/effects/opacity.css';

import { updateSelectedImage } from '../store/imgurSlice';

type ImageCardPropType = {
  imageData: ImageDataPropType
}

type ImageDataPropType = {
	id: string
	title: string
	images: any[]
	ups: number
	comment_count: number
	views: number
}

const ImageCard = ({imageData }: ImageCardPropType) => {
	const { id, title, images, ups, comment_count, views } = imageData

	const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
	const handleSelectImage = (event: React.MouseEvent<HTMLElement>) => { 
		event.stopPropagation();
		dispatch(updateSelectedImage(id))
	}
	
	return (
		<div onClick={(e) => handleSelectImage(e)} className='relative first-line:w-full h-min self-start text-[#c4c4bd] bg-[#797233ea] rounded-md shadow-[0_35px_60px_-15px_rgba(28,40,38,1)]'>
			{images.length > 1 && <div className='absolute top-4 right-4 flex justify-center items-center w-8 h-8 text-lg font-bold bg-[#797233ea] rounded-lg'>{images.length}</div>}
			<LazyLoadImage key={id} src={images?.[0].link ?? ''} alt={title} effect="opacity" />
			<div className='pt-2.5'>
				<h4 className='text-lg line-clamp-2 px-4'>{title}</h4>
				<div className='flex justify-between text-base font-medium py-2 px-4'>
					<div className='flex justify-between items-center gap-2'>
						<FaRegThumbsUp />
						{ups}
					</div>
					<div className='flex justify-between items-center gap-2'>
						<FaRegComments />
						{comment_count}
					</div>
					<div className='flex justify-between items-center gap-2'>
						<FaRegEye />
						{views}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ImageCard
