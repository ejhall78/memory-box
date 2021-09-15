<script>
    import Menu from '../components/Menu.svelte';
</script>

<div class="header">
    <h1>Memory Box</h1>
  <Menu />  
</div>
<div class="body">
  <slot />
</div>



<style>
  .header {
    border: 10px solid yellow;
  }
  .body {
    border: 10px solid green;
  }
</style>