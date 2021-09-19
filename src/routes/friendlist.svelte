<script>
    import { getUsers } from '../lib/firebase.js';
    import { fade, fly } from 'svelte/transition';
</script>

{#await getUsers()}
  <h2>Loading......</h2>
{:then users}
    <ul in:fly="{{ x: 200, duration: 7000 }}" out:fade>
        {#each users as user }
            <li>{user.personal_data.first_name} {user.personal_data.last_name} ({user.personal_data.username})</li>
        {/each}
    </ul>
{:catch error}
  <p>Something went wrong: {error.message}</p>
{/await}
