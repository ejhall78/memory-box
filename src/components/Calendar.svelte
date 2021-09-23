<script>

	// *** calendar stuff ***
	const date = new Date();

	// store answers by day
	// if day list empty...
	
	const today = {
		dayNumber: date.getDate(),
		month: date.getMonth(),
		year: date.getFullYear(),
	}
	
	const monthInfo = [ {num: '01', word: 'January'}, {num: "02", word: 'February'}, {num: "03", word: 'March'}, {num: "04", word: "April"}, {num: "05", word: 'May'}, {num: "06", word: 'June'}, {num: "07", word: 'July'}, {num: "08", word: "August"}, {num: "09", word: 'September'}, {num: "10", word: 'October'}, {num: "11", word: 'November'}, {num: "12", word: 'December'}];
	let monthIndex = date.getMonth();
	
	$: month = monthInfo[monthIndex];
	
	let year = date.getFullYear();
	
	$: firstDayIndex = new Date(year, monthIndex, 1).getDay();
	
	$: numberOfDays = new Date(year, monthIndex+1, 0).getDate();
	
	$: calendarCellsQty = firstDayIndex <= 4 ? 35 : 42;	

	
	const goToNextMonth = () => {
		if (monthIndex >= 11) {
			year += 1;
			return monthIndex = 0;
		}
		return monthIndex += 1;
	}
	
	const goToPrevMonth = () => {
		if (monthIndex <= 0) {
			year -= 1;
			return monthIndex = 11;
		}
		return monthIndex -= 1;
	}

	
// 	$: console.log(`${month}, ${today.dayNumber}, ${year}, FIRST DAY index is ${firstDayIndex}, MONTH index is ${monthIndex}, No. of days: ${numberOfDays}`)
	

	// *** db stuff ***
  

	import { createAnsDaysRefObj, app, db, auth } from "../lib/firebase"


	let showList = false
	let showEmptyMessage = false
	let ansList = []
	
	const displayAnsByDay = (refObj, day) => {
		const ansByDay = refObj[day] || refObj['0' + day]

		if (!ansByDay) {
			// display message saying no answers for this day
			showEmptyMessage = true
			showList = false
		}

		else {
			// show list
			// assign ansList to current day
			// loop through ansList ans show each answer for a given day (in html below)
			showList = true
			showEmptyMessage = false
			ansList = ansByDay
			console.log(ansList);
		}
	}

</script>

