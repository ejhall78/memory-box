<script>
    import { goto } from '$app/navigation';
    import { initializeApp } from '@firebase/app';
    import { getFirestore } from '@firebase/firestore/lite';
    import { getAuth, onAuthStateChanged } from 'firebase/auth';
    import { getUserInfo } from '../lib/firebase.js';
    const apiKey = import.meta.env.VITE_KEY;
    const authDomain = import.meta.env.VITE_AUTHDOMAIN;
    const projectId = import.meta.env.VITE_PROJECTID;
    const storageBucket = import.meta.env.VITE_STORAGEBUCKET;
    const messagingSenderId = import.meta.env.VITE_MESSAGINGSENDERID;
    const appId = import.meta.env.VITE_APPID;
    const measurementId = import.meta.env.VITE_MEASUREMENTID;

    // Follow this pattern to import other Firebase services
    // import { } from 'firebase/<service>';

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
    // console.log(auth);

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
