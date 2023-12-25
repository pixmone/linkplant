<script lang="ts">
	import { formStore, stepStore } from '$lib/stores'
	import Toasts from '../Toasts.svelte'

	//logic
	let errorMessage = ''
	const inputErrors: any = {
		name: false,
		email: false,
		password: false,
		confirmPassword: false
	}

	const handleStep = () => {
		errorMessage = ''
		Object.keys(inputErrors).forEach((key) => {
			inputErrors[key] = false
		})
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (
			$formStore.name === '' ||
			$formStore.email === '' ||
			$formStore.password === '' ||
			$formStore.confirmPassword === ''
		) {
			errorMessage = 'Please fill in all fields properly'
			Object.keys(inputErrors).forEach((key) => {
				inputErrors[key] = true
			})
		} else if ($formStore.name!.length < 3) {
			errorMessage = 'Type a valid name'
			inputErrors.name = true
		} else if (!emailRegex.test($formStore.email!)) {
			errorMessage = 'Enter a valid email address'
			inputErrors.email = true
			return false
		} else if ($formStore.password!.length < 8) {
			errorMessage = 'Minimum length of password is 8 '
			inputErrors.password = true
		} else if ($formStore.password !== $formStore.confirmPassword) {
			errorMessage = 'Passwords do not match'
			inputErrors.confirmPassword = true
		} else {
			stepStore.set(2)
		}
	}
</script>

<section class="card w-96 px-4 shadow-xl md:px-8">
	<div class="card-body items-center gap-y-8 text-center">
		<h2 class="font-sans text-3xl font-extrabold">Enter Details</h2>
		<div class="flex w-full flex-col justify-center gap-y-4">
			<input
				autocomplete="off"
				spellcheck="false"
				autocapitalize="off"
				type="text"
				bind:value={$formStore.name}
				placeholder="Name"
				class:border-rose-500={inputErrors.name}
			/>
			<input
				autocomplete="off"
				spellcheck="false"
				autocapitalize="off"
				type="email"
				bind:value={$formStore.email}
				placeholder="Email"
				class:border-rose-500={inputErrors.email}
			/>
			<input
				autocomplete="off"
				autocorrect="off"
				spellcheck="false"
				type="password"
				bind:value={$formStore.password}
				placeholder="Password"
				class:border-rose-500={inputErrors.password}
			/>
			<input
				spellcheck="false"
				autocorrect="off"
				autocomplete="off"
				type="password"
				bind:value={$formStore.confirmPassword}
				placeholder="Confirm Password"
				class:border-rose-500={inputErrors.confirmPassword}
			/>
		</div>
		<div class="flex flex-col gap-y-4">
			<button
				on:click={handleStep}
				type="button"
				class="custom-btn rounded-full bg-black text-white shadow-md hover:scale-105 hover:opacity-70 active:scale-100"
				>Sign up</button
			>
			<p class="text-sm text-zinc-500">
				Already have an account? <a
					class="text-purple-400 underline transition-all duration-300 hover:text-purple-300"
					href="/login">Log in</a
				>
			</p>
		</div>
	</div>
</section>
<Toasts toastType="alert-error" message={errorMessage} />

<style lang="postcss">
	input {
		@apply w-full max-w-sm rounded-md border bg-gray-100 px-4 py-3 shadow-md outline-none focus:border focus:border-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white;
	}
</style>
