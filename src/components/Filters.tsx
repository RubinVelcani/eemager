import { useState, useRef, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch, Action } from '@reduxjs/toolkit'
import { RootState } from '../store/store'

import useClickOutside from '../hooks/useClickOutside'
import { updateSection, updateSort, updateWindow, updateShowViral, updatePage, selectShowViral, selectPage } from '../store/imgurSlice'
import { BiSolidChevronRight, BiSolidChevronLeft } from 'react-icons/bi'
import { GiHamburgerMenu } from 'react-icons/gi'

const Filters: React.FunctionComponent = () => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

	const page = useSelector(selectPage)
	const showViral = useSelector(selectShowViral)

	const dispatch = useDispatch<ThunkDispatch<RootState, unknown, Action>>()

	const menuRef = useRef(null)

	const screenWidth = window.innerWidth

	const toggleMenu = (e: React.MouseEvent) => {
		e.stopPropagation()
		setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen)
	}

	useClickOutside(menuRef, () => setIsMenuOpen(false))

	if (screenWidth < 1024) {
		return (
			<div className='flex justify-between items-center'>
				<div className='px-10 py-6'>
					<button className='bg-[#797233ea] lg:hidden' onClick={e => toggleMenu(e)}>
						<GiHamburgerMenu />
					</button>
					{isMenuOpen && (
						<div className='fixed z-40 top-0 left-0 w-4/5 h-full bg-[#BBC5AACC]'>
							<div
								ref={menuRef}
								className={`fixed z-40 -translate-x-full top-0 left-0 width-4/5 h-auto ${isMenuOpen ? 'transform translate-x-0' : ''}`}
							>
								<div className='flex flex-col items-start gap-4 p-8'>
									<h2 className='text-3xl font-bold lg:hidden'>Gallery filters</h2>
									<div className='w-full flex items-center justify-between gap-3'>
										<label className='font-medium'>Section</label>
										<select
											className='rounded-lg bg-[#99AA38] shadow px-3 py-2 '
											onChange={(e: ChangeEvent<HTMLSelectElement>) => dispatch(updateSection(e.target.value))}
										>
											<option value='hot'>Hot</option>
											<option value='top'>Top</option>
											<option value='user'>User</option>
										</select>
									</div>
									<div className='w-full flex items-center justify-between gap-3'>
										<label className='font-medium'>Sort</label>
										<select className='rounded-lg bg-[#99AA38] shadow px-3 py-2 ' onChange={(e: ChangeEvent<HTMLSelectElement>) => dispatch(updateSort(e.target.value))}>
											<option value='viral'>Viral</option>
											<option value='top'>Top</option>
											<option value='time'>Time</option>
											<option value='rising'>Rising</option>
										</select>
									</div>
									<div className='w-full flex items-center justify-between gap-3'>
										<label className='font-medium'>Period</label>
										<select className='rounded-lg bg-[#99AA38] px-3 py-2 ' onChange={(e: ChangeEvent<HTMLSelectElement>) => dispatch(updateWindow(e.target.value))}>
											<option value='day'>Day</option>
											<option value='week'>Week</option>
											<option value='month'>Month</option>
											<option value='year'>Year</option>
											<option value='all'>All</option>
										</select>
									</div>
									<button className='rounded-lg bg-[#99AA38] shadow px-3 py-2 mx-auto' onClick={() => dispatch(updateShowViral(!showViral))}>
										{`${showViral ? 'Hide' : 'Show'} viral images`}
									</button>
									<div className='flex justify-between items-center gap-6 mx-auto mt-10 lg:mx-0'>
										<button
											className={`rounded-lg bg-[#99AA38] ${page === 1 && 'bg-[#BBC5AA]'}`}
											onClick={() => page > 1 && dispatch(updatePage(page - 1))}
											disabled={page === 1}
										>
											<BiSolidChevronLeft />
										</button>
										<span className='font-bold'>Page {page}</span>
										<button className='rounded-lg bg-[#99AA38]' onClick={() => dispatch(updatePage(page + 1))}>
											<BiSolidChevronRight />
										</button>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		)
	} else {
		return (
			<div className='flex flex-col tems-start gap-x-4 gap-y-6 lg:mt-2'>
				<div className='w-full flex justify-between gap-8 items-center]'>
					<div className='w-full flex items-center justify-between gap-3'>
						<label className='font-medium'>Section</label>
						<select className='rounded-lg bg-[#99AA38] shadow px-3 py-2 ' onChange={(e: ChangeEvent<HTMLSelectElement>) => dispatch(updateSection(e.target.value))}>
							<option value='hot'>Hot</option>
							<option value='top'>Top</option>
							<option value='user'>User</option>
						</select>
					</div>
					<div className='w-full flex items-center justify-between gap-3'>
						<label className='font-medium'>Sort</label>
						<select className='rounded-lg bg-[#99AA38] shadow px-3 py-2 ' onChange={(e: ChangeEvent<HTMLSelectElement>) => dispatch(updateSort(e.target.value))}>
							<option value='viral'>Viral</option>
							<option value='top'>Top</option>
							<option value='time'>Time</option>
							<option value='rising'>Rising</option>
						</select>
					</div>
				</div>
				<div className='w-full flex justify-between gap-8 items-center'>
					<div className='w-full flex items-center justify-between gap-3'>
						<label className='font-medium'>Period</label>
						<select className='rounded-lg bg-[#99AA38] px-3 py-2 ' onChange={(e: ChangeEvent<HTMLSelectElement>) => dispatch(updateWindow(e.target.value))}>
							<option value='day'>Day</option>
							<option value='week'>Week</option>
							<option value='month'>Month</option>
							<option value='year'>Year</option>
							<option value='all'>All</option>
						</select>
					</div>
					<button className='min-w-[160px] rounded-lg bg-[#99AA38] shadow px-3 py-2 mx-auto' onClick={() => dispatch(updateShowViral(!showViral))}>
						{`${showViral ? 'Hide' : 'Show'} viral images`}
					</button>
				</div>
				<div className='flex justify-between items-center gap-6 mx-auto'>
					<button
						className={`rounded-lg bg-[#99AA38] ${page === 1 && 'bg-[#BBC5AA]'}`}
						onClick={() => page > 1 && dispatch(updatePage(page - 1))}
						disabled={page === 1}
					>
						<BiSolidChevronLeft />
					</button>
					<span className='font-bold'>Page {page}</span>
					<button className='rounded-lg bg-[#99AA38]' onClick={() => dispatch(updatePage(page + 1))}>
						<BiSolidChevronRight />
					</button>
				</div>
			</div>
		)
	}
}

export default Filters
