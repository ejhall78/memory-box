<script>
    import Menu from '../components/Menu.svelte';
</script>

<div class="header">
  <h1>Memory Box</h1>
  <div class="dropdown">
    <span>Menu</span>
    <div class="dropdown-content">
      <p class="menu"><Menu /></p>
    </div>
  </div>
</div>
<div class="body">
  <slot />
</div>



<style>

  .dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: flex;
  justify-content: center;
  align-items: center;
  display: block;
}



  .header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 10px solid #2C9E97;
    background-color:#2C9E97; 
    color: white;
    width: 100%;
    position: relative;
    margin-left: -10px;
    margin-top: -10px;
    font-family: 'Amatic SC', cursive;
    font-size: 1.5rem;
    height: 50px;

  }
  .body {
    border: 5px solid grey;
    color: white;
    width: 100%;
   
  }

  .menu {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width:60%;
}
</style>
