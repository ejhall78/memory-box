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
  const details = {};

  const submitHandler = (values) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        return updateProfile(userCredential.user, {
          displayName: values.username,
        });
      })
      .then(() => {
        setDoc(doc(db, 'users', auth.currentUser.uid), {
          first_name: details.first_name,
          last_name: details.last_name, 
          profile_picture: "https://www.pngkit.com/png/full/90-903070_rsg-portfolio-portfolio-for-robert-s-facebook-profile.png",
          date_of_birth: details.date_of_birth,
          about: "write something about yourself"
        });
        setDoc(doc(db, 'answers', auth.currentUser.uid), {
          original_set: []
        })
      })
      .then(() => {
        goto("/signin");
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

  {#if auth.currentUser}
	<div class="alreadySignedIn"><p>You are already signed in.</p><p class="linkToProfile"> Click <a href="/user">here</a> to be taken to your profile.</p></div>
{:else}



  <h3 class="title">Create your Memory Box...</h3>
  <p class="tagline">Create an account to get started</p>

  <form on:submit|preventDefault={submitHandler(values)}>
    <div>
      <label for="first_name">First Name</label>
      <input
        id="first_name"
        type="first_name"
        placeholder="Julia"
        required
        bind:value={details.first_name}
      />
    </div>
    <div>
      <label for="last_name">Last Name</label>
      <input
        id="last_name"
        type="last_name"
        placeholder="Gulia"
        required
        bind:value={details.last_name}
      />
    </div>
    <div>
      <label for="date_of_birth">Birthday</label>
      <input
        id="date_of_birth"
        type="date_of_birth"
        placeholder="01/01/2021"
      
        required
        title="01/01/2021"
        bind:value={details.date_of_birth}
      />
    </div>
    <!-- pattern="[0-9]{2}\/[0-9]{2}\/[0-9]{4}" -->
    <div>
      <label for="email">Email</label>
      <input
        id="email"
        type="email"
        placeholder="julia@gulia.com"
        required
        bind:value={values.email}
      />
    </div>
    <!-- <div>
      <label for="username">Username</label>
      <input
        id="username"
        type="text"
        placeholder="jgulia784"
        bind:value={values.username}
      />
    </div> -->
    <div>
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="make it strong!"
        required
        bind:value={values.password}
      />
    </div>
    <div>
      <button type="submit" >Sign Up</button>
    </div>
  </form>



  <p class="signIn">Already have an account? <a href="/signin">Click here</a> to sign in!</p>
{/if}
</div>

<style>
  .title{
    font-family: 'Leckerli One', cursive;
    font-size: 1.5rem;
    font-weight: lighter;
  }

  .tagline {
    color:rgb(182, 227, 230);
    font-size: 1.2rem;
   
  }

  .signIn {
    color:rgb(200, 228, 230);
  
   
  }

  .signUp {
    background-color: #4FC5BD;
    padding: 20px;
    font-family: 'La Belle Aurore', cursive;
    /* font-weight: bolder; */
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
   font-family: 'Leckerli One', cursive;
   font-weight: lighter;
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


/* form {
  display: flex;
  flex-direction: column;
} */

 label {
   text-align: center;
   font-size: 1.2rem;
   font-family: 'Leckerli One', cursive;
   font-weight: lighter;
 }

div {
  text-align: center;
 
}

  input {
    font-family: 'La Belle Aurore', cursive;
    font-weight: bold;
    color: #2C9E97;
    border-radius: 25px;
    padding: 5px 0px 5px 20px;
    border-style: none;
    margin: 5px;
   margin-left: 20px;
   font-size: 1rem;
   width: 50%;
  
  }

  ::placeholder {
    color:rgb(181, 219, 219);
  }

  a:visited {
        color:rgb(7, 83, 77);
        text-decoration: none;
    }
    
    a{ 
        color: white;
    }
  
</style>
