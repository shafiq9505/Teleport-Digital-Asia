<template>
	<b-container>
		<b-row>
			<!-- Card Group -->
			<b-col cols="12">
				<b-card-group deck>
					<!--Cities  -->
					<Cities @onChangeCities="onChangeCities($event)" />

					<!-- Weather ForeCast -->
					<WeatherForecast v-if="getWeatherForecastTable" :weatherObj="getWeatherForecastTable" />
				</b-card-group>
			</b-col>

			<!-- Weather -->
			<b-col cols="12">
				<Weather v-if="getWeather" :weatherObj="getWeather" @getCurrentLocation="getCurrentLocation()" />
			</b-col>

			<!-- Weather Carousel -->
			<b-col cols="12">
				<WeatherCarousel v-if="getCityWeatherArr" :weatherArr="getCityWeatherArr" @addCity="addCity()" />
			</b-col>
		</b-row>

		<!-- Modal for negative flow -->
		<b-modal v-if="this.getWeather" id="message-modal" centered title="Error" ok-only>
			<p class="my-4">{{ this.getWeather.name }} Is Already Available in Carousel</p>
		</b-modal>
	</b-container>
</template>
<script>
import cities from '../assets/json/cities.json'
import { mapGetters } from 'vuex'
export default {
	name: 'Index',
	data() {
		return {
			formData: {
				currentLocation: {},
				cityOptions: []
			}
		}
	},
	computed: {
		...mapGetters({
			getWeather: 'weather/weatherStore/getWeather',
			getWeatherForecastTable: 'weather/weatherStore/getWeatherForecastTable',
			getCityWeatherArr: 'weather/weatherStore/getCityWeatherArr'
		})
	},
	async created() {
		await this.init()
	},
	methods: {
		async init() {
			this.formData.cityOptions = _.cloneDeep(cities)
			const initialParams = { city: this.formData.cityOptions[0].city }
			await this.getInitialCurrentLocation()
			await this.getCititesWeather(initialParams)
			await this.getWeatherForecast(initialParams)
			await this.getCityWeatherArray()
		},
		async getInitialCurrentLocation() {
			const self = this
			await navigator.geolocation.getCurrentPosition((pos) => {
				self.formData.currentLocation.lat = _.cloneDeep(pos.coords.latitude)
				self.formData.currentLocation.lon = _.cloneDeep(pos.coords.longitude)
			})
		},
		async onChangeCities(params) {
			await this.getCititesWeather(params)
			await this.getWeatherForecast(params)
		},
		async getCititesWeather(params) {
			try {
				this.$nuxt.$loading.start()
				await this.$store.dispatch('weather/weatherStore/fetchWeather', params)
			} catch (err) {
				console.error(err)
			} finally {
			}
		},
		async getWeatherForecast(params) {
			try {
				this.$nuxt.$loading.start()
				await this.$store.dispatch('weather/weatherStore/fetchWeatherForecast', params)
			} catch (err) {
				console.error(err)
			} finally {
				this.$nuxt.$loading.finish()
			}
		},
		async getCurrentLocation() {
			try {
				if (_.isEmpty(this.formData.currentLocation)) {
					await this.getInitialCurrentLocation()
				}

				await this.getCititesWeather(this.formData.currentLocation)
				await this.getWeatherForecast(this.formData.currentLocation)
			} catch (err) {
				console.error(err)
				this.$nuxt.$loading.finish()
			} finally {
			}
		},
		async getCityWeatherArray() {
			// First time page load to get three cities data for carousel
			const citiesSelection = _.cloneDeep(cities)
			if (_.isEmpty(this.getCityWeatherArr)) {
				_.forEach(this.formData.cityOptions, async (value, key) => {
					if (key > 2) return
					const res = await this.$store.dispatch('weather/weatherStore/fetchWeatherNoCommit', { city: value.city })
					this.$store.commit('weather/weatherStore/setCityWeatherArray', res)
				})
			}
		},
		addCity() {
			const find = _.find(this.getCityWeatherArr, ['name', this.getWeather.name])
			_.isUndefined(find) ? this.$store.commit('weather/weatherStore/setCityWeatherArray', this.getWeather) : this.$bvModal.show('message-modal')
		}
	}
}
</script>

