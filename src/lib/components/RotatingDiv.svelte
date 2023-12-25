<script lang="ts">
	import { onMount } from 'svelte'

	let perspective = 500
	let rotationX = 0
	let rotationY = 0
	$: transform = `perspective: ${perspective}px; transform: rotate3d(1, 1, 0, ${rotationX}deg) rotate3d(1, 1, 0, ${rotationY}deg);`

	function handleMouseMove(event: MouseEvent) {
		const { clientX, clientY } = event
		const centerX = window.innerWidth / 2
		const centerY = window.innerHeight / 2

		const deltaX = clientX - centerX
		const deltaY = clientY - centerY

		const angleX = (deltaY / window.innerHeight) * 45 // Adjust the multiplier for the desired effect
		const angleY = (deltaX / window.innerWidth) * 45 // Adjust the multiplier for the desired effect

		rotationX = angleX
		rotationY = angleY
	}

	// Attach event listener when the component is mounted
	onMount(() => {
		window.addEventListener('mousemove', handleMouseMove)

		// Cleanup event listener when the component is unmounted
		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
		}
	})
</script>

<div
	class="card card-normal bg-linkTree-text/30 backdrop:blur-md"
	style={transform}
	on:mousemove={handleMouseMove}
	role="presentation"
>
	<slot />
</div>

<style>
	.card {
		width: 15rem;
		height: 24rem;
		position: relative;
		transform-style: preserve-3d;
		transition: transform 0.3s;
	}
</style>
