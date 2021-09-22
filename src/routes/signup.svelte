<script>
  console.log("inside signup");
  import { goto } from "$app/navigation";
  import {auth, db} from "../lib/firebase";
  import { doc, setDoc } from "@firebase/firestore/lite";
  

  
  import {
    createUserWithEmailAndPassword,
    updateProfile,
  } from "firebase/auth";

 
  const values = {};

  const submitHandler = (values) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        return updateProfile(userCredential.user, {
          displayName: values.username,
        });
      })
      .then(() => {
        setDoc(doc(db, 'users', auth.currentUser.uid), {
          hello: 'world!'
        });
        setDoc(doc(db, 'answers', auth.currentUser.uid), {
          original_set: []
        })
      })
      .then(() => {
        goto("/user");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    console.log("submitted...");
  };

  // to check fields capture details, use on:keyup with this function
  // const changeLogger = () => {
  //   console.log(values);
  // };
</script>

<div class="signUp">
  <h3>Create your Memory Box...</h3>
  <p>Create an account to get started</p>
  <form on:submit|preventDefault={submitHandler(values)}>
    <div>
      <label for="email">Email</label>
      <input
        id="email"
        type="email"
        placeholder="julia@gulia.com"
        bind:value={values.email}
      />
    </div>
    <div>
      <label for="username">Username</label>
      <input
        id="username"
        type="text"
        placeholder="jgulia784"
        bind:value={values.username}
      />
    </div>
    <div>
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="make it strong!"
        bind:value={values.password}
      />
    </div>
    <div>
      <button type="submit">Sign Up</button>
    </div>
  </form>
  <p>Already have an account? <a href="/signin">Click here</a> to sign in!</p>
</div>

<style>
  .signUp {
    border: 10px solid purple;
  }
</style>
