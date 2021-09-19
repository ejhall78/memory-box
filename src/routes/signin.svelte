<script>
    console.log("inside signin");
    import { initializeApp } from "@firebase/app";
    import { getFirestore } from "@firebase/firestore/lite";
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
    import { EmailAuthCredential, getAuth, signInWithEmailAndPassword } from "firebase/auth";

    const auth = getAuth();
    const values = {};

    const submitHandler = (values) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                console.log('successful sign in!')
                const user = userCredential.user;
                // console.log(user)
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
</div>

<style>
    .signIn {
        border: 10px solid purple;
    }
</style>
