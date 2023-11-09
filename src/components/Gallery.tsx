import { useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'

import { fetchGalleryImages, selectSection, selectPage, selectSort, selectWindow, selectShowViral } from '../store/imgurSlice'
import { RootState } from '../store/store'

import ImageCard from './ImageCard'
import SkeletonImageCard from './SkeletonImageCard'

const Gallery = () => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
	const { loading, error } = useSelector((state: RootState) => state.imgur)
	const { galleryImages } = useSelector((state: RootState) => state.imgur)

	const section = useSelector(selectSection)
	const sort = useSelector(selectSort)
	const page = useSelector(selectPage)
	const window = useSelector(selectWindow)
	const showViral = useSelector(selectShowViral)

	const memoizedGalleryImages = useMemo(() => galleryImages, [galleryImages])
	
	useEffect(() => {
		dispatch(fetchGalleryImages())
	}, [section, sort, page, window, showViral])

	if (loading === 'loading') {
		return (
			<div className='w-full min-h-screen h-screen grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 auto-rows-min grid-flow-dense'>
				{new Array(25).fill('dummy').map((_skeleton, index) => (
					<SkeletonImageCard key={index} />
				))}
			</div>
		)
	}

	if (loading === 'failed') {
		return <div className='w-full t-3xl font-bold text-center p-10'>Error: {error}</div>
	}

	return (
		<section className='min-h-screen grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 auto-rows-min grid-flow-dense'>
			{memoizedGalleryImages.map(image => (
				<ImageCard imageData={image} key={image.id} />
			))}
		</section>
	)
}

export default Gallery
