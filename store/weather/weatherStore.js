

import weatherApiRequestService from '../../middleware/weather.api.request'
export const state = () => ({
    cityWeather : null
}) 

export const actions = {
    async fetchWeather (context, payload) {
        const result = await weatherApiRequestService.fetchWeather(payload)
        
        context.commit('setWeather',result)
      }
}

export const mutations = {
    setWeather(state,payload) {
        state.cityWeather = payload   
    }
}

export const getters = {
    getWeather : (state) => {
        return state.cityWeather
    }
}

