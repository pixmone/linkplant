<script lang="ts">
	import { stepStore } from '$lib/stores'
	import { fly } from 'svelte/transition'
	import Step1 from './multiStepForm/Step1.svelte'
	import Step2 from './multiStepForm/Step2.svelte'
	import Step3 from './multiStepForm/Step3.svelte'

	//enter key press
	function handleKeydown(event: KeyboardEvent) {
		if (event.keyCode == 13) {
			event.preventDefault()
		}
	}
</script>

<section class="container mx-auto pb-4 pt-14 md:pt-16">
	<div class="text-center">
		<ul class="steps w-full max-w-[600px]">
			<li class={`step ${$stepStore >= 1 && 'step-neutral'}`}>Register</li>
			<li class={`step ${$stepStore >= 2 && 'step-neutral'}`}>Username</li>
			<li class={`step ${$stepStore >= 3 && 'step-neutral'}`}>Picture</li>
		</ul>
	</div>

	<div class="mx-auto w-max px-2 pt-14">
		{#key $stepStore}
			<div
				in:fly={{ x: '100%', duration: 500, delay: 500 }}
				out:fly={{ x: '-100%', duration: 500 }}
			>
				{#if $stepStore === 1}
					<Step1 />
				{:else if $stepStore === 2}
					<Step2 />
				{:else if $stepStore === 3}
					<Step3 />
				{/if}
			</div>
		{/key}
	</div>
</section>
