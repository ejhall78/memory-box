<script>


import {auth, getAnswersByUser, deleteMemory, toggleMemoryForget } from '../lib/firebase'


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

const forgetHandler = (answerArray, answer, uid, i) => {
        toggleMemoryForget(answerArray, answer, uid, i).then(() => {
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
			<p class="date">{answer.date}</p>
            <p class="question">{answer.question_title}</p>
            <p class="answer">{answer.body}</p>
            
            <div class="buttonHolder">
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
            <button class="deleteButton" on:click={() => submitHandler(answer, auth.currentUser.uid)}>Delete</button>
		</div>
    </li>
	{/each}
</ul>

{:else}
	Please <a class="signinlink"href='/signin'>Log In</a>
{/if}
</div>

<style>
  
  a:visited {
        color:rgb(7, 83, 77) ;
        text-decoration: none ;
  }
    a{ 
        color: white;
    }
.question {
    font-size: 1.2rem;
    padding: 0px 5px;
}
    .date {
        text-align: right;
        padding-right: 5px;
        font-family: 'Leckerli One', cursive;
        font-size: 0.85rem;
    }
    .answer {
        background-color: white;
        color:#2C9E97;
        width: 80%;
        height: auto;
        text-align: center;
        margin-left: 10%;
        border-radius: 15px;
        padding-top: 5px;
        padding-bottom: 5px;

    }
    .memoryObject {
       text-align: center;
        color: white;
        margin: 20px;
        padding: 5px 20px 20px 20px;
        background-color: #42B7B0;
        border-radius: 10px;
        font-family: 'La Belle Aurore', cursive;
    }
    .forgetButton{
        border-radius: 25px;
        border-style: none;
        color:rgb(255, 255, 255);
        background-color: rgb(158, 160, 159);
        font-family: 'Leckerli One', cursive;
       padding: 5px;
      font-size: 1.1rem;;
      width: 40%;
      border-radius: 15px;
      margin-top: 15px;
      margin-bottom: 20px;
    }
    .forgottenButton{
        border-radius: 25px;
        border-style: none;
        color:rgb(255, 255, 255);
        background-color: rgb(50, 173, 112);
        font-family: 'Leckerli One', cursive;
        padding: 5px;
      font-size: 1.1rem;;
      width: 40%;
      border-radius: 15px;
      margin-top: 15px;
      margin-bottom: 20px;
       
    }
    .deleteButton {
    color: white;
      background-color: #2C9E97;
      border-style: none;
      padding: 5px;
      font-size: 1.1rem;;
      width: 40%;
      border-radius: 15px;
      margin-top: 15px;
      font-family: 'Leckerli One', cursive;
      font-weight: light;
      margin-bottom: 20px;
      
  }



.deleteButton:active {
    box-shadow: 0 8px 16px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 0.2);
    background-color: rgb(184, 86, 94);
}
.buttonHolder {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}
 h1 {
     text-align: center;
     font-family: 'Leckerli One', cursive;
     font-weight: lighter;
 }   

 
</style>