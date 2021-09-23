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
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: rgb(162, 224, 214);
  width: 100%;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  transition: height 2s;
}



.dropdown:hover .dropdown-content {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: -10px;
  top: 60px;
  width: calc(100% + 20px);
  text-align: center;
  transition: height 2s;
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
    color: white;
    width: 100%;
  }

.menu {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 0;
  transition: height 2s;
}

</style>
