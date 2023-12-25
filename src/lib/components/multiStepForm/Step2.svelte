<script lang="ts">
	import { PUBLIC_COLLECTION_ID, PUBLIC_DATABASE_ID } from '$env/static/public'
	import { ID, Query, account, databases } from '$lib/appwrite'
	import { authStore, formStore, initialFormData, stepStore } from '$lib/stores'
	import { fade } from 'svelte/transition'
	import Loader from '../Loader.svelte'
	import Toasts from '../Toasts.svelte'
	import Icon from '@iconify/svelte'
	import { goto } from '$app/navigation'

	//state
	let userNameLoading = false
	let errorMessage = ''
	let indicatorMessage = ''
	let indicatorLoading = false
	let successMessage = ''
	let debounceTimer: NodeJS.Timeout
	let formError = ''
	let success = false

	//styles
	let inputClass = 'focus:ring-black'
	let icon = ''
	let iconClass = ''

	$: if (successMessage) {
		inputClass = 'focus:ring-emerald-500'
		icon = 'charm:tick-double'
		iconClass = 'text-emerald-500'
	} else if (indicatorMessage) {
		inputClass = 'focus:ring-rose-500'
		icon = 'entypo:cross'
		iconClass = 'text-rose-500'
	}

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
			indicatorLoading = true
			icon = ''
			iconClass = ''
			indicatorMessage = ''
			successMessage = ''
			clearTimeout(debounceTimer)

			debounceTimer = setTimeout(async () => {
				if (await available()) {
					successMessage = 'Username is available'
					indicatorLoading = false
				} else {
					indicatorMessage = 'Username is not available'
					indicatorLoading = false
				}
			}, 1000)
		}
	}
	const handleSignUp = async () => {
		try {
			await account.create(ID.unique(), $formStore.email!, $formStore.password!, $formStore.name!)
			await account.createEmailSession($formStore.email!, $formStore.password!)
			authStore.set(await account.get())
			await databases.createDocument(PUBLIC_DATABASE_ID, PUBLIC_COLLECTION_ID, $authStore.$id, {
				userName: $formStore.userName
			})
			success = true
			stepStore.set(3)
		} catch (error: any) {
			formError = 'Account already exists'
			console.log(error.message)

			setTimeout(() => {
				stepStore.set(1)
				formStore.set(initialFormData)

				goto('/')
			}, 2000)
		}
	}
	const handleStep = async () => {
		userNameLoading = true
		errorMessage = ''
		successMessage = ''
		indicatorMessage = ''
		formError = ''
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
			await handleSignUp()
			userNameLoading = false
		}
	}
</script>

<div class="card card-normal w-96 py-6 shadow-xl md:px-6">
	<div class="card-body flex flex-col items-center justify-center gap-y-14 text-center">
		<h2 class="font-sans text-3xl font-extrabold">Create Your Unique Username</h2>
		<div class="relative h-16 w-full">
			<input
				class={inputClass}
				spellcheck="false"
				autocapitalize="off"
				autocorrect="off"
				autocomplete="off"
				type="text"
				on:input={checkAvailable}
				bind:value={$formStore.userName}
				placeholder="User Name"
			/>
			{#if indicatorLoading}
				<span class="loading loading-dots loading-md absolute right-3 top-1/4"></span>
			{/if}
			{#if icon}
				<Icon class={`absolute right-3 top-1/4 ${iconClass}`} {icon} width="20" height="20" />
			{/if}
			{#if indicatorMessage || successMessage}
				<div class="mt-2 flex w-full items-center justify-center">
					{#if successMessage}
						<p class="text-sm text-emerald-500">{successMessage}</p>
					{:else}
						<p class="text-sm text-rose-500">{indicatorMessage}</p>
					{/if}
				</div>
			{/if}
		</div>
		{#key userNameLoading}
			{#if userNameLoading}
				<Loader addOn="h-16" />
			{:else}
				<button
					in:fade
					on:click={handleStep}
					type="button"
					class="custom-btn h-16 rounded-full bg-black text-white shadow-md hover:scale-105 hover:opacity-70 active:scale-100"
					>Create Username</button
				>
			{/if}
		{/key}
	</div>
</div>
<Toasts
	message={successMessage ? successMessage : errorMessage}
	toastType={successMessage ? 'alert-success' : 'alert-error'}
/>
{#if success}
	<Toasts toastType="alert-success" message="Signed up, edit your links" />
{/if}
{#if formError}
	<Toasts toastType="alert-error" message={formError} />
{/if}

<!-- styles -->
<style lang="postcss">
	input {
		@apply w-full max-w-sm rounded-md bg-gray-100 px-4 py-3 shadow-md outline-none focus:border focus:border-gray-400 focus:ring-2  focus:ring-offset-2 focus:ring-offset-white;
	}
</style>
