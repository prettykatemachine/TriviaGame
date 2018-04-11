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
			question: "question number four?",
			answers: [
				{text: "answer", isCorrect: false},
				{text: "answer", isCorrect: false},
				{text: "answer", isCorrect: false},
				{text: "answer", isCorrect: true}
			]
		},
		{
			question: "Question number five?",
			answers: [
				{text: "answer", isCorrect: true},
				{text: "answer", isCorrect: false}
			]
		},
		{
			question: "question number 6?",
			answers: [
				{text: "answer", isCorrect: false},
				{text: "answer", isCorrect: false},
				{text: "answer", isCorrect: true},
				{text: "answer", isCorrect: false}
			]
		},
		{ 
			question: "Question number seven?",
			answers: [
				{text: "answer", isCorrect: false},
				{text: "answer", isCorrect: true},
				{text: "answer", isCorrect: false},
				{text: "answer", isCorrect: false}
			]	
		},
		{
			question: "eight is a great number of questions, right?",
			answers: [
				{text: "answer", isCorrect: true},
				{text: "answer", isCorrect: false},
				{text: "answer", isCorrect: false}
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
		var imgHTML = "<img class='center-block imgCorrect' src='assets/images/smile.png'>";
		gameHTML = correctAnswerText + imgHTML;
		$(".mainArea").html(gameHTML);
		setTimeout(nextDisplay, 3000);  
	}

	function generateLoss() {
		incorrect++;
		var wrongAnswerText = "<p class='wrongText text-center'>INCORRECT</p>";
		var imgHTML = "<img class='center-block imgWrong' src='assets/images/frown.png'>";
		gameHTML = wrongAnswerText + imgHTML;
		$(".mainArea").html(gameHTML);
		setTimeout(nextDisplay, 3000); 
	}
	function generateLossAtTimeOut() {
		unanswered++;
		var timeOutText = "<p class='timeOutText text-center'>TIME'S UP!</p>";
		var imgHTML = "<img class='center-block imgWrong' src='assets/images/frown.png'>";
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