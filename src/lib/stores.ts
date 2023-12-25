import { writable } from 'svelte/store'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authStore = writable<any>(null)

//auth store
export const stepStore = writable<1 | 2 | 3>(1)

//formStore types
type FormDataHandle = {
	name?: string
	email?: string
	password?: string
	confirmPassword?: string
	userName?: string
	theme?: 1 | 2 | 3
}
export const initialFormData: FormDataHandle = {
	name: '',
	email: '',
	password: '',
	confirmPassword: '',
	userName: '',
	theme: 1
}
//form store
export const formStore = writable<FormDataHandle>({
	...initialFormData
})
export const imageSrcStore = writable('/placeholder.png')
