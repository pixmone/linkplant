import { authStore } from '$lib/stores'
import { redirect } from '@sveltejs/kit'
import { get } from 'svelte/store'

export const load = async () => {
	const account = get(authStore)
	if (!account) {
		throw redirect(307, '/login')
	}
}
