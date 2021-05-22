import createPersistedState from 'vuex-persistedstate'

// For this project i only want to persist only one state
export default ({store}) => {
    createPersistedState({
      key: 'vuex',
      paths: ['weather.weatherStore.cityWeatherArr']
    })(store)
  }