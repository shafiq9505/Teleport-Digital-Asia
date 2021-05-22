import Weather from '@/components/Weather.vue'
import { shallowMount, } from '@vue/test-utils'
import {stubs} from './config/bootStrapVue'
import _ from 'lodash'

// create an extended `Vue` constructor



let wrapper 
beforeEach(() => {
    
	wrapper = shallowMount(Weather, {
		propsData: {
            weatherObj : {
                name : 'Kuala Lumpur',
                main : {
                    description : 'testing',
                    humidity : '123',
                    pressure : '123',
                    temp : '123',
                    temp_max : '123',
                    temp_min : '123'
                },
                
                weather : [{
                    description : ''
                }]
            }
        },
        stubs,
	})
})

describe('data', () => {
	it('default assigned data', () => {
		expect(Weather.data()).toMatchSnapshot()
	})
})



describe('methods', () => {
	describe('getCurrentLocation', () => {
        it('emit current location', () => {
            wrapper.vm.$emit = jest.fn()
            wrapper.vm.getCurrentLocation()
            expect(wrapper.vm.$emit).toBeCalledWith('getCurrentLocation')
        })
    })
})
