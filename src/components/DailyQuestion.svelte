<script>
    console.log('inside DailyQuestion.svelte');
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
    <button>remember/forget</button>
    <button>Send</button>
</div>


<style>
    .dailyQuestion{
        border: 10px solid pink;
    }
</style>