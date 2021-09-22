<script>
	import DailyQuestion from '../components/DailyQuestion.svelte';
	import Calendar from '../components/Calendar.svelte';
	import Highlights from '../components/Highlights.svelte';
    import {auth} from '../lib/firebase';
	
</script>


{#if auth.currentUser}
	<DailyQuestion />
<Calendar />
<Highlights />

{:else}
	Please <a href='/signin'>Log In</a>
{/if}
