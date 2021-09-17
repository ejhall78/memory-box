<script>
    console.log('inside DailyQuestion.svelte');

    function test(){
        console.log("button click successful")
    }
</script>


<div class="dailyQuestion">
    <h3>Today's Question</h3>
    <label for="DailyQuestion-input">
        <p>What is your favourite colour?</p>
    </label>
    <input 
        type="text"
        id="DailyQuestion-input"
    />
    <button on:click={test}>remember/forget</button>
    <button on:click={test}>Send</button>
</div>


<style>
    .dailyQuestion{
        border: 10px solid pink;
    }
</style>