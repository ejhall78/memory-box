<script>


import {auth, getAnswersByUser, deleteMemory, toggleMemoryForget } from '../lib/firebase'

import {goto} from '$app/navigation'

import {onMount} from 'svelte'

$: answers = [];

onMount(async () => {
    if (auth.currentUser) {
     answers = await getAnswersByUser(auth.currentUser.uid) 
    } 
})
const submitHandler = (answer, uid) => {
        deleteMemory(answer, uid).then(() => {
                console.log('memory deleted')
                return getAnswersByUser(uid)
            }).then((newAnswers) => { 
                console.log(newAnswers)
                answers = newAnswers})
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    console.log('refreshed') }

const forgetHandler = (answers, answer, uid, i) => {
        toggleMemoryForget(answers, answer, uid, i).then(() => {
                console.log('memory forgotten')
                return getAnswersByUser(uid)
            }).then((newAnswers) => { 
                console.log(newAnswers)
                answers = newAnswers})
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    console.log('refreshed') }
</script>


<div class="memorySettings">
    
{#if auth.currentUser}
	<h1>Your Memories</h1>
 <ul>
	{#each answers as answer, i}
		<li class="memoryObject">
			{answer.question_title}
            {answer.body}
            {answer.date}
            {#if answer.forget} 
                <button class="forgottenButton"
    on:click={()=> forgetHandler(answers,answer,auth.currentUser.uid, i)}
    >
    Forgotten
</button>
            {:else}
            <button class="forgetButton"
    on:click={()=> forgetHandler(answers,answer,auth.currentUser.uid, i)}
    >
    Forget?
</button>
{/if}
            <button on:click={() => submitHandler(answer, auth.currentUser.uid)}>Delete Memory (forever!)</button>
		</li>
	{/each}
</ul>

{:else}
	Please <a href='/signin'>Log In</a>
{/if}
</div>

<style>
    .memoryObject {
        border: 5px solid seagreen;
        padding: 2px;
        margin: 2px;
        color:brown
    }
    .forgetButton{
        border-radius: 25px;
        border-style: none;
        color:rgb(255, 255, 255);
        background-color: rgb(158, 160, 159);
        font-family: 'Leckerli One', cursive;
       display: flex;
    }
    .forgottenButton{
        border-radius: 25px;
        border-style: none;
        color:rgb(255, 255, 255);
        background-color: rgb(50, 173, 112);
        font-family: 'Leckerli One', cursive;
       display: flex;
    }
</style>