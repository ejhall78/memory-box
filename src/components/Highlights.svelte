<script>
    console.log('inside Highlights.svelte');
    import SingleHighlight from "./SingleHighlight.svelte";
</script>

<div class="highlights">
    <p class="highlightsTitle"> Here are some of your highlights...</p>
    <SingleHighlight />
    <SingleHighlight />
    <SingleHighlight />
    
</div>

<style>
    .highlightsTitle{
    font-family: 'Leckerli One', cursive;
    font-size: 1rem;
    font-weight: lighter;
    text-align: center;
    padding-top: 10px;
    }
    .highlights {
    background-color: #2C9E97;
    border-radius: 10px;;
    padding-bottom: 10px;;
    }
</style>