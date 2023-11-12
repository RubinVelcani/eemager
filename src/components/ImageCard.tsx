import { useDispatch } from 'react-redux';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { FaRegThumbsUp, FaRegComments, FaRegEye } from 'react-icons/fa'

import { NestedImageType, updateSelectedImage } from '../store/imgurSlice';
import { RootState } from '../store/store';

type ImageCardPropType = {
  imageData: ImageDataPropType
}

type ImageDataPropType = {
	id: string
	title: string
	images: NestedImageType[] 
	ups: number
	comment_count: number
	views: number
}

const ImageCard: React.FunctionComponent<ImageCardPropType> = ({imageData }: ImageCardPropType) => {
	const { id, title, images, ups, comment_count, views } = imageData

	const dispatch = useDispatch<ThunkDispatch<RootState, unknown, Action>>()
	const handleSelectImage = (event: React.MouseEvent<HTMLElement>) => { 
		event.stopPropagation();
		dispatch(updateSelectedImage(id))
	}
	
	return (
		<div onClick={(e) => handleSelectImage(e)} className='relative first-line:w-full h-min self-start text-[#c4c4bd] bg-[#797233ea] rounded-md shadow-[0_35px_60px_-15px_rgba(28,40,38,1)]'>
			{images.length > 1 && <div className='absolute top-4 right-4 flex justify-center items-center w-8 h-8 text-lg font-bold bg-[#797233ea] rounded-lg'>{images.length}</div>}
			<img key={id} src={images?.[0].link ?? ''} alt={title} />
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
