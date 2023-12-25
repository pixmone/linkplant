<script lang="ts">
	import { fade } from 'svelte/transition'
	//props
	export let url: any
	export let platform: string
</script>

<a target="_blank" href={url} class="capitalize no-underline">
	<div
		transition:fade={{ duration: 300 }}
		class="flex w-72 items-center justify-between rounded-xl bg-white/30 px-3 py-2 shadow backdrop-blur-md transition-all duration-500 hover:scale-105"
	>
		<img src={`/logos/${platform}.svg`} width="25px" alt="logo" class="" />
		<p class="mr-6 w-full text-center">{platform}</p>
	</div>
</a>
