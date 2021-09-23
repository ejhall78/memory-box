<script>
    import { goto } from '$app/navigation';
    import { getAuth, onAuthStateChanged } from 'firebase/auth';
    import { getUserInfo, db, auth } from '../lib/firebase.js';
   
    export const logout = () => {
        auth.signOut();
        goto('/signin');
    };

    $: loggedIn = false;

    onAuthStateChanged(auth, (user) => {
        if (user) {
            loggedIn = true;
            // const token = user.getIdTokenResult();
            // const uid = user.uid;
            // console.log(user.email, 'is logged in')
        } else {
            user = null;
            loggedIn = false;
            // console.log("there is NOT a user");
        }
    });
</script>

<div class="profile">
    <!-- <div>
        {#if loggedIn}
            <p>Hello {auth.currentUser.email}!</p>
            <p>Your username is: {auth.currentUser.displayName}</p>
        {:else}
            <p>Who are you...</p>
        {/if}
    </div> -->
    <div class="userInfo">
        {#if loggedIn}
            {#await getUserInfo(auth.currentUser.uid)}
                <p>Loading......</p>
            {:then userInfo}
                {#if userInfo}
                <section class="top"> <p class="heading">Hello {userInfo.first_name}</p>
                    <img src={userInfo.profile_picture} class="profile_picture" alt="profile_picture"/>
                    <p class="about">{userInfo.about}</p></section>
                   
                    <ul>
                       
                        <li><span class="detailName">Name:</span> <span class="details"> {userInfo.first_name} {userInfo.last_name}</span></li>
                       
                        <li><span class="detailName">Birthday: </span><span class="details">{userInfo.date_of_birth}</span></li>    
                        <li><span class="detailName">Email:</span> <span class="details">{auth.currentUser.email}</span></li>
                    </ul>
                    
                    <!-- {Object.keys(userInfo)} {Object.values(userInfo)} -->
                   <p><button class="signOutButton" on:click={logout}>Sign Out</button>
                    <button class="editProfile" on:click={()=> goto("/editprofile")}>Edit Profile</button>
                </p> 
              
                {:else}
                    <p>...nothing!</p>
                {/if}
            {:catch error}
                <p>Whoops! Something went wrong: {error.message}</p>
            {/await}
        {/if}
    </div>
   
</div>

<style>
    .profile {
    background-color: #4FC5BD;
    font-family: 'La Belle Aurore', cursive;
    text-align: center;
    margin-top: 10px;

    }

    .top {
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-top: 10px;
        background-color: #2C9E97;
        border-radius: 100%;  
        width: 90%;
        display: flex;
    justify-content: center;
    margin: auto;
  
    }


    .about {
        position: relative;
        background-color: rgb(78, 179, 172);
        border-radius: 25px;
        text-align: center;
        padding: 10px;
        box-shadow: 0 8px 16px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 0.2);
    }

   .userInfo {
       
       font-size: 1.2rem;
       text-align: center;
       
   }
    .profile_picture {
        border-radius: 100%;
        width: 50%;
        position: relative;
        padding-left: 25%;
        padding-right: 25%;
            
    }
    .heading {
        font-family: 'Leckerli One', cursive;
        font-size: 1.5rem;
        padding: 20px 20px 20px 20px;
        width: 70%;
        text-align: center;
        margin: 0 auto;
    }

    .signOutButton, .editProfile {
        color: white;
      background-color: #2C9E97;
      border-style: none;
      padding: 5px;
      font-size: 1.1rem;;
      width: 40%;
      border-radius: 15px;
      font-family: 'Leckerli One', cursive;
   font-weight: lighter;
      margin-bottom: 30px;
    }
    p {
        margin: 7px;
    }

    ul {
        padding-left: 0px;
       
    }
   
    li {
        padding: 5px;
        display: flex;
    flex-direction: row;
    justify-content: space-between;
    }

    .details{
        color: #2C9E97;
        background-color: white;
        width: 60%;
       
        padding: 0px 10px 0px 10px;
        border-radius: 25px;
   
    }

    .detailName {
        font-family: 'Leckerli One', cursive;
   font-weight: lighter;
   margin-left: 20px
    }
</style>
