var inquirer = require("inquirer");

var Word = require("./word");

var guessesLeft = 5;
var usersNextGuess = "";

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
};

var word = new Word();

word.newGame();