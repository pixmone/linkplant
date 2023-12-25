<script lang="ts">
	import { fade } from 'svelte/transition'
	//prop
	export let pageLoading: boolean
</script>

{#if pageLoading}
	<div
		in:fade
		out:fade
		class="fixed right-0 top-0 z-20 flex h-full w-full items-center justify-center bg-white"
	>
		<div class="flex w-96 flex-col gap-4">
			<div class="skeleton h-56 w-full"></div>
			<div class="skeleton h-8 w-28"></div>
			<div class="skeleton h-4 w-full"></div>
			<div class="skeleton h-6 w-full"></div>
		</div>
	</div>
{/if}
