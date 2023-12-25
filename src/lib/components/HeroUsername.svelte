<script lang="ts">
	import { goto } from '$app/navigation'
	import { PUBLIC_COLLECTION_ID, PUBLIC_DATABASE_ID } from '$env/static/public'
	import { Query, databases } from '$lib/appwrite'
	import { formStore } from '$lib/stores'
	import { fade } from 'svelte/transition'
	import Loader from './Loader.svelte'
	import Toasts from './Toasts.svelte'

	//states
	let inputRef: HTMLInputElement
	let userNameLoading = false
	let errorMessage = ''
	let successMessage = ''
	let debounceTimer: NodeJS.Timeout

	//functions
	const available: () => Promise<boolean> = async () => {
		try {
			const promise = await databases.listDocuments(PUBLIC_DATABASE_ID, PUBLIC_COLLECTION_ID, [
				Query.equal('userName', $formStore.userName!)
			])
			const response = promise.documents
			if (response.length === 0) {
				return true
			} else {
				return false
			}
		} catch (error: any) {
			return false
		}
	}
	const checkAvailable: () => Promise<void> = async () => {
		if ($formStore.userName!.length > 2) {
			userNameLoading = true
			errorMessage = ''
			successMessage = ''
			clearTimeout(debounceTimer)

			debounceTimer = setTimeout(async () => {
				if (await available()) {
					successMessage = 'Username available'
					userNameLoading = false
				} else {
					errorMessage = 'Username not available'
					userNameLoading = false
				}
			}, 1000)
		}
	}
	const handleUserName = async () => {
		userNameLoading = true
		errorMessage = ''
		successMessage = ''
		//if else
		const validation = /^[a-zA-Z0-9]+$/
		errorMessage = ''
		if (!$formStore.userName) {
			errorMessage = 'Username cannot be empty'
			userNameLoading = false
		} else if ($formStore.userName.length < 3) {
			errorMessage = 'Minimum character limit is 3'
			userNameLoading = false
		} else if ($formStore.userName.length > 16) {
			errorMessage = 'Maximum character limit is 16'
			userNameLoading = false
		} else if (!validation.test($formStore.userName)) {
			errorMessage = 'Only numbers or alphabets allowed!!'
			userNameLoading = false
		} else if (!(await available())) {
			errorMessage = 'Username is already taken'
			userNameLoading = false
		} else {
			userNameLoading = false
			goto('/signup')
		}
	}
	//input styles
	const focusInput = () => {
		inputRef.focus()
	}
	const handleKeyDown = () => {}
</script>

<div class="flex flex-col gap-6 md:mr-auto md:flex-row">
	<div
		class="flex w-[243px] cursor-text items-center justify-center rounded-lg bg-white px-4 py-5 text-zinc-400 shadow-md focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-2 focus-within:ring-offset-linkTree-bg"
		on:click={focusInput}
		on:keydown={handleKeyDown}
		role="button"
		tabindex="0"
	>
		<p class="text-md">linkpl.ant/</p>
		<input
			on:input={checkAvailable}
			bind:this={inputRef}
			bind:value={$formStore.userName}
			spellcheck="false"
			autocapitalize="off"
			autocorrect="off"
			autocomplete="off"
			class="text-md w-full focus:outline-none"
			type="text"
			placeholder="yourname"
		/>
	</div>

	{#key userNameLoading}
		{#if userNameLoading}
			<Loader addOn="text-linkTree-text h-16 w-[243px]" />
		{:else}
			<button
				in:fade
				type="button"
				on:click={handleUserName}
				class="custom-btn h-16 min-w-fit rounded-full bg-linkTree-accent transition-all duration-300 hover:scale-105 hover:bg-linkTree-accent/90 active:scale-100"
				>Claim your username</button
			>
		{/if}
	{/key}
</div>
<Toasts
	message={successMessage ? successMessage : errorMessage}
	toastType={successMessage ? 'alert-success' : 'alert-error'}
/>
