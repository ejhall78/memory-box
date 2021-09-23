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
            <h4>{data.question_title}</h4>
            <p>On {data.date}, you answered...</p>
            <p>{data.body}</p>
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
        border: 5px solid red;
        color: darkslategray;
    }
</style>
