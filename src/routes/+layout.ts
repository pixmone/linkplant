import { account } from '$lib/appwrite'
import { authStore } from '$lib/stores'

export const ssr = false

export const load = async () => {
	try {
		const fetchAccount = await account.get()
		authStore.set(fetchAccount)
	} catch {
		authStore.set(null)
	}
}
