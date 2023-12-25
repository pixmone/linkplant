<script lang="ts">
	import LogInForm from '$lib/components/LogInForm.svelte'
</script>

<section class="container mx-auto px-6 pb-4 pt-36 md:px-10 md:pt-28">
	<div class="mx-auto flex w-full overflow-hidden rounded-2xl py-6 shadow-2xl md:h-[700px] md:py-0">
		<div class="mx-auto flex items-center justify-center p-10">
			<LogInForm />
		</div>
		<div class="hidden justify-end lg:flex">
			<img draggable="false" src="/stock.jpeg" alt="login" class="w-auto" />
		</div>
	</div>
</section>
