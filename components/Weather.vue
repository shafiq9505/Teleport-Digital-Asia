<template>
	<!-- Display Weather Data-->
	<b-row>
		<b-col class="mt-3" v-show="fields.weatherData.fieldAttr.show">
			<b-card class="mb-lg" no-body>
				<b-card-header>
					<strong>Weather in {{ weatherObj.name }}</strong>
				</b-card-header>
				<b-card-body class="pl-2">
					<b-container>
						<!-- Weather Details -->
						<b-row>
							<!-- City -->
							<b-col cols="12">
								<b-form-group horizontal :label-cols="4" label="City">
									<b-form-input readonly v-model="weatherObj.name"></b-form-input>
								</b-form-group>
							</b-col>
						</b-row>
						<b-row>
							<!-- Weather -->
							<b-col class="mt-3" cols="12">
								<b-form-group horizontal :label-cols="4" label="Weather">
									<b-form-input readonly v-model="weatherObj.weather[0].description"></b-form-input>
								</b-form-group>
							</b-col>

							<!-- Humidity -->
							<b-col class="mt-3" cols="12">
								<b-form-group horizontal :label-cols="4" label="Humidty">
									<b-form-input readonly v-model="weatherObj.main.humidity"></b-form-input>
								</b-form-group>
							</b-col>

							<!-- Pressure -->
							<b-col class="mt-3" cols="12">
								<b-form-group horizontal :label-cols="4" label="Pressure">
									<b-form-input readonly v-model="weatherObj.main.pressure"></b-form-input>
								</b-form-group>
							</b-col>

							<!--Temperature  -->
							<b-col class="mt-3" cols="12">
								<b-form-group horizontal :label-cols="4" label="Temperature">
									<b-form-input readonly v-model="weatherObj.main.temp"></b-form-input>
								</b-form-group>
							</b-col>

							<!-- Max Temperature -->
							<b-col class="mt-3" cols="12">
								<b-form-group horizontal :label-cols="4" label="Max Temperature">
									<b-form-input readonly v-model="weatherObj.main.temp_max"></b-form-input>
								</b-form-group>
							</b-col>

							<!-- Min Temperature -->
							<b-col class="mt-3" cols="12">
								<b-form-group horizontal :label-cols="4" label="Min Temperature">
									<b-form-input readonly v-model="weatherObj.main.temp_min"></b-form-input>
								</b-form-group>
							</b-col>
						</b-row>

						<!-- Button -->
						<b-row v-show="!hideGetLocationButton" class="mt-2">
							<b-col cols="12">
								<b-btn class="float-right ml-1 mt-0" variant="primary" @click="getCurrentLocation()">Get current location</b-btn>
							</b-col>
						</b-row>
					</b-container>
				</b-card-body>
			</b-card>
		</b-col>
	</b-row>
</template>

<script>
export default {
	name: 'Weather',
	data() {
		return {
			formData: {
				weather: {
					sky: '',
					shumidityky: ''
				}
			},
			fields: {
				weatherData: {
					options: [],
					fieldAttr: {
						show: true
					}
				}
			}
		}
	},

	props: {
		weatherObj: {
			type: Object,
			required: true
		},
		hideGetLocationButton: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	async mounted() {},
	methods: {
		getCurrentLocation() {
			this.$emit('getCurrentLocation')
		}
	}
}
</script>