<template>
	<div class="mt-3">
		<b-carousel
			id="carousel-1"
			v-model="slide"
			:interval="10000"
			controls
			indicators
			background="#ababab"
			img-width="750"
			img-height="500"
			style="text-shadow: 1px 1px 2px #333"
			@sliding-start="onSlideStart"
			@sliding-end="onSlideEnd"
		>
			<!-- Slide with blank fluid image to maintain slide aspect ratio -->
			<div v-for="(weather, index) in weatherArr" :key="index">
				<b-carousel-slide :caption="weather.name" img-blank img-alt="Blank image">
					<Weather :weatherObj="weather" :hideGetLocationButton="true" />
					<!-- Button -->
					<b-row class="mt-2">
						<b-col cols="12">
							<b-btn class="float-right ml-1 mt-0" variant="success" @click="addCity()">Add {{ getWeather.name }} to Carousel</b-btn>
						</b-col>
					</b-row>
				</b-carousel-slide>
			</div>
		</b-carousel>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	data() {
		return {
			slide: 0,
			sliding: null
		}
	},
	computed: {
		...mapGetters({
			getWeather: 'weather/weatherStore/getWeather'
		})
	},
	props: {
		weatherArr: {
			type: Array,
			required: false
		}
	},
	methods: {
		onSlideStart(slide) {
			this.sliding = true
		},
		onSlideEnd(slide) {
			this.sliding = false
		},
		addCity() {
			this.$emit('addCity')
		}
	}
}
</script>