<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { account } from '$lib/appwrite'
	import { authStore, imageSrcStore } from '$lib/stores'
	import Icon from '@iconify/svelte'
	import { fly } from 'svelte/transition'
	import LoadingPage from './LoadingPage.svelte'
	import Loader from './Loader.svelte'

	//states

	let mobileMenu = false
	let pageLoading = false

	//logic
	const handleMobileNavClick = () => {
		mobileMenu = false
	}
	//logout
	const logout = async () => {
		mobileMenu = false
		pageLoading = true
		await account.deleteSession('current')
		authStore.set(null)
		imageSrcStore.set('/placeholder.png')
		await invalidateAll()
		pageLoading = false
	}
</script>

<nav
	class="container sticky left-0 right-0 top-0 z-30 mx-auto w-full max-w-[1536px] bg-none px-4 pt-4 lg:px-12 lg:pt-12 xl:px-24"
>
	<!-- navbar -->
	<div class="mx-auto rounded-full bg-white p-2 shadow-lg">
		<div class="flex h-16 items-center justify-between">
			<!-- LOGO -->
			<a href="/"
				><div
					class="flex items-center justify-center gap-x-4 pl-5 transition-opacity duration-300 hover:opacity-50"
				>
					<Icon icon="entypo:tree" width="28" class="text-linkTree-bg2" />
					<h1>Linkpl.ant</h1>
				</div></a
			>
			<!-- Mobile menu switcher -->
			<div class="flex h-12 w-12 items-center justify-center md:hidden">
				<button
					class="active:scale-502 transition-transform duration-300 ease-in-out active:rotate-90"
					on:click={() => (mobileMenu = !mobileMenu)}
				>
					{#if mobileMenu}
						<Icon icon="maki:cross" width="20" />
					{:else}
						<Icon icon="mingcute:menu-line" width="20" />
					{/if}
				</button>
			</div>
			<!-- DeskTop menu -->
			<div class="hidden md:flex">
				{#if !$authStore}
					<div class="flex items-center justify-center gap-x-2">
						<a href="/login">
							<button class="custom-btn btn1 rounded-lg bg-[#eff0ec]">Log in</button>
						</a>
						<a href="/signup">
							<button class="custom-btn btn2 h-full rounded-full bg-black text-white">
								Sign up free
							</button>
						</a>
					</div>
				{:else}
					<div class="flex items-center justify-center gap-x-2">
						<a href="/admin">
							<button class="custom-btn btn1 rounded-lg bg-[#eff0ec]">Admin</button>
						</a>
						{#if pageLoading}
							<Loader />
						{:else}
							<button
								on:click={logout}
								class="custom-btn btn2 h-full rounded-full bg-black text-white">Log out</button
							>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>
</nav>
<!-- mobile menu -->

{#if mobileMenu}
	<div
		class="fixed right-0 top-0 z-10 flex h-screen w-full flex-col items-center justify-center bg-linkTree-bg2 md:hidden"
		in:fly={{ x: '100%', duration: 500 }}
		out:fly={{ x: '100%', duration: 500 }}
	>
		{#if !$authStore}
			<div class="flex flex-col items-center justify-center gap-y-4">
				<a href="/login">
					<button on:click={handleMobileNavClick} class="custom-btn btn1 rounded-lg bg-[#eff0ec]"
						>Log in</button
					>
				</a>
				<a href="/signup">
					<button
						on:click={handleMobileNavClick}
						class="custom-btn btn2 h-full rounded-full bg-black text-white"
					>
						Sign up free
					</button>
				</a>
			</div>
		{:else}
			<div class="flex flex-col items-center justify-center gap-y-4">
				<a href="/admin">
					<button on:click={handleMobileNavClick} class="custom-btn btn1 rounded-lg bg-[#eff0ec]"
						>Admin</button
					>
				</a>
				<button on:click={logout} class="custom-btn btn2 h-full rounded-full bg-black text-white"
					>Log out</button
				>
			</div>
		{/if}
	</div>
{/if}
<LoadingPage {pageLoading} />

<!-- styles -->
<style lang="postcss">
	.btn1 {
		@apply animate-slideRight  hover:rounded-2xl hover:bg-[#cdcecc];
	}

	.btn2 {
		@apply animate-slideLeft hover:scale-105  hover:opacity-70 md:animate-none;
	}
</style>
