<script>
import { goto } from "$app/navigation";
import { getUserInfo, auth, updateUserInfo } from "$lib/firebase";
import { onMount } from "svelte";

  const userInfo = {}

  onMount(() => {
    getUserInfo(auth.currentUser.uid).then(currentInfo => {
      userInfo.about = currentInfo.about
      userInfo.date_of_birth = currentInfo.date_of_birth
      userInfo.first_name = currentInfo.first_name
      userInfo.last_name = currentInfo.last_name
      userInfo.profile_picture = currentInfo.profile_picture
    })
  })

  const submitHandler = (userInfo) => {
    updateUserInfo(userInfo, auth.currentUser.uid).then(() => {
      goto("/user")
    })
  }


</script>
<div class="edit-profile"> 
  

  <form on:submit|preventDefault={() => submitHandler(userInfo)}>
    <img src={userInfo.profile_picture} class="profile_picture" alt="profile">
    <div>
      <label for="profile_picture">Picture URL</label>
      <input
      id="profile_picture"
      type="text"
      required
      bind:value={userInfo.profile_picture}
      />
    </div>
    <div>
      <label for="first_name">First Name</label>
      <input
      id="first_name"
      type="text"
      required
      bind:value={userInfo.first_name}
      />
    </div>
    <div>
      <label for="last_name">Last Name</label>
      <input
      id="last_name"
      type="text"
      required
      bind:value={userInfo.last_name}
      />
    </div>
    <div>
      <label for="date_of_birth"> Birthday </label>
      <input
      id="date_of_birth"
      type="text"
      required
      title="01/01/2021"
      bind:value={userInfo.date_of_birth}
      />
    </div>
    <div>
      <label for="about">About me</label>
      <input
      id="about"
      type="text"
      required
      title="01/01/2021"
      bind:value={userInfo.about}
      />
    </div>
    <div class="buttonHolder">
      <button type="submit">Update</button>
    <button on:click|preventDefault={() => goto('/user')}>Cancel</button>
    </div>
    
  </form>
</div>
  
<style>
  .edit-profile {
    background-color: #4FC5BD;
    padding: 20px;
    font-family: 'La Belle Aurore', cursive;
    /* font-weight: bolder; */
    }

    label {
   text-align: center;
   font-size: 1.2rem;
    }

 button {
    color: white;
      background-color: #2C9E97;
      border-style: none;
      padding: 5px;
      font-size: 1.1rem;;
      width: 40%;
      border-radius: 15px;
   margin-top: 30px;
   font-family: 'Leckerli One', cursive;
   font-weight: lighter;
  }

div {
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 15px 0px
 
 
}

.buttonHolder {
  display: flex;
    flex-direction: row;
    justify-content: space-around;
}

  input {
    font-family: 'La Belle Aurore', cursive;
    font-weight: bold;
    color: #2C9E97;
    border-radius: 25px;
    padding: 5px 0px 5px 20px;
    border-style: none;
   margin-left: 20px;
   font-size: 1rem;
   width: 50%;
  
  }

  label {
    font-family: 'Leckerli One', cursive;
   font-weight: lighter;
   font-size: 1rem;
  }

  .profile_picture {
        border-radius: 100%;
        min-width: 30%;
        position: relative;
        padding-left: 25%;
        padding-right: 25%;
            
    }

</style>