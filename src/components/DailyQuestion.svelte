<script lang="ts">
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
    import TodaysAnswer from "./TodaysAnswer.svelte";
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

    type questionObj = {
        category: Record<string, any>;
        question: string;
        question_id: number;
    };

    $: isLoading = true;
    $: isAnswered = false;

    onMount(() => {
        getAnswers(auth.currentUser.uid).then((answerList): void => {
            // console.log('answer_id......', answerList.original_set.length + 1)
            values.answer_id = answerList.original_set.length + 1;
        });
        getTodaysQuestion(dayOfTheMonth).then((questionData): void => {
            // console.log(questionData);
            values.question_title = questionData.question;
        });
    });

    const date: string = new Date(Date.now()).toLocaleDateString("en-GB");
    const dayOfTheMonth = Number(date.slice(0, 2));

    function forgetMemory(currentValue: boolean): boolean {
        console.log(values.forget);
        return (values.forget = !currentValue);
    }

    type Values = {
        answer_id?: number;
        body: string;
        date: string;
        forget: boolean;
        length?: number;
        question_id: number;
        question_set: number;
        question_title?: string;
    };

    const values: Values = {
        body: "",
        forget: false,
        date,
        question_set: 1,
        question_id: dayOfTheMonth,
    };

    const submitHandler = async (newAnswer: Values): Promise<void> => {
        const wordCount: number = values.body.split(" ").length;
        values.length = wordCount;
        await updateDoc(doc(db, "answers", auth.currentUser.uid), {
            original_set: arrayUnion(newAnswer),
        });
        console.log("submitted");
        isAnswered = true;
    };

    const dailyQuestionGetter = () => {
        return getQuestions().then((questions): questionObj => {
            const todaysQuestion: questionObj = questions.original_set.filter(
                (question) => {
                    return question.question_id === dayOfTheMonth;
                }
            )[0];
            return todaysQuestion;
        });
    };

    const hasAnsweredTodays = () => {
        getAnswers(auth.currentUser.uid).then((answerList) => {
            // console.log(answerList.original_set);
            if (answerList.original_set.some((answer) => {
                    return answer.date === date && answer.question_id === dayOfTheMonth
                })) {
                isAnswered = true;
            }
            else {
                isAnswered = false;
            }
        });
    };

    hasAnsweredTodays();

</script>

<div class="dailyQuestion">
    {#if !isAnswered}
    <h3 class="questionTitle">Today's Question</h3>
        <label for="DailyQuestion-input">
            {#await dailyQuestionGetter()}
                <p class="questionText">Loading....</p>
            {:then data}
                <p class="questionText">{data["question"]}</p>
            {/await}
        </label>
        <textarea
            type="text"
            id="DailyQuestion-input"
            bind:value={values.body}
        />
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

        <button class="submit" on:click={() => submitHandler(values)}
            >Submit</button
        >
    {:else}
        <TodaysAnswer />
    {/if}
</div>

<style>
    .dailyQuestion {
        background-color: #59c5be;
        text-align: center;
        padding: 15px;
        font-size: 1.5rem;
    }

    .questionTitle {
        font-family: "Leckerli One", cursive;
        font-weight: lighter;
        font-size: 1.5rem;
    }

    #DailyQuestion-input {
        border: solid;
        border-color: white;
        border-radius: 15px;
        padding: 10px;
        font-family: "La Belle Aurore", cursive;
        color: #2c9e97;
        width: 80%;
        height: 40%;
        font-size: 1rem;
        font-weight: bold;
    }

    .submit {
        color: white;
        background-color: #2c9e97;
        border-style: none;
        padding: 10px 5px;
        font-size: 1.1rem;
        width: 30%;
        border-radius: 15px;
        font-family: "Leckerli One", cursive;
        margin-bottom: 10px;
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

    button:hover {
        background-color: rgb(86, 184, 177);
    }

    button:active {
        box-shadow: 0 8px 16px 0 rgba(255, 255, 255, 0.2),
            0 6px 20px 0 rgba(255, 255, 255, 0.2);
        background-color: rgb(86, 184, 177);
    }
</style>
