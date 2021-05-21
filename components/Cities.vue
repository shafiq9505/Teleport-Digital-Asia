<template>
	<b-card no-body>
		<b-card-header>
			<strong>Select Cities</strong>
		</b-card-header>
		<b-card-body class="pl-2">
			<b-container>
				<!-- Cities Selection -->
				<b-row>
					<b-col v-show="fields.citiesSelection.fieldAttr.show">
						<b-form-group horizontal :label-cols="4" label="Please select a cities">
							<select class="form-control" v-model="formData.citiesModel" v-on:change="onChangeCities()">
								<option v-for="option in fields.citiesSelection.options" :key="option.city" :value="option.city">{{ option.city }}</option>
							</select>
						</b-form-group>
					</b-col>
				</b-row>

				<Weather v-if="getWeather" :weatherObj="getWeather" />
			</b-container>
		</b-card-body>
	</b-card>
</template>
<script>
import cities from '../assets/json/cities.json'
import { mapGetters } from 'vuex'
export default {
	name: 'Cities',
	data() {
		return {
			formData: {
				citiesModel: '',
				weather: {
					humidity: '123',
					sky: 'clear'
				}
			},
			fields: {
				citiesSelection: {
					options: [],
					fieldAttr: {
						show: true
					}
				},
				weatherData: {
					options: [],
					fieldAttr: {
						show: true
					}
				}
			}
		}
	},
	computed: {
		...mapGetters({
			getWeather: 'weather/weatherStore/getWeather'
		})
	},
	async mounted() {
		await this.init()
	},
	methods: {
		async init() {
			this.fields.citiesSelection.options = _.cloneDeep(cities)
			this.formData.citiesModel = cities[0].city

			await this.getCities()
		},
		async onChangeCities() {
			await this.getCities()
		},
		async getCities() {
			try {
				await this.$store.dispatch('weather/weatherStore/fetchWeather', this.formData.citiesModel)
			} catch (err) {
				console.error(err)
			}
		}
	}
}
</script>
<style>
.NuxtLogo {
	animation: 1s appear;
	margin: auto;
}

@keyframes appear {
	0% {
		opacity: 0;
	}
}
</style>
