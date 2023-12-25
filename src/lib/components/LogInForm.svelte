<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { account } from '$lib/appwrite'
	import { authStore } from '$lib/stores'
	import Loader from './Loader.svelte'
	import Toasts from './Toasts.svelte'

	//logic

	let isDisabled = false
	let email: string
	let password: string
	let formError: string | null = null

	const handleSubmit = async () => {
		isDisabled = true
		try {
			await account.createEmailSession(email, password)
			authStore.set(await account.get())
			await invalidateAll()
			isDisabled = false
		} catch (error: any) {
			isDisabled = false
			formError = error.message
		}
	}
</script>

<form
	class="flex w-full flex-col items-center justify-center gap-y-14"
	on:submit|preventDefault={handleSubmit}
>
	<!-- Heading -->
	<div class="flex flex-col text-center md:gap-y-2">
		<h2 class="font-sans text-3xl font-extrabold md:text-5xl">Welcome back</h2>
		<p class="text-sm text-gray-400 md:text-base">Login to your linkpl.ant</p>
	</div>
	<!-- Inputs -->
	<div class="flex w-full flex-col items-center justify-center gap-y-4 px-2">
		<input
			spellcheck="false"
			autocapitalize="off"
			autocorrect="off"
			autocomplete="off"
			type="email"
			bind:value={email}
			placeholder="Email"
		/>
		<input
			spellcheck="false"
			autocapitalize="off"
			autocorrect="off"
			autocomplete="off"
			type="password"
			bind:value={password}
			placeholder="Password"
		/>
	</div>
	<!-- buttons -->
	<div class="flex flex-col gap-y-4 text-center">
		{#if isDisabled}
			<Loader addOn="text-gray-700 h-16" />
		{:else}
			<button
				class="custom-btn h-16 rounded-full bg-black text-white shadow-md hover:scale-105 hover:opacity-70"
				disabled={isDisabled}
				type="submit">{isDisabled ? 'please wait...' : 'Log in'}</button
			>
		{/if}

		<p class="text-sm text-zinc-500">
			Don't have an account? <a
				class="text-purple-400 underline transition-all duration-300 hover:text-purple-300"
				href="/signup">Sign up</a
			>
		</p>
	</div>
</form>
{#if formError}
	<Toasts toastType="alert-error" message={formError} />
{/if}

<!-- styles -->
<style lang="postcss">
	input {
		@apply w-full max-w-sm rounded-md bg-gray-100 px-4 py-3 shadow-md outline-none focus:border focus:border-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white;
	}
</style>
