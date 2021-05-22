import Cities from '@/components/Cities.vue'
import { shallowMount,createLocalVue } from '@vue/test-utils'
import { stubs } from './config/bootStrapVue'
import _ from 'lodash'
import cities from '../assets/json/cities.json'
const localVue = createLocalVue()
localVue.use(_)
jest.mock('lodash')
let wrapper
beforeEach(() => {
	wrapper = shallowMount(Cities, {
        mocks : {
            
        },
		stubs
	})
})

describe('data', () => {
	it('default assigned data',async () => {
        
		expect(Cities.data()).toMatchSnapshot()
        
	})
})

describe('mounted', () => {
	it('mounted data',async  () => {
        wrapper.vm.onChangeCities = jest.fn()
		expect(wrapper.vm.fields.citiesSelection.options).toEqual(cities)
        
	})
})

describe('methods', () => {
	describe('onChangeCities', () => {
		it('change cities',async () => {
            wrapper.vm.$emit = jest.fn()
           await  wrapper.vm.onChangeCities()
           expect(wrapper.vm.$emit).toBeCalledWith("onChangeCities",{city : 'Kuala Lumpur'})
		})
	})
})
