<script lang="ts">
	import { PUBLIC_COLLECTION_ID, PUBLIC_DATABASE_ID } from '$env/static/public'
	import { databases } from '$lib/appwrite'
	import { authStore } from '$lib/stores'
	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'
	import LinkCard from './LinkCard.svelte'
	import Loader from './Loader.svelte'

	//state-Added Links
	let allAvailableLinks: any

	//fetching state
	let fetchingLinks = false
	//logic - show added links
	const fetchLinks = async () => {
		fetchingLinks = true
		const data = await databases.getDocument(
			PUBLIC_DATABASE_ID,
			PUBLIC_COLLECTION_ID,
			$authStore.$id
		)
		const socialLinks = {
			instagram: data.instagram,
			facebook: data.facebook,
			twitter: data.twitter,
			github: data.github,
			linkedin: data.linkedin,
			youtube: data.youtube,
			website: data.website
		}

		// Filter out null links
		allAvailableLinks = Object.entries(socialLinks)
			.filter(([key, value]) => value !== null)
			.map(([key, value]) => ({ [key]: value }))
		fetchingLinks = false
	}
	//lifecycle
	onMount(() => {
		fetchLinks()
	})
	//state-link update
	let selectedSocialLink = ''
	let allSocialLinks: any = {
		instagram: '',
		facebook: '',
		twitter: '',
		github: '',
		linkedin: '',
		youtube: '',
		website: ''
	}
	let updateLinkErrorMessage = ''
	let addLinkLoading = false
	//logic - add links
	const handleSocialChange = (e: any) => {
		selectedSocialLink = e.target.value
	}

	const updateLink = async () => {
		addLinkLoading = true
		fetchingLinks = true
		updateLinkErrorMessage = ''
		const currentLink = allSocialLinks[selectedSocialLink]
		const isValidLink = /^[^\s]+$/.test(currentLink) && currentLink.length > 3
		if (isValidLink) {
			try {
				await databases.updateDocument(PUBLIC_DATABASE_ID, PUBLIC_COLLECTION_ID, $authStore.$id, {
					[selectedSocialLink]: currentLink
				})
				allSocialLinks[selectedSocialLink] = ''
				await fetchLinks()
				fetchingLinks = false
				addLinkLoading = false
			} catch (error: any) {
				console.log(error.message)
				allSocialLinks[selectedSocialLink] = ''
				fetchingLinks = false
				addLinkLoading = false
			}
		} else {
			updateLinkErrorMessage = 'Enter a valid link'
			fetchingLinks = false
			addLinkLoading = false
		}
	}
	const onDelete = async (platform: string) => {
		fetchingLinks = true
		try {
			await databases.updateDocument(PUBLIC_DATABASE_ID, PUBLIC_COLLECTION_ID, $authStore.$id, {
				[platform]: null
			})
			await fetchLinks()
		} catch (error: any) {
			console.log(error.message)
			await fetchLinks()
		}
	}
</script>

<div class="mt-2 flex w-full flex-col justify-center p-6 md:mt-12 md:flex-row md:justify-around">
	<!-- Added Links -->
	<div in:fade={{ duration: 500 }} class="w-full">
		<h3>Added Links</h3>
		<div class="mt-4 flex flex-col items-center justify-center">
			<!-- only show this div if there are links -->
			{#if allAvailableLinks && allAvailableLinks.length > 0}
				<!-- Fetxhing skeleton -->
				{#if fetchingLinks}
					<div class="flex w-52 animate-fadeIn flex-col gap-4 py-4">
						<div class="skeleton h-10 w-full"></div>
						<div class="skeleton h-10 w-full"></div>
						<div class="skeleton h-10 w-full"></div>
					</div>
				{:else}
					<!-- Actual Links -->
					<div class="flex animate-fadeIn flex-col items-center justify-center gap-y-4">
						{#each allAvailableLinks as link}
							{#each Object.entries(link) as [platform, url]}
								<LinkCard {platform} {url} handleClick={() => onDelete(platform)} />
							{/each}
						{/each}
					</div>
				{/if}
			{:else if allAvailableLinks && allAvailableLinks.length == 0}
				<p class="max-w-xs">No links have been added, Please add links from the list.</p>
			{/if}
		</div>
	</div>
	<!-- Add links -->
	<div class="mt-8 w-full md:mt-0">
		<h3>Update your social links</h3>
		<div class="mt-4 flex flex-col items-center justify-center gap-y-5">
			<select
				bind:value={selectedSocialLink}
				on:change={handleSocialChange}
				class="select select-bordered w-full max-w-xs"
			>
				<option value="" disabled selected>Chose a link to update from this list</option>
				<option value="instagram">Instagram</option>
				<option value="facebook">Facebook</option>
				<option value="twitter">Twitter</option>
				<option value="github">Github</option>
				<option value="linkedin">LinkedIn</option>
				<option value="youtube">Youtube</option>
				<option value="website">Personal Site</option>
			</select>

			{#if selectedSocialLink}
				{#key updateLinkErrorMessage}
					<div
						class="flex w-full flex-col items-center justify-center gap-y-2"
						in:fade={{ duration: 500 }}
					>
						<input
							bind:value={allSocialLinks[selectedSocialLink]}
							class="input input-bordered w-full max-w-xs"
							type="text"
							placeholder="Type or Paste your link"
							spellcheck="false"
							autocapitalize="off"
							autocorrect="off"
							autocomplete="off"
						/>
						{#if updateLinkErrorMessage}
							<p class="animate-fadeIn text-center text-sm text-rose-500">
								{updateLinkErrorMessage}
							</p>
						{/if}
						{#key addLinkLoading}
							{#if addLinkLoading}
								<Loader addOn="animate-fadeIn h-12" />
							{:else}
								<button
									on:click={updateLink}
									class="mt-4 h-12 animate-fadeIn rounded-xl bg-black px-4 py-3 text-sm text-white transition-all duration-500 ease-in-out hover:scale-105 hover:opacity-70 active:scale-100"
								>
									Update link
								</button>
							{/if}
						{/key}
					</div>
				{/key}
			{/if}
		</div>
	</div>
</div>

<style lang="postcss">
	h3 {
		@apply text-center text-2xl font-bold;
	}
</style>
