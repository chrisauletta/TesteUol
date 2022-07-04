import { shallowMount } from '@vue/test-utils'
import Contents from '@/pages/contents'
import flushPromises from 'flush-promises'

describe('Contents', () => {

	test('Verifica se é um componente', async () => {
		const wrapper = shallowMount(Contents);
    await flushPromises();
		expect(wrapper.vm).toBeTruthy()
	})

})
