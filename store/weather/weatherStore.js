

import { _ } from 'core-js'
import weatherApiRequestService from '../../middleware/weather.api.request'

const FORECAST_TABLE_HEADER = [
    {
        key: 'location',
        label: 'Location'
    },
    {
        key: 'firstWeather',
        label: '1st Day'
    },
    {
        key: 'secondWeather',
        label: '2nd Day'
    },
    {
        key: 'thirdWeather',
        label: '3rd Day'
    },
    {
        key: 'fourthWeather',
        label: '4th Day'
    },
    {
        key: 'fifthWeather',
        label: '5th Day'
    },
]

export const state = () => ({
    cityWeather : null,
    weatherForecast : null,
    cityWeatherArr : []
}) 

export const actions = {
    async fetchWeather (context, payload) {
        const result = await weatherApiRequestService.fetchWeather(payload)
        
        context.commit('setWeather',result)
      },

      async fetchWeatherNoCommit (context, payload) {
        const result = await weatherApiRequestService.fetchWeather(payload)
        
        return result
      },

      async fetchWeatherForecast (context, payload) {
        const result = await weatherApiRequestService.fetchWeatherForecast(payload)
        
        context.commit('setWeatherForecast',result)
      }

      
}

export const mutations = {
    setWeather(state,payload) {
        state.cityWeather = payload   
    },
    setWeatherForecast(state,payload) {
        state.weatherForecast = payload
    },
    setCityWeatherArray(state,payload)
    {
      const find = _.find(state.cityWeatherArr,['name',payload.name])
      if(_.isUndefined(find))  state.cityWeatherArr.push(_.cloneDeep(payload))
    }
}

export const getters = {
    getWeather : (state) => {
        return state.cityWeather
    },
    getWeatherForecastTable : (state) => {
        const table = {
            fields: FORECAST_TABLE_HEADER,
            items : []
        }
        
        const forecastList = _.cloneDeep(state.weatherForecast)
        if(forecastList === null) return
        const obj = {}
        _.forEach(table.fields,(value,index) => {
            if(index === 0) {
                obj[value.key] = forecastList.city.name
                return
            }
            obj[value.key] = forecastList.list[index].weather[0].main
        })
        
        table.items.push(obj)
  
        return table
    },
    getCityWeatherArr : (state) => {
        return state.cityWeatherArr
    }
 
}

