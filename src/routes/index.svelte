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
	<div class="signInPage">Please <a href='/signin'>Log In</a></div>
{/if}

<style>
.signInPage {
	background-color: #59c5be;
	padding: 20px;
	width: 80%;
	border-radius: 25px;
	text-align: center;
	margin: 20px;
	font-family: 'Leckerli One', cursive;
  font-weight: lighter;
  font-size: 1.5rem;
}

</style>