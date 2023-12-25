<script lang="ts">
	import { fade } from 'svelte/transition'
	//props
	export let url: any
	export let platform: string
</script>

<a target="_blank" href={url} class="capitalize no-underline">
	<div
		transition:fade={{ duration: 300 }}
		class="flex w-72 items-center justify-between rounded-xl bg-white/30 px-4 py-4 shadow backdrop-blur-md transition-all duration-500 hover:scale-105"
	>
		<img src={`/logos/${platform}.svg`} width="35px" alt="logo" class="" />
		<p class="mr-[35px] w-full text-center text-lg">{platform}</p>
	</div>
</a>
