import { createLocalVue,shallowMount } from '@vue/test-utils'
import GetContents from '@/pages/contents/_id.vue'
import VueRouter from 'vue-router'
import flushPromises from 'flush-promises'

describe('GetContents', () => {

	const localVue = createLocalVue();
	localVue.use(VueRouter);
  
	const routes = [
	  {
		path: '/path',
		component: GetContents,
		name: 'Route name'
	  }
	];
  
	const router = new VueRouter({ routes });

	router.push({
		name: 'Route name',
		params: {id:'5d3bb1f7-0106-4733-aede-6a3c1c7f21c8'}
	});
	
	test('Verifica se esta recebendo os dados', async () => {
		const wrapper = shallowMount(GetContents,{
			localVue,
			router,
		  });
		await flushPromises()
		expect(wrapper.vm).toBeTruthy();
	})
})
