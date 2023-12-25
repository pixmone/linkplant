<script lang="ts">
	import { fade } from 'svelte/transition'

	export let addOn = ''
</script>

<div in:fade out:fade class={`flex justify-center ${addOn}`}>
	<span class="loading loading-ball loading-xs"></span>
	<span class="loading loading-ball loading-sm"></span>
	<span class="loading loading-ball loading-md"></span>
	<span class="loading loading-ball loading-lg"></span>
</div>
