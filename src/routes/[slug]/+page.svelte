<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { PUBLIC_BUCKET_ID, PUBLIC_COLLECTION_ID, PUBLIC_DATABASE_ID } from '$env/static/public'
	import { databases, storage } from '$lib/appwrite'
	import LoadingPage from '$lib/components/LoadingPage.svelte'
	import PageLinkCard from '$lib/components/PageLinkCard.svelte'
	import Icon from '@iconify/svelte'
	import { Query } from 'appwrite'
	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'

	//states
	let loading = true
	let userData: any
	let imgSrc = '/placeholder.png'
	//state-Added Links
	let allAvailableLinks: any

	//dataFetching
	onMount(async () => {
		loading = true
		try {
			const promise = await databases.listDocuments(PUBLIC_DATABASE_ID, PUBLIC_COLLECTION_ID, [
				Query.equal('userName', $page.params.slug)
			])
			const response = promise.documents
			if (response.length === 0) {
				await goto('/')
			}
			userData = response[0]
			//profilePicture

			if (userData.profilePicture) {
				const img = storage.getFileDownload(PUBLIC_BUCKET_ID, userData.$id)
				imgSrc = img.href
			}
			//links
			const socialLinks = {
				instagram: userData.instagram,
				facebook: userData.facebook,
				twitter: userData.twitter,
				github: userData.github,
				linkedin: userData.linkedin,
				youtube: userData.youtube,
				website: userData.website
			}
			// Filter out null links
			allAvailableLinks = Object.entries(socialLinks)
				.filter(([key, value]) => value !== null)
				.map(([key, value]) => ({ [key]: value }))
		} catch (error: any) {
			console.log(error.message)
			await goto('/')
		} finally {
			loading = false
		}
		console.log(allAvailableLinks)
	})
	//profilePicture
</script>

{#key loading}
	{#if loading}
		<LoadingPage pageLoading={loading} />
	{/if}
	{#if userData}
		<main
			class="relative flex h-full min-h-screen animate-fadeIn flex-col items-center justify-start gap-y-5 bg-[url('/bg-profile.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat px-4 pt-20"
			in:fade={{ duration: 1000, delay: 200 }}
		>
			<!-- profile picture -->
			<div class="h-40 w-40 rounded-full bg-white/20 p-3 shadow backdrop-blur-sm">
				<img
					class="h-full w-full rounded-full object-cover shadow"
					src={imgSrc}
					alt="dp"
					draggable="false"
				/>
			</div>
			<!-- bio -->
			<div
				class="flex animate-fadeIn flex-col items-center justify-center gap-y-2 rounded-xl bg-white/30 px-4 py-2 shadow backdrop-blur-md"
			>
				<h1 class="font-heading text-3xl font-black capitalize">
					{userData.userName}
					<img class="-mt-1 inline w-6" src="/blue-tick.svg" alt="verified" draggable="false" />
				</h1>
				<p class="text-center text-sm text-gray-700">{userData.bio}</p>
			</div>

			{#if allAvailableLinks.length > 0}
				<div
					class="flex animate-slideRight flex-col items-center justify-center gap-y-3 pb-20 pt-9"
				>
					<h3 class="mb-1 text-lg font-bold">My Socials</h3>
					{#each allAvailableLinks as link}
						{#each Object.entries(link) as [platform, url]}
							<PageLinkCard {platform} {url} />
						{/each}
					{/each}
				</div>
			{:else}
				<div
					class="mt-24 flex flex-col items-center justify-center gap-y-2 rounded-xl bg-white/30 px-4 py-2 backdrop-blur-md"
				>
					<h3 class=" text-center text-lg">
						Add links in your profile, visit <a class="text-gray-500 underline" href="/admin"
							>admin section</a
						>
					</h3>
				</div>
			{/if}

			<div class="absolute bottom-3">
				<a href="/signup" target="_blank"
					><button
						class="flex items-center justify-center gap-x-2 rounded-full bg-white px-4 py-3 shadow-2xl transition-all duration-300 hover:scale-110 hover:opacity-70"
					>
						<Icon icon="entypo:tree" width="20" class="text-linkTree-bg2" />
						<h3 class="text-sm">Create your Linkpl.ant</h3>
					</button></a
				>
			</div>
		</main>
	{/if}
{/key}
