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
    <div>
        {#if loggedIn}
            <p>Hello {auth.currentUser.email}!</p>
            <p>Your username is: {auth.currentUser.displayName}</p>
        {:else}
            <p>Who are you...</p>
        {/if}
    </div>
    <div>
        {#if loggedIn}
            <p>Your very own user document contains the following information:</p>
            {#await getUserInfo(auth.currentUser.uid)}
                <p>Loading......</p>
            {:then userInfo}
                {#if userInfo}
                    <p>{Object.keys(userInfo)} {Object.values(userInfo)}</p>
                {:else}
                    <p>...nothing!</p>
                {/if}
            {:catch error}
                <p>Whoops! Something went wrong: {error.message}</p>
            {/await}
        {/if}
    </div>
    <div>
        <button on:click={logout}>Sign Out</button>
    </div>
</div>

<style>
    .profile {
        border: 5px solid red;
    }
</style>
