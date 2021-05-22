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
			</b-container>
		</b-card-body>
	</b-card>
</template>
<script>
import cities from '../assets/json/cities.json'

export default {
	name: 'Cities',
	data() {
		return {
			formData: {
				citiesModel: ''
			},
			fields: {
				citiesSelection: {
					options: [],
					fieldAttr: {
						show: true
					}
				}
			}
		}
	},
	async mounted() {
		this.fields.citiesSelection.options = _.cloneDeep(cities)
		this.formData.citiesModel = cities[0].city
		this.onChangeCities()
	},
	methods: {
		async onChangeCities() {
			this.$emit('onChangeCities', { city: this.formData.citiesModel })
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
