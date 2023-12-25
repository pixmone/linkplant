<script lang="ts">
	import { PUBLIC_BUCKET_ID, PUBLIC_COLLECTION_ID, PUBLIC_DATABASE_ID } from '$env/static/public'
	import { databases, storage } from '$lib/appwrite'
	import { authStore, imageSrcStore } from '$lib/stores'
	import Icon from '@iconify/svelte'
	import Loader from './Loader.svelte'
	import Toasts from './Toasts.svelte'

	//props
	export let userName: string
	export let bio: string
	//states
	const updateData: { [key: string]: string } = {
		userName: '',
		bio: ''
	}

	//profile picture

	let skeletonImage = false
	const uploadImage = async (e: any) => {
		skeletonImage = true
		const image = e.target.files[0]
		try {
			await storage.createFile(PUBLIC_BUCKET_ID, $authStore.$id, image)
			const uploadedImage = storage.getFileDownload(PUBLIC_BUCKET_ID, $authStore.$id)
			imageSrcStore.set(uploadedImage.href)
			console.log($imageSrcStore)
		} catch (error: any) {
			console.log(error.message)
		} finally {
			skeletonImage = false
		}
	}

	//bio and username update
	let bioUpdateLoading = false
	const handleUpdate = async (data: string) => {
		const dialog = document.getElementById(`update-${data}`)
		bioUpdateLoading = true

		try {
			await databases.updateDocument(PUBLIC_DATABASE_ID, PUBLIC_COLLECTION_ID, $authStore.$id, {
				[data]: updateData[data]
			})
			bio = updateData.bio
			dialog?.close()
			bioUpdateLoading = false
		} catch (error: any) {
			console.log(error.message)
			dialog?.close()
			bioUpdateLoading = false
		}
	}
	//copy link to clipboard
	let textToCopy = `https://linkplant.pixmone.com/${userName}`
	let toastClipboard = false

	const copyToClipboard = () => {
		toastClipboard = true
		const textarea = document.createElement('textarea')
		textarea.value = textToCopy
		document.body.appendChild(textarea)
		textarea.select()
		document.execCommand('copy')
		document.body.removeChild(textarea)
		setTimeout(() => (toastClipboard = false), 1000)
	}
</script>

<div class="flex flex-col items-center justify-center gap-y-6">
	<!-- profile picture -->
	<div class="relative h-40 w-40 rounded-full p-3 shadow">
		{#if skeletonImage}
			<div class="flex h-full w-full flex-col gap-2 overflow-hidden rounded-full">
				<div class="flex items-center justify-center">
					<div class="skeleton h-16 w-16 shrink-0 rounded-full"></div>
				</div>
				<div class="skeleton mt-4 h-full w-full"></div>
			</div>
		{:else}
			<img
				class="h-full w-full rounded-full object-cover"
				src={$imageSrcStore}
				alt="dp"
				draggable="false"
			/>
		{/if}
		{#if $imageSrcStore == '/placeholder.png'}
			<button
				on:click={() => document.getElementById('uploadDp')?.click()}
				class="absolute bottom-3 right-3 rounded-lg bg-gray-200 bg-opacity-80 p-1 transition-all duration-300 hover:scale-110 hover:bg-opacity-100"
			>
				<Icon icon="solar:camera-broken" width="25" />
			</button>
			<input
				accept=".jpg, .jpeg, .png"
				class="hidden"
				on:change={uploadImage}
				type="file"
				id="uploadDp"
			/>
		{/if}
	</div>
	<!-- heading -->
	<div>
		<h3>Hello @{userName}</h3>
		<p class="mt-3 max-w-[15rem] text-center text-sm">
			Update your profile and share <a
				target="_blank"
				class="text-linkTree-bg2 underline"
				href={`/${userName}`}>Your page</a
			>
			Or
		</p>
		<!-- copy to clipboard -->
		<div class="my-4 flex w-[15rem] items-center justify-center gap-x-1">
			<p class="text-center text-sm">Copy link :</p>
			<button
				on:click={copyToClipboard}
				class="transition-transform duration-300 hover:scale-125 active:scale-90"
				><Icon icon="solar:copy-bold-duotone" width="25" /></button
			>
		</div>

		{#if toastClipboard}
			<Toasts toastType="alert-success" message="Link Copied" />
		{/if}

		<p class="mt-3 flex max-w-[15rem] items-center justify-center gap-x-2 text-center text-sm">
			Bio: {bio}<button on:click={() => document.getElementById('update-bio')?.showModal()}
				><Icon
					class="text-gray-500/95 transition-transform duration-300 hover:scale-125"
					icon="akar-icons:edit"
					width="20"
				/></button
			>
		</p>
	</div>
	<!-- username -->
	<!-- <button class="btn" on:click={() => document.getElementById('update-userName')?.showModal()}
		>Update username</button
	>
	<dialog id="update-userName" class="modal">
		<div class="modal-box relative px-10 pb-6 pt-10">
			<form on:submit|preventDefault={() => handleUpdate('userName')} class="flex flex-col gap-y-3">
				<input
					bind:value={updateData.userName}
					minlength={3}
					maxlength={18}
					class="input border border-gray-200"
					placeholder="Username"
				/>
				{#key bioUpdateLoading}
					{#if bioUpdateLoading}
						<Loader addOn="h-16" />
					{:else}
						<button
							class="custom-btn mx-auto mt-4 h-16 w-fit rounded-full bg-black font-bold text-white hover:scale-105 hover:opacity-70"
							>Update Username</button
						>
					{/if}
				{/key}
			</form>
			<form method="dialog" class="modal-backdrop">
				<button class="absolute right-1 top-1"
					><Icon class=" text-rose-500" icon="carbon:close-outline" width="32" /></button
				>
			</form>
		</div>
	</dialog> -->
	<!-- Bio -->

	<dialog id="update-bio" class="modal">
		<div class="modal-box relative px-10 pb-6 pt-10">
			<form on:submit|preventDefault={() => handleUpdate('bio')} class="flex flex-col gap-y-3">
				<textarea
					bind:value={updateData.bio}
					autocomplete="off"
					spellcheck="false"
					autocapitalize="off"
					minlength={3}
					maxlength={90}
					class="max-h-[120px] min-h-[80px] rounded-2xl border border-gray-200 p-4 text-sm outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1 focus:ring-offset-white"
					cols="30"
					rows="3"
					placeholder="Your bio"
				/>
				{#key bioUpdateLoading}
					{#if bioUpdateLoading}
						<Loader addOn="h-16" />
					{:else}
						<button
							class="custom-btn mx-auto mt-4 h-16 w-fit rounded-full bg-black font-bold text-white hover:scale-105 hover:opacity-70"
							>Update Bio</button
						>
					{/if}
				{/key}
			</form>
			<form method="dialog" class="modal-backdrop">
				<button class="absolute right-1 top-1"
					><Icon class=" text-rose-500" icon="carbon:close-outline" width="32" /></button
				>
			</form>
		</div>
	</dialog>
</div>

<style lang="postcss">
	h3 {
		@apply text-center text-2xl font-bold;
	}
</style>
