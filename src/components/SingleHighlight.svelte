<script>
    console.log("inside singlehighlight.svelte");
    import { getAnswers } from "../lib/firebase.js";
    import { initializeApp } from "@firebase/app";
    import { getFirestore } from "@firebase/firestore/lite";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    const apiKey = import.meta.env.VITE_KEY;
    const authDomain = import.meta.env.VITE_AUTHDOMAIN;
    const projectId = import.meta.env.VITE_PROJECTID;
    const storageBucket = import.meta.env.VITE_STORAGEBUCKET;
    const messagingSenderId = import.meta.env.VITE_MESSAGINGSENDERID;
    const appId = import.meta.env.VITE_APPID;
    const measurementId = import.meta.env.VITE_MEASUREMENTID;

    const firebaseConfig = {
        apiKey,
        authDomain,
        projectId,
        storageBucket,
        messagingSenderId,
        appId,
        measurementId,
    };

    export const app = initializeApp(firebaseConfig);
    export const db = getFirestore(app);
    const auth = getAuth();

    $: showHighlight = false;

    const highlightToggle = (currValue) => {
        showHighlight = !currValue;
    };

    const highlightGetter = (uid) => {
        return getAnswers(uid).then((highlights) => {
            const filteredHighlights = highlights.original_set.filter(object => {
                return !object['forget']
            });
            const highlightCount = filteredHighlights.length;
            const randomSelector = Math.floor(
                Math.random() * highlightCount + 1
            );
            return filteredHighlights[randomSelector];
        });
    };
</script>

<div class="singleHighlight">
    <h4>Your Highlight</h4>
    {#if showHighlight}
        {#await highlightGetter(auth.currentUser.uid)}
            <p>Loading...</p>
        {:then data}
            <h4 class="question">{data.question_title}</h4>
            <p>On {data.date}, you answered...</p>
            <p class="answerData">{data.body}</p>
        {:catch error}
            <p>Whoops! Something went wrong: {error.message}</p>
        {/await}
        <button on:click={() => highlightToggle(showHighlight)}>Hide</button>
    {:else}
        <button on:click={() => highlightToggle(showHighlight)}>Show</button>
    {/if}
</div>

<style>
    .singleHighlight {
        text-align: center;
        color: white;
        margin: 20px;
        padding: 5px;
        background-color: #42B7B0;
        border-radius: 10px;
        font-family: 'Leckerli One', cursive;
        font-weight: lighter;
    }
     
    .question {
        font-family: 'La Belle Aurore', cursive;
        font-weight: lighter;
    
    }
    .answerData{
        background-color: white;
        color:#2C9E97;
        width: 80%;
        height: auto;
        text-align: center;
        margin-left: 10%;
        border-radius: 15px;
        padding-top: 5px;
        padding-bottom: 5px;
        font-family: 'La Belle Aurore', cursive;
        font-weight: lighter;
    }

    button:hover{
    background-color: rgb(86, 184, 177);
    }

    button:active {
    box-shadow: 0 8px 16px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 0.2);
    background-color: rgb(86, 184, 177);
    }

    button {
    color: white;
      background-color: #2C9E97;
      border-style: none;
      padding: 5px;
      font-size: 1rem;;
      width: 30%;
      border-radius: 15px;
      font-family: 'Leckerli One', cursive;
    }

</style>
