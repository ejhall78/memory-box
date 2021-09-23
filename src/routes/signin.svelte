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
    <div class="alreadySignedIn"><p>You are already signed in.</p><p class="linkToProfile"> Click <a href="/user">here</a> to be taken to your profile.</p></div>
	
{:else}
	 <section class="signInSection">
        <h3>Open your Memory Box...</h3>
        <form on:submit|preventDefault={submitHandler(values)}>
        <div class="inputName">
            <label for="email">Email</label>
            <input 
                id="email"
                type="email"
                placeholder="name@email.com"
                bind:value={values.email}
            />
        </div>
        <div class="inputName"> 
            <label for="password">Password</label>
            <input 
                id="password"
                type="password"
                placeholder="*******"
                bind:value={values.password}
            />
        </div>
        <div>
            <button type='submit'>Sign in</button>
        </div>
    </form>
        <p class="signUp">No account? <a href="/signup">Click here</a> to sign up!</p>

     </section>
{/if}

   
</div>

<style>
    .signInSection{
    background-color: #59c5be;
	padding: 20px;
	width: 80%;
	border-radius: 25px;
	text-align: center;
	margin: 20px;
	font-family: 'Leckerli One', cursive;
    font-weight: lighter;
    font-size: 1.5rem;
    }

    h3{ 
    font-weight: lighter;}
    
    input {
    font-family: 'La Belle Aurore', cursive;
    color: #2C9E97;
    border-radius: 25px;
    padding: 5px 0px 5px 20px;
    border-style: none;
    margin: 5px;
   margin-left: 20px;
   font-size: 1rem;
   width: 50%;
  
  }
  .inputName{
    font-family: "La Belle Aurore", cursive;
    font-weight: bold;
    font-size: 1.2rem;
  }
  button {
    color: white;
      background-color: #2C9E97;
      border-style: none;
      padding: 5px;
      font-size: 1.1rem;;
      width: 50%;
      border-radius: 15px;
     margin-top: 30px;
      font-family: 'La Belle Aurore', cursive;
      font-weight: bold;
      margin-bottom: 20px;
      
  }

button:hover{
    background-color: rgb(86, 184, 177);
}

button:active {
    box-shadow: 0 8px 16px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 0.2);
    background-color: rgb(86, 184, 177);
}

    .alreadySignedIn {
    background-color: #2c9e97;
	padding: 20px;
	width: 80%;
	border-radius: 25px;
	text-align: center;
	margin: 20px;
	font-family: 'Leckerli One', cursive;
    font-weight: lighter;
    font-size: 1.5rem;
    }
    .linkToProfile {
        font-family: "La Belle Aurore", cursive;
    font-size: 1.2rem;
    }

    .signUp {
        font-family: 'La Belle Aurore', cursive;
        font-size: 1rem;
    }

</style>
