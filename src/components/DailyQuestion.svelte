<script>
    import { initializeApp } from "@firebase/app";
    import {
        getFirestore,
        doc,
        setDoc,
        arrayUnion,
        updateDoc,
    } from "@firebase/firestore/lite";
    import {
        getQuestions,
        getAnswers,
        getTodaysQuestion,
    } from "../lib/firebase.js";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { onMount } from "svelte";
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

    console.log("inside DailyQuestion.svelte");

    $: isLoading = true;

    /*
    const isAnswered = (usersAnswers.includes(a => a.date === today && a.question_id === todaysQuestion.question_id))
    {#if isAnswered} display the answer {:else} display the question
    */

    onMount(() => {
        getAnswers(auth.currentUser.uid).then((answerList) => {
            // console.log('answer_id......', answerList.original_set.length + 1)
            values.answer_id = answerList.original_set.length + 1;
        });
        getTodaysQuestion(dayOfTheMonth).then((questionData) => {
            console.log(questionData);
            values.question_title = questionData.question;
        });
    });

    const date = new Date(Date.now()).toLocaleDateString("en-GB");
    const dayOfTheMonth = Number(date.slice(0, 2));

    function forgetMemory(currentValue) {
        console.log(values.forget);
        return (values.forget = !currentValue);
    }

    const values = {
        body: "",
        forget: false,
        date,
        question_set: 1,
        question_id: dayOfTheMonth,
    };

    const submitHandler = async (newAnswer) => {
        const wordCount = values.body.split(" ").length;
        values.length = wordCount;
        await updateDoc(doc(db, "answers", auth.currentUser.uid), {
            original_set: arrayUnion(newAnswer),
        });
        console.log("submitted");
    };

    const dailyQuestionGetter = () => {
        return getQuestions().then((questions) => {
            const date = new Date(Date.now()).toLocaleDateString("en-GB");
            const dayOfTheMonth = Number(date.slice(0, 2));
            const todaysQuestion = questions.original_set.filter((question) => {
                return question.question_id === dayOfTheMonth;
            })[0];
            return todaysQuestion;
        });
    };
</script>

<div class="dailyQuestion">
    <h3 class="questionTitle">Today's Question</h3>
    <label for="DailyQuestion-input">
        {#await dailyQuestionGetter()}
            <p class="questionText">Loading....</p>
        {:then data}
            <p class="questionText">{data["question"]}</p>
        {/await}
    </label>
    <textarea type="text" id="DailyQuestion-input" bind:value={values.body} />
    <p>
        {#if values.forget}
            <button
                class="forgottenButton"
                on:click={() => forgetMemory(values.forget)}
            >
                Forgotten
            </button>
        {:else}
            <button
                class="forgetButton"
                on:click={() => forgetMemory(values.forget)}
            >
                Forget?
            </button>
        {/if}
    </p>

    <button class="submit" on:click={() => submitHandler(values)}>Submit</button
    >
</div>

<style>
    .dailyQuestion {
        background-color: #59c5be;
        text-align: center;
        padding: 15px;
    }

    
    .questionTitle{ font-family: 'Leckerli One', cursive;
font-weight: lighter;
font-size: 1.5rem}


 

    #DailyQuestion-input {
        border: solid;
        border-color: white;
        border-radius: 15px;
        padding: 10px;
        font-family: "La Belle Aurore", cursive;
    }

    .submit {
        color: white;
        background-color: #2c9e97;
        border-style: none;
        padding: 5px;
        font-size: 1.1rem;
        width: 20%;
        border-radius: 15px;
        font-family: "La Belle Aurore", cursive;
    }

    .forgetButton {
        border-radius: 25px;
        border-style: none;
        color: rgb(255, 255, 255);
        background-color: rgb(158, 160, 159);
        font-family: "Leckerli One", cursive;
        display: flex;
    }
    .forgottenButton {
        border-radius: 25px;
        border-style: none;
        color: rgb(255, 255, 255);
        background-color: rgb(50, 173, 112);
        font-family: "Leckerli One", cursive;
        display: flex;
    }

    .questionText {
        font-family: "La Belle Aurore", cursive;
        font-size: 1.2rem;
    }
</style>
