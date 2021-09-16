<script>
    console.log('inside Highlights.svelte');
    import SingleHighlight from "./SingleHighlight.svelte";
</script>

<div class="highlights">
    <SingleHighlight />
    <SingleHighlight />
    <SingleHighlight />
</div>

<style>
    .highlights {
        border: 10px solid purple;
    }
</style>