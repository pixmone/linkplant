<script lang="ts">
	import { afterUpdate, onDestroy, onMount } from 'svelte'
	import { fade } from 'svelte/transition'
	export let message: string
	export let toastType: 'alert-success' | 'alert-error' = 'alert-success'

	let timeout: any

	$: if (message) {
		timeout = setTimeout(() => {
			message = ''
		}, 2000)
	}

	onDestroy(() => {
		clearTimeout(timeout)
	})
</script>

{#if message}
	<div class="toast toast-center top-14 z-50 sm:toast-bottom sm:bottom-10" transition:fade>
		<div class={`alert max-w-3xl ${toastType}`}>
			<span>{message}</span>
		</div>
	</div>
{/if}
