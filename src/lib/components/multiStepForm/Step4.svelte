<script lang="ts">
	import { formStore } from '$lib/stores'
	import Loader from '../Loader.svelte'

	//props
	export let isDisabled: boolean
	export let handleSubmit: () => void

	//logic
</script>

<!-- ui -->

<!-- container -->
<div class="container mx-auto">
	<!-- flex -->
	<div class="flex flex-col items-center justify-center gap-y-10">
		<h2 class="mt-6 font-sans text-3xl font-extrabold">Select a theme</h2>
		<!-- CTA -->
		<div class="flex gap-x-8 overflow-auto rounded-[36px] bg-gray-100 p-8 shadow-lg">
			<div>
				<input class="hidden" id="radio_1" type="radio" bind:group={$formStore.theme} value={1} />
				<label
					class="flex h-80 w-56 cursor-pointer flex-col items-center justify-center rounded-xl bg-base-100 transition-all duration-200 ease-in hover:scale-105 hover:rounded-3xl active:scale-100 active:rounded-2xl"
					for="radio_1"
				>
					<h4>theme 1</h4>
				</label>
			</div>
			<div>
				<input class="hidden" id="radio_2" type="radio" bind:group={$formStore.theme} value={2} />
				<label
					class="flex h-80 w-56 cursor-pointer flex-col items-center justify-center rounded-xl bg-base-100 transition-all duration-200 ease-in hover:scale-105 hover:rounded-3xl active:scale-100 active:rounded-2xl"
					for="radio_2"
				>
					<h4>theme 2</h4>
				</label>
			</div>
			<div>
				<input class="hidden" id="radio_3" type="radio" bind:group={$formStore.theme} value={3} />
				<label
					class="flex h-80 w-56 cursor-pointer flex-col items-center justify-center rounded-xl bg-base-100 transition-all duration-200 ease-in hover:scale-105 hover:rounded-3xl active:scale-100 active:rounded-2xl"
					for="radio_3"
				>
					<h4>theme 3</h4>
				</label>
			</div>
		</div>
		<div>
			{#if isDisabled}
				<Loader addOn="h-16" />
			{:else}
				<button
					class="custom-btn h-16 rounded-full bg-black text-white shadow-md hover:scale-105 hover:opacity-70 active:scale-100"
					disabled={isDisabled}
					on:click={handleSubmit}>Sign up</button
				>
			{/if}
		</div>
	</div>
</div>

<!-- css -->
<style lang="postcss">
	input:checked + label {
		@apply scale-105 rounded-3xl border border-accent transition-all duration-200 ease-in;
	}
</style>
