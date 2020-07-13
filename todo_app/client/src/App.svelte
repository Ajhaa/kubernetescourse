<script>
	import { onMount } from 'svelte'

	export let apiUrl

	let newTodo = ''
	let todos = []

	onMount(async () => {
		const res = await fetch(apiUrl + '/todos')
		todos = await res.json()
	})

	async function submit() {
		const res = await fetch(apiUrl + '/todos', 
			{ 
				method: 'POST',
				body: JSON.stringify({ todo: newTodo }),
				headers: new Headers({ 'Content-Type': 'application/json' })
		})

		todos = await res.json()
		newTodo = ''
	}
</script>

<main>
	<h1>TODOAPP</h1>
		<h3>new todo</h3>
		<div>
			<textarea style="width: 320px; margin: 0px;" rows="5" maxlength="140" bind:value={newTodo} />
			<div style="font-size: 13px; font-weigth: 100;">{newTodo.length}/140</div>
		</div>

		<button on:click={submit}>submit</button>
		<ul>
		{#each todos as todo}
			<li>{todo.content}</li>
		{/each}
		</ul>	
		<img width="500" src={apiUrl + '/image'} alt="img of the day">
</main>

<style>
	main {
		align-items: center;
		flex-direction: column;
		padding: 1em;
		margin: 0 auto;
		display: flex;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>