import axios from 'axios'

export const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials: true,
	headers: {
		'API-KEY': 'b9a47b16-0cbb-4fe2-8152-303706b5e3c1' as const
	}
})
