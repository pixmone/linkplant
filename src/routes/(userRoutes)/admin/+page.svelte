<script lang="ts">
	import { PUBLIC_BUCKET_ID, PUBLIC_COLLECTION_ID, PUBLIC_DATABASE_ID } from '$env/static/public'
	import { databases, storage } from '$lib/appwrite'
	import AdminLinks from '$lib/components/AdminLinks.svelte'
	import AdminProfilePicture from '$lib/components/AdminProfilePicture.svelte'
	import LoadingPage from '$lib/components/LoadingPage.svelte'
	import { authStore, imageSrcStore } from '$lib/stores'
	import type { Models } from 'appwrite'
	import { onMount } from 'svelte'
	//props
	type Response = {
		response: {
			userName: string
			profilePicture: boolean
		} & Models.Document
	}
	let userData: any
	let pageLoading = false

	onMount(async () => {
		pageLoading = true

		try {
			const data = await databases.getDocument(
				PUBLIC_DATABASE_ID,
				PUBLIC_COLLECTION_ID,
				$authStore.$id
			)
			if (data.profilePicture) {
				try {
					const uploadedImage = await storage.getFileDownload(PUBLIC_BUCKET_ID, $authStore.$id)
					imageSrcStore.set(uploadedImage.href)
				} catch (error: any) {
					console.log(error.message)
				}
			}
			userData = data
		} catch (error: any) {
			console.log(error.message)
		} finally {
			pageLoading = false
		}
	})
	//userData

	//states
</script>

{#if pageLoading}
	<LoadingPage pageLoading={true} />
{:else}
	<section class="container mx-auto mt-6 flex h-full flex-col items-center justify-center p-4">
		<!-- first div  -->
		{#if userData}
			<AdminProfilePicture userName={userData.userName} bio={userData.bio} />
		{/if}
		<!-- second div -->
		<AdminLinks />
	</section>
{/if}
