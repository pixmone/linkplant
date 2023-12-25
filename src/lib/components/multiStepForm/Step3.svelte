<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { PUBLIC_BUCKET_ID, PUBLIC_COLLECTION_ID, PUBLIC_DATABASE_ID } from '$env/static/public'
	import { databases, storage } from '$lib/appwrite'
	import { authStore, formStore, initialFormData, stepStore } from '$lib/stores'
	import LoadingPage from '../LoadingPage.svelte'

	//props

	//state
	let localImg: string = '/placeholder.png'
	let skeletonImage = false
	let isDisabled = true
	let loadingPage = false
	let skipDisabled = false

	//logic
	const showImg = async (e: any) => {
		skipDisabled = true
		skeletonImage = true
		const image = e.target.files[0]
		try {
			await storage.createFile(PUBLIC_BUCKET_ID, $authStore.$id, image)
			await databases.updateDocument(PUBLIC_DATABASE_ID, PUBLIC_COLLECTION_ID, $authStore.$id, {
				profilePicture: true
			})
			const uploadedImage = await storage.getFileDownload(PUBLIC_BUCKET_ID, $authStore.$id)
			localImg = uploadedImage.href
			skeletonImage = false
			isDisabled = false
		} catch (error) {
			console.log(error)
			skeletonImage = false
			skipDisabled = false
		}
	}
	//submit
	const handleSubmit = async () => {
		loadingPage = true
		await invalidateAll()
		stepStore.set(1)
		formStore.set(initialFormData)
		loadingPage = false
	}
</script>

<section class="card card-normal w-96 shadow-xl md:px-4">
	<div class="card-body flex flex-col items-center justify-center text-center">
		<div
			class="flex h-[250px] w-[250px] items-center justify-center overflow-hidden rounded-xl p-4"
		>
			{#if skeletonImage}
				<div class="flex h-full w-full flex-col gap-2 px-12 pb-4 pt-4">
					<div class="flex items-center justify-center">
						<div class="skeleton h-16 w-16 shrink-0 rounded-full"></div>
					</div>
					<div class="skeleton mt-4 h-full w-full"></div>
				</div>
			{:else}
				<img
					draggable="false"
					src={localImg}
					alt="img"
					class="h-full w-full rounded-xl object-cover"
				/>
			{/if}
		</div>

		<input
			accept=".jpg, .jpeg, .png"
			on:change={showImg}
			id="upload"
			type="file"
			class="file-input file-input-bordered w-full max-w-xs"
		/>
		<div class="relative mt-4 w-full">
			<button
				class={`custom-btn h-16 rounded-full  text-white shadow-md ${
					isDisabled ? 'bg-gray-300' : 'bg-black hover:scale-105 hover:opacity-70 active:scale-100'
				}`}
				disabled={isDisabled}
				on:click={handleSubmit}>Next</button
			>

			<button
				disabled={skipDisabled}
				class:text-zinc-300={skipDisabled}
				on:click={handleSubmit}
				class="absolute bottom-2 right-0 text-sm underline">Skip</button
			>
		</div>
	</div>
</section>

<LoadingPage pageLoading={loadingPage} />
