import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'

import logo from '/eemager.png'

import useClickOutside from '../hooks/useClickOutside'
import {
	updateSection,
	updateSort,
	updateWindow,
	updateShowViral,
	updatePage,
	selectShowViral,
	selectPage,
} from '../store/imgurSlice'
import { GiHamburgerMenu } from 'react-icons/gi'

const Filters = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const page = useSelector(selectPage)
	const showViral = useSelector(selectShowViral)

	const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

	const menuRef = useRef(null)

	const screenWidth = window.innerWidth

	const toggleMenu = (e: React.MouseEvent) => {
		console.log('hey')
		e.stopPropagation()
		setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen)
	}

	useClickOutside(menuRef, () => setIsMenuOpen(false))

	if (screenWidth < 1024) {
		return (
			<div className='flex justify-between items-center'>
				<div className='px-10 py-6'>
					<button className='bg-[#797233ea] lg:hidden' onClick={(e) => toggleMenu(e)}>
						<GiHamburgerMenu />
					</button>
					{isMenuOpen && (
						<div className='fixed z-40 top-0 left-0 w-full h-full bg-neutral-500/90'>
							<div ref={menuRef} className={`fixed z-40 -translate-x-full top-0 left-0 width-4/5 h-auto ${isMenuOpen ? 'transform translate-x-0' : ''}`}>
								{/* <button onClick={toggleMenu}>Close Menu</button> */}
								<div className='flex flex-col items-start gap-4 p-8'>
									<div className='flex items-center gap-3'>
										<label className='font-medium'>Section</label>
										<select
											className='rounded-lg bg-[#99AA38] shadow px-3 py-2 '
											onChange={({ target }: any) => dispatch(updateSection(target.value))}
										>
											<option value='hot'>Hot</option>
											<option value='top'>Top</option>
											<option value='user'>User</option>
										</select>
									</div>
									<div className='flex items-center gap-3'>
										<label className='font-medium'>Sort</label>
										<select className='rounded-lg bg-[#99AA38] shadow px-3 py-2 ' onChange={({ target }: any) => dispatch(updateSort(target.value))}>
											<option value='viral'>Viral</option>
											<option value='top'>Top</option>
											<option value='time'>Time</option>
											<option value='rising'>Rising</option>
										</select>
									</div>
									<div className='flex items-center gap-3'>
										<label className='font-medium'>Period</label>
										<select className='rounded-lg bg-[#99AA38] px-3 py-2 ' onChange={({ target }: any) => dispatch(updateWindow(target.value))}>
											<option value='day'>Day</option>
											<option value='week'>Week</option>
											<option value='month'>Month</option>
											<option value='year'>Year</option>
											<option value='all'>All</option>
										</select>
									</div>
									<button className='rounded-lg bg-[#99AA38] shadow px-3 py-2 lg:mx-auto' onClick={() => dispatch(updateShowViral(!showViral))}>
										{`${showViral ? 'Hide' : 'Show'} viral images`}
									</button>
									<div className='flex justify-between items-center gap-6 mx-auto mt-10 lg:mx-0'>
										<button
											className={`rounded-lg bg-[#99AA38] ${page === 1 && 'bg-[#BBC5AA]'}`}
											onClick={() => page > 1 && dispatch(updatePage(page - 1))}
											disabled={page === 1}
										>
										{'<'}
										</button>
										<span className='font-bold'>Page {page}</span>
										<button className='rounded-lg bg-[#99AA38]' onClick={() => dispatch(updatePage(page + 1))}>
										{'>'}
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
			<div className='flex flex-wrap items-center gap-x-4 gap-y-6 lg:justify-between lg:flex-row lg:items-start lg:gap-10 mb-[70px]'>
				<div className='flex items-center gap-3'>
					<label className='font-medium'>Section</label>
					<select className='rounded-lg bg-[#99AA38] shadow px-3 py-2 ' onChange={({ target }: any) => dispatch(updateSection(target.value))}>
						<option value='hot'>Hot</option>
						<option value='top'>Top</option>
						<option value='user'>User</option>
					</select>
				</div>
				<div className='flex items-center gap-3'>
					<label className='font-medium'>Sort</label>
					<select className='rounded-lg bg-[#99AA38] shadow px-3 py-2 ' onChange={({ target }: any) => dispatch(updateSort(target.value))}>
						<option value='viral'>Viral</option>
						<option value='top'>Top</option>
						<option value='time'>Time</option>
						<option value='rising'>Rising</option>
					</select>
				</div>
				<div className='flex items-center gap-3'>
					<label className='font-medium'>Period</label>
					<select className='rounded-lg bg-[#99AA38] px-3 py-2 ' onChange={({ target }: any) => dispatch(updateWindow(target.value))}>
						<option value='day'>Day</option>
						<option value='week'>Week</option>
						<option value='month'>Month</option>
						<option value='year'>Year</option>
						<option value='all'>All</option>
					</select>
				</div>
				<button className='rounded-lg bg-[#99AA38] shadow px-3 py-2 mx-auto lg:mx-0' onClick={() => dispatch(updateShowViral(!showViral))}>
					{`${showViral ? 'Hide' : 'Show'} viral images`}
				</button>
				<div className='flex justify-between items-center gap-6 mx-auto lg:mx-0'>
					<button
						className={`rounded-lg bg-[#99AA38] ${page === 1 && 'bg-[#BBC5AA]'}`}
						onClick={() => page > 1 && dispatch(updatePage(page - 1))}
						disabled={page === 1}
					>
						Previous Page
					</button>
					<span className='font-bold'>Page {page}</span>
					<button className='rounded-lg bg-[#99AA38]' onClick={() => dispatch(updatePage(page + 1))}>
						Next Page
					</button>
				</div>
			</div>
		)
	}
}

const Header = () => {
	return (
		<header className='flex justify-between items-center lg:flex-col mb-10 px-3'>
			<div className='logo-container'>
				<img alt='logo' src={logo} className='app-logo' />
			</div>
			<Filters />
		</header>
	)
}

export default Header
