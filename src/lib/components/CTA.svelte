<section class="flex items-center justify-center bg-[#e9c0e9] py-16">
	<div class="flex flex-col items-center justify-center gap-6 md:flex-row">
		<a href="/login">
			<button class="custom-btn btn1">Log in</button>
		</a>
		<p class="text-outline">Or</p>
		<a href="/signup">
			<button class="custom-btn btn2"> Get started for free </button>
		</a>
	</div>
</section>

<style lang="postcss">
	.btn1 {
		@apply animate-slideRight  rounded-lg bg-[#eff0ec] hover:rounded-2xl hover:bg-zinc-200;
	}

	.btn2 {
		@apply h-full animate-slideLeft  rounded-full bg-[#502274] font-bold text-white hover:scale-110 hover:opacity-70 md:animate-none;
	}
	.text-outline {
		-webkit-text-stroke: 2px #b37ddc;
		text-stroke: 2px #b37ddc;
		color: white;
		font-weight: 900;
		font-size: x-large;
	}
</style>
