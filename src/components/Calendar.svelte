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
						>
						
						{(i - firstDayIndex) + 1}
					</li>
					{/if}
					{/each}
		{/await}
	</ul>


</section>
	
				
<style>

	ul {list-style-type: none;}

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
		margin: 0;
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
	}

	/* Days (1-31) */
	.days {
		padding: 10px 0;
		background: #eee;
		margin: 0;
	}

	.days li {
		list-style-type: none;
		display: inline-block;
		border: 1px solid black;
		padding: 9px;
		width: 11.6%;
		text-align: center;
		margin-bottom: 1px;
		font-size: 1.2rem;
		color: #777;
		cursor: pointer;
		border-radius: 15px;
	}

	/* Highlight the "current" day */
	.active {
		padding: 5px;
		background: #F2EB16;
		color: white;
	}
	
	.days li.has-answers {
		color: #F2480A;
	}

</style>