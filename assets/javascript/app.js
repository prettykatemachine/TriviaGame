//telling the document to run the function when it's ready
$(document).ready(function() {  

//setting up the variables
	var startScreen;
	var gameHTML;
	var correct = 0;
	var incorrect = 0;
	var unanswered = 0;
	var questionCounter = 0;
	var counter = 20;
	var clock;
    var selecterAnswer;
    var questionArray = [
		{ 	
			question: "Who is the former drummer for Nirvana that went on to become the frontman for the Foo Fighters?",
			answers: [
				{text: "Dave Grohl", isCorrect: true},
				{text: "Kurt Cobain", isCorrect: false},
				{text: "Krist Novoselic", isCorrect: false},
				{text: "Phil Collins", isCorrect: false}
			]
		},
		{	
			question: "Who played lead guitar for the band Queen?",
			answers: [
				{text: "Freddie Mercury", isCorrect: false},
				{text: "Brian May", isCorrect: true},
				{text: "Adam Lambert", isCorrect: false},
			]
		},
		{
			question: "What was the first music video played on MTV?",
			answers: [
				{text: "Thriller", isCorrect: false},
				{text: "Video Killed the Radio Star", isCorrect: true},
				{text: "Money for Nothing", isCorrect: false}
			]
		},
		{ 
			question: "Who invented the solid-body electric guitar that made rock 'n roll possible?",
			answers: [
				{text: "Chuck Berry", isCorrect: false},
				{text: "Orville Gibson", isCorrect: false},
				{text: "Leo Fender", isCorrect: false},
				{text: "Les Paul", isCorrect: true}
			]
		},
		{
			question: "Jimi Hendrix got his first big hit in America.",
			answers: [
				{text: "False", isCorrect: true},
				{text: "True", isCorrect: false}
			]
		},
		{
			question: "What was Eddie Van Halen's first instrument?",
			answers: [
				{text: "Guitar", isCorrect: false},
				{text: "Drums", isCorrect: false},
				{text: "Piano", isCorrect: true},
				{text: "Didgeridoo", isCorrect: false}
			]
		},
		{ 
			question: "Who was the first female solo artist to be inducted into the County Music Hall of Fame?",
			answers: [
				{text: "Dolly Parton", isCorrect: false},
				{text: "Patsy Cline", isCorrect: true},
				{text: "June Carter", isCorrect: false},
				{text: "Tammy Wynette", isCorrect: false}
			]	
		},
		{
			question: "What was Prince's favorite meal during the Purple Rain era?",
			answers: [
				{text: "Spaghetti and Orange Juice", isCorrect: true},
				{text: "Pancakes", isCorrect: false},
				{text: "Purple Smoothie", isCorrect: false}
			]
		},
	
    ];
    
    function generateHTML() {
		var timeRemainingText = "<p class='timerText text-center'>Time Remaining: <span id='timer'>20</span></p>";
		var questionText = "<p class='questionText text-center'>" + questionArray[questionCounter].question + "</p>";
		gameHTML = timeRemainingText + questionText;
		$(".mainArea").html(gameHTML);
		for (var i = 0; i < questionArray[questionCounter].answers.length; i++) {
			var answerButton = $("<button>");
			answerButton.addClass("answer btn btn-block text-center");
			answerButton.attr("isCorrect", questionArray[questionCounter].answers[i].isCorrect);
			answerButton.html(questionArray[questionCounter].answers[i].text);
			$(".mainArea").append(answerButton);
		}
	}

	function generateWin() {
		correct++;
		var correctAnswerText = "<p class='correctText text-center'>CORRECT!</p>";
		var imgHTML = "<img class='center-block imgCorrect' src='assets/images/correct.png'>";
		gameHTML = correctAnswerText + imgHTML;
		$(".mainArea").html(gameHTML);
		setTimeout(nextDisplay, 3000);  
	}

	function generateLoss() {
		incorrect++;
		var wrongAnswerText = "<p class='wrongText text-center'>INCORRECT</p>";
		var imgHTML = "<img class='center-block imgWrong' src='assets/images/incorrect.png'>";
		gameHTML = wrongAnswerText + imgHTML;
		$(".mainArea").html(gameHTML);
		setTimeout(nextDisplay, 3000); 
	}
	function generateLossAtTimeOut() {
		unanswered++;
		var timeOutText = "<p class='timeOutText text-center'>TIME'S UP!</p>";
		var imgHTML = "<img class='center-block imgWrong' src='assets/images/timesup.jpg'>";
		gameHTML =  timeOutText + imgHTML;
		$(".mainArea").html(gameHTML);
		setTimeout(nextDisplay, 3000);  
	}

	function timer() {
		clock = setInterval(twentySeconds, 1000);
		function twentySeconds() {
			if (counter === 0) {
				clearInterval(clock);
				generateLossAtTimeOut();
			} else if (counter > 0) {
				counter--;
			}
			$("#timer").html(counter);
		}
	}
//setup nextDisplay - if we take one question out of the array, then load another question and restart the timer.
function nextDisplay() {
	if (questionCounter < questionArray.length - 1) {
		questionCounter++;
		generateHTML();
		counter = 20;
		timer();
	} else {
		finalScreen();
	}
}
//setup final results screen that includes number of correct/incorrect answers, reset button
function finalScreen() {
	var finishedText = "<p class='finishedText text-center'>Here's how you did!</p>";
	var summaryCorrectHTML = "<p class='summaryCorrect text-center'>Correct Answers: " + correct + "</p>";
	var summaryWrongHTML = "<p class='summaryWrong text-center'>Wrong Answers: " + incorrect + "</p>";
	var summaryUnansweredHTML = "<p class='summaryUnanswered text-center'>Unanswered: " + unanswered + "</p>";
	var resetButtonHTML = "<button class='resetButton btn btn-info btn-lg btn-block text-center' type='button'>PLAY AGAIN</button>";
	gameHTML = finishedText + summaryCorrectHTML + summaryWrongHTML + summaryUnansweredHTML + resetButtonHTML;
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correct = 0;
	incorrect = 0;
	unanswered = 0;
	counter = 20;
	generateHTML();
	timer();
}

    function initialScreen() {
		var initialText = "<p class='initialText text-center'>Test your music knowledge!!!</p> <p class='initialText text-center'>There are 8 questions total and you will have 20 seconds to answer each one. Good luck!</p>";
		var startButtonHTML = "<button class='startButton btn btn-info btn-lg btn-block text-center' type='button'>Let's Play!</button>";
		startScreen = initialText + startButtonHTML;
		$(".mainArea").html(startScreen);
	}

	
	$("body").on("click", ".startButton", function(event){ 
		generateHTML();
		timer();
	});

	
	$("body").on("click", ".answer", function(event){
		selectedAnswer = $(this).attr("isCorrect");
		console.log(selectedAnswer);

		if (selectedAnswer === "true") { 
			clearInterval(clock);
		 	generateWin();
		} else { 	
			clearInterval(clock);
			generateLoss();
		}

    }); 
    
    $("body").on("click", ".resetButton", function(event){
		resetGame();
	}); 

    initialScreen();

});  

