<script>
	import DailyQuestion from "../components/DailyQuestion.svelte";
	import Calendar from "../components/Calendar.svelte";
	import Highlights from "../components/Highlights.svelte";
	import { getAuth, onAuthStateChanged } from "firebase/auth";
	import { fade } from 'svelte/transition';

	const auth = getAuth();

	$: isLoading = true;
	$: loggedIn = false;

	onAuthStateChanged(auth, (user) => {
		if (user) {
			loggedIn = true;
			isLoading = false;
		} else {
			user = null;
			loggedIn = false;
			isLoading = false;
		}
	});
</script>

{#if isLoading}
	<h2 class="questionTitle">Loading...</h2>
{:else if loggedIn}
	<DailyQuestion />
	<Calendar />
	<Highlights />
{:else}
	<div class="signInPage">Please <a href="/signin">Log In</a></div>
{/if}

<style>
	a:visited {
        color:rgb(7, 83, 77);
        text-decoration: none;
    }

    a{ 
        color: white;
    }

	.signInPage {
		background-color: #59c5be;
		padding: 20px;
		width: 80%;
		border-radius: 25px;
		text-align: center;
		margin: 20px;
		font-family: "Leckerli One", cursive;
		font-weight: lighter;
		font-size: 1.5rem;
	}

	.questionTitle {
        font-family: "Leckerli One", cursive;
        font-weight: lighter;
        font-size: 1.5rem;
		text-align: center;
    }
</style>
