var inquirer = require("inquirer");
var Letter = require("./letter");

var wordArr = ["aba", "cdec", "fghif", "jk lmnj", "opq rso", "tuv wxyzt"];
var guessedLetters = [];

var Word = function() {
	guessesLeft = 5;
	this.displayedString = "";
	this.encodedAnswer = "";
	this.answer = "";
	this.letters = [];
	this.isWrong = true;

	this.newGame = function() {
		this.answer = wordArr[Math.floor(Math.random() * wordArr.length)];

		for (var i = 0; i < this.answer.length; i++) {
			var letter = new Letter(this.answer[i]);
			this.letters.push(letter);
			if (this.answer[i] == " ") {
				this.encodedAnswer += " ";
			}
			else {
				this.encodedAnswer += this.letters[i].unanswered;
			}
		}
		this.displayTheWord(this.encodedAnswer);
		this.promptUser();
	}

	this.displayTheWord = function(text) {
		this.displayedString = "";
		for (var i = 0; i < text.length; i++) {
			this.displayedString += this.encodedAnswer[i];
			this.displayedString += " ";
		}
		console.log(this.displayedString);
	}

	this.checkAnswer = function(userInput) {
		// --- Assume the user's answer is wrong
		this.isWrong = true;

		// --- Check each character to see if the user's guess is present
		for (var i = 0; i < this.answer.length; i++) {
			if (userInput == this.answer[i]) {
				// --- If it is, replace the underscore with the real letter and flip the boolean
				this.encodedAnswer = this.encodedAnswer.replaceAt(i, this.letters[i].answered);
				this.isWrong = false;
			}
		}
		// --- Display updated word
		this.displayTheWord(this.encodedAnswer);

		// --- If the answer is wrong
		if (this.isWrong) {
			// --- Reduce Guesses left by one
			guessesLeft--;
			if (guessesLeft > 0) {
				console.log("\nIncorrect");
				console.log("\nGuessesLeft: " + guessesLeft);
				this.promptUser();
			}

			// --- If there are no more guesses left, you lose.  Allow the user to play again
			else {
				console.log("You lose");
				this.playAgain();
			}
		}
		else {
			if (this.encodedAnswer.indexOf("_") == -1) {
				console.log("YOU WIN!!");
				this.playAgain();
			}
			else {
				console.log("Correct!");
				this.promptUser();
			}
		}
	};

	this.promptUser = function() {
		var obj = this;
		inquirer.prompt([{
			message: "Guess a Letter: ",
			name: "userInput"
		}
		]).then(function(inquirerResponse) {
			if (inquirerResponse.userInput.length > 1) {
				console.log("Please only input one letter.\n");
				obj.promptUser();
			}
			else if (guessedLetters.indexOf(inquirerResponse.userInput) != -1) {
				console.log("You've guessed that letter already.\n");
				obj.promptUser();
			}
			else {
				guessedLetters.push(inquirerResponse.userInput);
				obj.checkAnswer(inquirerResponse.userInput);
			}
		});
	};

	this.playAgain = function() {
		inquirer.prompt([
		{
			name: "continue",
			message: "Would you like to play again?",
			type: "confirm",
			default: false
		}
		]).then(function(inquirerResponse) {
			if (inquirerResponse.continue) {
				word = new Word();
				word.newGame();
			}
			else {
				return;
			}
		})
	}
}

module.exports = Word;