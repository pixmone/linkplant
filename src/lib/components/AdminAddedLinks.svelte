<script lang="ts">
	import { PUBLIC_COLLECTION_ID, PUBLIC_DATABASE_ID } from '$env/static/public'
	import { databases } from '$lib/appwrite'
	import { authStore } from '$lib/stores'
	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'

	//state
	let allValidLinks: any
	const platformStyles: any = {
		twitter: 'text-cyan-400',
		facebook: 'text-rose-400'
	}
	const fetchLinks = async () => {
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
		allValidLinks = Object.entries(socialLinks)
			.filter(([key, value]) => value !== null)
			.map(([key, value]) => ({ [key]: value }))
	}
	//lifecycle
	onMount(() => {
		fetchLinks()
	})
</script>

<div in:fade={{ duration: 500 }} class="border border-emerald-400">
	<h3 class="text-center text-2xl font-bold">Added Links</h3>

	{#if allValidLinks && allValidLinks.length > 0}
		<div>
			{#each allValidLinks as link}
				{#each Object.entries(link) as [platform, url]}
					<!-- Display an icon and link with different classes for each platform -->
					<div class="link-item">
						{#if platformStyles[platform]}
							<span class={platformStyles[platform]}></span>
						{/if}
						<p class={platformStyles[platform]}>{platform}: {url}</p>
					</div>
				{/each}
			{/each}
		</div>
	{/if}
</div>
