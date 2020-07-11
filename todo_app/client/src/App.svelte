<script>
	let newTodo = ''

	function onChange(event) {
		console.log(event)
		if (event.target.value.length <= 140) {

			newTodo = event.target.value
		}
	}

	function submit() {
		console.log(todo)
	}

	let todos = [
		'Do it!',
		`Don't let your dreams be dreams`,
		`It's time to stop`
	]
</script>

<main>
	<h1>TODOAPP</h1>
		<h3>new todo</h3>
		<textarea value={newTodo} on:input={onChange} />

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