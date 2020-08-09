
$("#startQuiz").on("click", function () {
    var sec = 30;
    var time = setInterval(myTimer, 1000);

    function myTimer() {
        document.getElementById('timer').innerHTML = sec + "sec left";
        sec--;
        if (sec == -1) {
            clearInterval(time);

        }
    }

    function Quiz(questions) {

        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    Quiz.prototype.getQuestionIndex = function () {
        return this.questions[this.questionIndex];
    }

    Quiz.prototype.guess = function (answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++;
        }

        this.questionIndex++;
    }

    Quiz.prototype.isEnded = function () {
        return this.questionIndex === this.questions.length;
    }


    function Question(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    Question.prototype.isCorrectAnswer = function (choice) {
        return this.answer === choice;
    }


    function populate() {
        if (quiz.isEnded()) {
            showScores();
        }
        else {

            var element = document.getElementById("question");
            element.innerHTML = quiz.getQuestionIndex().text;

            var choices = quiz.getQuestionIndex().choices;
            for (var i = 0; i < choices.length; i++) {
                var element = document.getElementById("choice" + i);
                element.innerHTML = choices[i];
                guess("btn" + i, choices[i]);
            }

            showProgress();
        }
    };


    function guess(id, guess) {
        var button = document.getElementById(id);
        button.onclick = function () {
            quiz.guess(guess);
            populate();
        }
    };


    function showProgress() {
        var currentQuestionNumber = quiz.questionIndex + 1;
        var element = document.getElementById("progress");
        element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
    };

    function showScores() {
        var gameOverHTML = "<h1>High Score</h1>";
        gameOverHTML += "<h2 id='score'> Your score: " + quiz.score + "</h2>";
        var element = document.getElementById("quiz");
        element.innerHTML = gameOverHTML;
    };


    var questions = [
        new Question(" How does Harry manage to breathe underwater during the second task of the Triwizard Tournament?", ["He transfigures into a shark", "He kissed a mermaid", " He eats gillyweed", "He performs a bubble-head charm"], "He eats gillyweed"),
        new Question(" What is the name of Fred and George’s joke shop?", ["Weasley Joke Emporium", "Weasleys’ Wizard Wheezes ", "Fred & George’s Wonder Emporium ", "Zonko’s Joke Shop"], "Weasleys’ Wizard Wheezes"),
        new Question(" Which of these is NOT one of the Unforgivable Curses?", [" Cruciatus Curse", " Imperius Curse", " Sectumsempra", "Avada Kedavra"], " Sectumsempra"),
        new Question(" Who played Lord Voldemort in the movies?", ["Jeremy Irons", "Tom Hiddleston", "Gary Oldman", " Ralph Fiennes"], "Ralph Fiennes"),
        new Question(" Who guards the entrance to the Gryffindor common room?", ["The Grey Lady", " The Fat Friar", "The Bloddy Baron", " The Fat lady"]," The Fat lady"),

    ];

    var quiz = new Quiz(questions);


    populate();


});
