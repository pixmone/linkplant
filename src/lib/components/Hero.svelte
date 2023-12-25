<script lang="ts">
	import HeroUsername from './HeroUsername.svelte'
</script>

<section
	class="container mx-auto grid min-h-[auto] pt-24 md:min-h-screen md:max-w-[1536px] md:grid-cols-2 md:pt-48 lg:px-12 xl:px-24"
>
	<div
		class="flex animate-slideRight flex-col items-center justify-start gap-y-10 px-4 text-left md:px-0"
	>
		<div>
			<h1 class="font-heading font-[700px] leading-[1.05] tracking-tight text-linkTree-text">
				Everything you are. In one, simple link in bio.
			</h1>
		</div>
		<div>
			<p class="font-normal leading-[1.5] tracking-tight text-linkTree-text">
				Join 4+ people using Linkpl.ant for their link in bio. One link to help you share everything
				you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social
				media profiles.
			</p>
		</div>
		<HeroUsername />
	</div>
	<div class="mt-4 flex animate-slideLeft items-center justify-center md:-mt-16 md:items-start">
		<img draggable="false" src="/hero-image.png" alt="hero" />
	</div>
</section>

<style lang="postcss">
	h1 {
		font-size: clamp(32px, 8.5vmin, 88px);
	}
	p {
		font-size: clamp(16px, 2vmin, 20px);
	}
</style>
