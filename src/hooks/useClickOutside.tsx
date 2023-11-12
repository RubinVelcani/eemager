import { RefObject, useEffect } from 'react'

const useClickOutside = (ref: RefObject<HTMLDivElement>, callback: () => void) => {
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent | TouchEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				callback()
			}
		}

		document.addEventListener('click', handleClickOutside)
		document.addEventListener('touchstart', handleClickOutside)

		return () => {
			document.removeEventListener('click', handleClickOutside)
			document.removeEventListener('touchstart', handleClickOutside)
		}
	}, [ref, callback])
}

export default useClickOutside
