import axios from 'axios'

const clientId = import.meta.env.VITE_IMGUR_CLIENT_ID
const baseURL = import.meta.env.VITE_IMGUR_BASE_URL

const apiClient = axios.create({
	baseURL,
	timeout: 5000000,
	headers: {
		'Content-Type': 'application/json',
    Authorization: `Client-ID ${clientId}`,
	},
})

export { apiClient }
