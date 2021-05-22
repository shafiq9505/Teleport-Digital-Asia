<template>
	<div>
		<b-card class="mb-lg" no-body>
			<b-card-header>
				<strong>Selected City Weather Forecast</strong>
			</b-card-header>
			<b-card-body class="px-1">
				<b-table striped hover :items="weatherObj.items" :fields="weatherObj.fields"></b-table>
			</b-card-body>
		</b-card>
	</div>
</template>

<script>
export default {
	name: 'WeatherForecast',
	data() {
		return {
			items: []
		}
	},
	methods: {},
	props: {
		weatherObj: {
			type: Object,
			required: false
		}
	},
	async mounted() {}
}
</script>