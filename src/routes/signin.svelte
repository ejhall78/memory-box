<script>
    console.log("inside signin");
    import { goto } from '$app/navigation';
    import {auth} from '../lib/firebase'
  
    import {  signInWithEmailAndPassword } from "firebase/auth";

    const values = {};

    const submitHandler = (values) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                console.log('successful sign in!')
                const user = userCredential.user;
                // console.log(user)
                goto('/user');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    console.log('submitted')
    }

    // to check fields capture details, use on:keyup with this function
    // const changeLogger = () => {
    //     console.log(values)
    // }

</script>

<div class="signIn">

    {#if auth.currentUser}
	<p>Hello!</p>
{:else}
	 <h3>Open your Memory Box...</h3>
    <form on:submit|preventDefault={submitHandler(values)}>
    <div>
        <label for="email">Email</label>
        <input 
            id="email"
            type="email"
            placeholder="name@email.com"
            bind:value={values.email}
        />
    </div>
    <div>
        <label for="password">Password</label>
        <input 
            id="password"
            type="password"
            placeholder="**************"
            bind:value={values.password}
        />
    </div>
    <div>
        <button type='submit'>Sign In</button>
    </div>
</form>
    <p>No account? <a href="/signup">Click here</a> to sign up!</p>
{/if}

   
</div>

<style>
    .signIn {
        border: 10px solid purple;
    }
</style>
