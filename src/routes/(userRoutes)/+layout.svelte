<script lang="ts">
	import { fade } from 'svelte/transition'
	import { page } from '$app/stores'
	import Navbar from '$lib/components/Navbar.svelte'

	//logic
</script>

<main class:bg-linkTree-bg={$page.url.pathname == '/'}>
	<Navbar />
	{#key $page.url}
		<div in:fade={{ duration: 700 }}>
			<slot />
		</div>
	{/key}
</main>
