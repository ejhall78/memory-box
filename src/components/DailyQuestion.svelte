<script>
    
  import { initializeApp } from "@firebase/app";
  import { getFirestore, doc, setDoc } from "@firebase/firestore/lite";
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
//   import {
//     getAuth,
//     createUserWithEmailAndPassword,
//     updateProfile,
//   } from "firebase/auth";

//   const auth = getAuth();
    console.log('inside DailyQuestion.svelte');

    function test(){
        console.log("button click successful")
    }

    function forgetMemory(currentValue){
      console.log(values.forget)
      return values.forget = !currentValue
    }

    const values = {
        textBody: "",
        forget: false,
    } 

    const submitHandler = () => {
        setDoc(doc(db, 'bloop', "blah"), {
          hokey: 'cokey'
        });
    console.log("submitted")
    }

   

</script>


<div class="dailyQuestion">
    <h3 class="questionTitle">Today's Question</h3>
    <label for="DailyQuestion-input">
        <p class="questionText">What is your favourite colour?</p>
    </label>
    <textarea 
        type="text"
        id="DailyQuestion-input"
        bind:value={values.textBody}
    />
    <p>
        {#if values.forget}
        <button class="forgottenButton"
        on:click={()=>forgetMemory(values.forget)}
        >
        Forgotten
    </button>
       
    {:else}
    <button class="forgetButton"
    on:click={()=>forgetMemory(values.forget)}
    >
    Forget?
</button>
{/if}
</p>

    <button class="submit" on:click={()=>submitHandler()}>Submit</button>
</div>


<style>
    .dailyQuestion{
      background-color: #59C5BE;
      text-align: center;
        padding: 15px;
    }
    
    .questionTitle{ font-family: 'Leckerli One', cursive;
font-weight: lighter;
font-size: 1.5rem}

    #DailyQuestion-input{
        border: solid;
        border-color: white;
        border-radius: 15px;
        padding: 10px;
        font-family: 'La Belle Aurore', cursive;
    }

    .submit{
      color: white;
      background-color: #2C9E97;
      border-style: none;
      padding: 5px;
      font-size: 1.1rem;;
      width: 20%;
      border-radius: 15px;
      font-family: 'La Belle Aurore', cursive;
      

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

   
    
    .questionText{
        font-family: 'La Belle Aurore', cursive;
        font-size: 1.2rem;
    }
</style>