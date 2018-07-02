///////////////////////////////////////////////
//////////// Global Variables /////////////////
///////////////////////////////////////////////

var allCategories = {
    name: ["Potpourriiii", "Stupid Answers", "Sports", "American History", "Animals", "3 Letter Words", "Science", "Transportation", "U.S. Cities", "People", "Television", "Hodgepodge", "State Capitals", "History", "The Bible", "Business & Industry", "U.S. Geography", "Annual Events", "Common Bonds", "Food", "Rhyme Time", "Word Origins", "Pop Music"],
    id: [306, 136, 42, 780, 21, 105, 25, 130, 7, 442, 67, 227, 109, 114, 31, 176, 582, 1114, 508, 49, 561, 223, 770]
}
var points = [100, 200, 300, 400, 500];

var categories, questions, answers, wrongAnswers, apiCounter;
var userName;
var scores = [];
var acceptBuzzer = false;
var currentQuestion = "";
var currentAnswer = "";

////////////////////////////////////////////////
/////////// Reusable Functions /////////////////
////////////////////////////////////////////////

//start on page load
var loadQuestionsFromJService = function () {
    // clear variables from last game
    categories = [];
    questions = [[], [], [], [], [], []];
    answers = [[], [], [], [], [], []];
    wrongAnswers = [];
    scores = [0, 0, 0];
    apiCounter = 0;

    //fill categories array until 6 decided for game
    var indexList = [];
    while (!categories[5]) {
        //find random int from 0 to size of category list
        var randomInt = Math.floor(Math.random() * allCategories.name.length);
        var newCategory = allCategories.name[randomInt];
        var newCatID = allCategories.id[randomInt];

        //do not add to category list if repeat
        if (!categories.includes(newCategory)) {
            categories.push(newCategory);
            indexList.push(newCatID);
        }
    }

    //run through each category
    for (var i = 0; i < 6; i++) {
        //run through each point value
        for (var j = 0; j < 5; j++) {
            apiCaller(i, j, indexList[i]);
        }
    }
}

var apiCaller = function (i, j, catId) {
    var queryUrl = "http://jservice.io/api/clues/?category=" + catId + "&value=" + points[j]
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        if (response.length === 0) {
            alert("too short");
            return;
        }
        var randomInt = Math.floor(Math.random() * response.length);
        var newQ = response[randomInt].question;
        var newA = response[randomInt].answer;
        questions[i][j] = newQ;
        answers[i][j] = newA;
        apiCounter++;
        if (apiCounter === 30) {
            console.log(categories, questions, answers)
            if (questions.includes("=") || answers.includes("=")) {
                loadQuestionsFromJService();
            }
            //PUT FUNCTION HERE TO DO WHEN QUESTIONS ARE LOADED
            populateCategories();
<<<<<<< HEAD

        }

=======
            animateQuestion();
        } 
>>>>>>> master
    })
}
// On selected question click a blue box that we will be able to fill with relevant questions
function animateQuestion() {
    $("#dollars").click(function(){
    displayQuestions = $("#dollars").html("<div id='questionBoard'>")
    for(var i=0;i<questions.length; i++) {
        $("#questionBoard" + (i+1)).html(questions[i]);
    }
    });
    acceptBuzzer = true;
  };

var populateCategories = function () {
    for (var i = 0; i < categories.length; i++) {
        $("#category-" + (i + 1)).html(categories[i]);
    }
}

<<<<<<< HEAD
var getUserName = function () {

}


var snd = function (nameOfSong) {
=======
var snd = function (nameOfSong){
>>>>>>> master

    var timeUp = new Audio("../sounds/" + nameOfSong + ".mp3");
    snd.play();
};




////////////////////////////////////////////////
///////// Click & Keypress Events //////////////
////////////////////////////////////////////////

while (acceptBuzzer) {
    document.body.onkeypress = function (e) {
        if (e.keyCode == 32) {
        }
    }
    acceptBuzzer = false;
}

$(document).on("submit", "#enter-answer", function () {
    alert("submitted");
})

////////////////////////////////////////////////
////////////// Program Start ///////////////////
////////////////////////////////////////////////
getUserName();
loadQuestionsFromJService();