<template>
	<!-- Display Weather Data-->
	<b-row>
		<b-col v-show="fields.weatherData.fieldAttr.show">
			<b-row>
				<b-col cols="6">
					<b-form-input readonly v-model="formData.weather.sky"></b-form-input>
				</b-col>
				<b-col cols="6">
					<b-form-input readonly v-model="formData.weather.humidity"></b-form-input>
				</b-col>
			</b-row>
		</b-col>
	</b-row>
</template>

<script>
export default {
	name: 'Cities',
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
			required: false
		}
	},
	async mounted() {},
	methods: {}
}
</script>