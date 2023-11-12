import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { apiClient } from '../client/apiClient'
import { RootState } from './store'

type FiltersType = {
	section: string
	sort: string
	page: number
	window: string
	showViral: boolean
}

type ImgurStateType = {
	galleryImages: ImgurImageType[]
	filters: FiltersType
	loadingStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
	selectedImage: ImgurImageType | null
	showPopup: boolean
}

export type NestedImageType = {
	id: string
	title: string
	images: NestedImageType[]
	description: string
	type: string
	link: string
}

export type ImgurImageType = {
	id: string
	link: string
	title: string
	description: string
	images: NestedImageType[]
	comment_count: number
	views: number
	ups: number
	downs: number
	score: number
}

const initialState: ImgurStateType = {
	galleryImages: [],
	loadingStatus: 'idle',
	error: null,
	selectedImage: null,
	showPopup: false,
	filters: {
		section: 'hot',
		sort: 'viral',
		page: 1,
		window: 'day',
		showViral: true,
	},
}

export const fetchGalleryImages = createAsyncThunk<ImgurImageType[], void, { state: RootState }>(
	'imgur/fetchGalleryImages',
	async (_requestData, { getState }) => {
		const { imgur } = getState()
		const { section, page, sort, window, showViral } = imgur.filters

		try {
			const response = await apiClient.get(`3/gallery/${section}/${sort}/${page}/${window}'?showViral=${showViral}'}`)
			const filteredResponse = response.data.data.filter((image: ImgurImageType) => {
				if (image.images) {
					return image?.images?.[0]?.type !== 'video/mp4'
				}
			})

			return filteredResponse
		} catch (error) {
			console.log(error)
			throw error
		}
	}
)

const imgurSlice = createSlice({
	name: 'imgur',
	initialState,
	reducers: {
		updateSection: (state, action: PayloadAction<string>) => {
			state.filters.section = action.payload
		},
		updateSort: (state, action: PayloadAction<string>) => {
			state.filters.sort = action.payload
		},
		updatePage: (state, action: PayloadAction<number>) => {
			state.filters.page = action.payload
		},
		updateWindow: (state, action: PayloadAction<string>) => {
			state.filters.window = action.payload
		},
		updateShowViral: (state, action: PayloadAction<boolean>) => {
			state.filters.showViral = action.payload
		},
		updateSelectedImage: (state, action: PayloadAction<string>) => {
			const selectedImage = state.galleryImages.find(image => image.id === action.payload) || null
			state.selectedImage = selectedImage
		},
		updateShowPopup: (state, action: PayloadAction<boolean>) => {
			state.showPopup = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchGalleryImages.pending, state => {
				state.loadingStatus = 'loading'
			})
			.addCase(fetchGalleryImages.fulfilled, (state, action) => {
				state.loadingStatus = 'succeeded'
				state.galleryImages = action.payload
			})
			.addCase(fetchGalleryImages.rejected, (state, action) => {
				state.loadingStatus = 'failed'
				state.error = action.error.message ?? 'An error occurred.'
			})
	},
})

export const selectSection = (state: RootState) => state.imgur.filters.section
export const selectSort = (state: RootState) => state.imgur.filters.sort
export const selectPage = (state: RootState) => state.imgur.filters.page
export const selectWindow = (state: RootState) => state.imgur.filters.window
export const selectShowViral = (state: RootState) => state.imgur.filters.showViral
export const selectSelectedImage = (state: RootState) => state.imgur.selectedImage
export const selectShowPopup = (state: RootState) => state.imgur.showPopup

export const { updateSection, updatePage, updateSort, updateWindow, updateShowViral, updateShowPopup, updateSelectedImage } = imgurSlice.actions

export default imgurSlice.reducer
