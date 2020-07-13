<script>
	let newTodo = ''

	let todos = [
		'Do it!',
		`Don't let your dreams be dreams`,
		`It's time to stop`
	]

	function submit() {
		todos = todos.concat(newTodo)
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
			<li>{todo}</li>
		{/each}
		</ul>	
		<img width="500" src="http://localhost:8081/api/image" alt="img of the day">
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