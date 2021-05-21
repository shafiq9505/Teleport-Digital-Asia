import CONFIG from '@/config'
import axios from 'axios'
import { _ } from 'core-js'
const service = {
	async fetchWeather(city) {
		try {
			
			const response = await request({
				baseURL : 'https://',
				url: CONFIG.URL_PATHS.WEATHER.WEATHER_URL,
				method: 'POST',
				params : {
					q : city,
					appid :  CONFIG.WEATHER_API_KEY,
					lang:'en',
					mode: 'JSON'
				},
			})

			if (!_.isEmpty(response)) {
				return response
			}
		} catch (err) {
			console.error('Error', err)
			throw err
		}
	}
	


}

function request(params) {
	return new Promise((resolve, reject) => {
		axios({
			...params
		})
			.then(
				(result) => {
					const data = _.get(result, 'data.data') || _.get(result, 'data')
					if (data === undefined || data === null) resolve(result)
					else resolve(data)
				},
				(error) => {
					const message = _.get(error, 'response.data.message')
					console.error(`*************** api-request error ${params.url} ****************`)
					console.error(`Server Message : ${message}`)
					console.error(JSON.stringify(error))

					reject(error)
				}
			)
			.catch((e) => {
				throw e
			})
	})
}

// Intercept each call before proceeding
function proxy(obj) {
	const handler = {
		// eslint-disable-next-line no-unused-vars
		get(target, propKey, receiver) {
			const origMethod = target[propKey]
			return (...args) => {
				const result = origMethod.apply(this, args)
				return result
			}
		}
	}
	return new Proxy(obj, handler)
}

export default proxy(service)