<section class="calendar">
	<div class="month">
		<ul>
			<li class="prev" on:click={goToPrevMonth}>&#10094;</li>
			<li class="next" on:click={goToNextMonth}>&#10095;</li>
			<li>{month.word}
				<span style="font-size:18px">{year}</span>
			</li>
		</ul>
	</div>

	<ul class="weekdays">
		<li>Su</li>
		<li>Mo</li>
		<li>Tu</li>
		<li>We</li>
		<li>Th</li>
		<li>Fr</li>
		<li>Sa</li>
	</ul>

	<ul class="days">
		{#await createAnsDaysRefObj(auth.currentUser.uid)}
			<p>Loading...</p>
		{:then usersAnsByDay}
			{#each Array(calendarCellsQty) as _, i}
			{#if i < firstDayIndex || i >= numberOfDays+firstDayIndex  }
				<li>&nbsp;</li>
			{:else}
			
				
				<li class:active={i === today.dayNumber+(firstDayIndex-1) &&
						monthIndex === today.month && year === today.year}
						id={`${(i-firstDayIndex)+1}/${month.num}/${year}`}
						
						class:has-answers={usersAnsByDay[`${(i-firstDayIndex)+1}/${month.num}/${year}`] || usersAnsByDay[`0${(i-firstDayIndex)+1}/${month.num}/${year}`]}
						on:click={() => displayAnsByDay(usersAnsByDay, `${(i-firstDayIndex)+1}/${month.num}/${year}`)}
						>
						
						{(i - firstDayIndex) + 1}
					</li>
					{/if}
					{/each}
		{/await}
	</ul>


	{#if showEmptyMessage}
		<button on:click={() => showEmptyMessage = false}>Close</button>
		<p class="no-highlight">No highlights for this day</p>
	{/if}

	{#if showList}
		{#each ansList as answer}
			{#if answer.forget}
				<button class="closeButton" on:click={() => showList = false}>Close</button>
				<p class="no-highlight">You have chosen to forget this memory</p>
			{:else}
				<button on:click={() => showList = false}>Close</button>
				<div class="highlight">
					<p class="highlight__date">On {answer.date}, you answered:</p>
					<h4 class="highlight__title">{answer.question_title}</h4>

					<p class="highlight__info">{answer.body}</p>
				</div>
			{/if}
		{/each}
	{/if}
	



</section>
	
				

<style>

	ul {list-style-type: none;}

  button {
		color: white;
      background-color:#4FC5BD;
      border-style: none;
      padding: 2px;
      font-size: 1.1rem;;
      width: 30%;
      border-radius: 15px;
      margin-top: 15px;
      font-family: 'Leckerli One', cursive;
      font-weight: light;
      margin-bottom: 20px;
			margin: auto 35%;

	}

	/* Month header */
	.month {
		padding: 10px 0px;
		width: auto;
		background: #2C9E97;
		text-align: center;
		font-family: "Leckerli One", cursive;
		border-radius: 15px;
	}
  
	.calendar{
		background: #2C9E97;
		border-radius: 15px;
	}
	/* Month list */
	.month ul {
		margin: 0 0 0 0;
		padding: 0;
	
	}

	.month ul li {
		color: white;
		font-size: 20px;
		letter-spacing: 3px;
	}

	/* Previous button inside month header */
	.month .prev {
		float: left;
		padding-top: 0px;
		cursor: pointer;
		color: #1E8680;
	}

	/* Next button */
	.month .next {
		float: right;
		padding-top: 0px;
		cursor: pointer;
		color: #1E8680;
	}

	/* Weekdays (Mon-Sun) */
	.weekdays {
		margin: 0;
		padding: 0px 0;
		background: #2C9E97;
		font-family: 'Leckerli One', cursive;
		font-size: 0.5rem;
	}

	.weekdays li {
		display: inline-block;
		width: 13%;
		color: white;
		text-align: center;
		font-size: 0.9rem;
		padding-left: 1.2px;
	}

	/* Days (1-31) */
	.days {
		padding: 10px 0px 12px 3px;
		margin: 0;
	}

	.days li {
		list-style-type: none;
		display: inline-block;
		padding: 9px;
		width: 8%;
		text-align: center;
		margin: 2px;
		font-size: 1rem;
		color: #1D6468;
		cursor: pointer;
		border-radius: 10px;
		background-color: white;
		font-family: 'Leckerli One', cursive;
    font-weight: lighter;
		box-shadow: inset 5px 5px rgb(231, 239, 240);
	}
	.days li.active {
    background-color: rgb(0, 175, 152);
		color: white
    }

	/* Highlight the "current" day */

	
	.days li.has-answers {
		color: #1D6468;
		background-color: rgb(180, 234, 238);
		box-shadow: 5px 10px rgb(57, 131, 141);
	}

	.highlight {
       text-align: center;
        color: white;
        margin: 20px;
        padding: 5px 20px 20px 20px;
        background-color: #42B7B0;
        border-radius: 10px;
        font-family: 'La Belle Aurore', cursive;
  
    /* font-weight: bolder; */
    }

		.highlight__title{
			font-family: 'La Belle Aurore', cursive;
    font-size: 1rem;
    font-weight: lighter;
  }

	.highlight__date{
		font-family: 'Leckerli One', cursive;
    font-size: 0.8rem;
    font-weight: lighter;
	}

	.highlight__info {
		background-color: white;
        color:#2C9E97;
        width: 80%;
        height: auto;
        text-align: center;
        margin-left: 10%;
        border-radius: 15px;
        padding-top: 5px;
        padding-bottom: 5px;
  
  }

	.no-highlight {
		font-family: 'Leckerli One', cursive;
    font-size: 1.5rem;
    font-weight: lighter;
		background-color: #4FC5BD
	}

</style>