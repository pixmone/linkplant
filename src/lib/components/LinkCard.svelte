<script lang="ts">
	import Icon from '@iconify/svelte'
	import { fade } from 'svelte/transition'
	//props
	export let url: any
	export let platform: string
	export let handleClick: () => void
</script>

<div
	transition:fade={{ duration: 300 }}
	on:outrostart={() => handleClick()}
	class="flex w-72 items-center justify-between rounded-xl border-2 border-gray-50 p-2 shadow transition-all duration-300 hover:scale-105"
>
	<img src={`/logos/${platform}.svg`} width="25px" alt="logo" class="text-white" />
	<a target="_blank" href={url} class="capitalize no-underline">{platform}</a>
	<button on:click={handleClick}>
		<Icon
			class="text-rose-400 transition-all duration-300 hover:scale-150 active:scale-100"
			icon="basil:trash-solid"
			width="26"
		/>
	</button>
</div>
