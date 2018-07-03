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
    $("#instruction").text("Click a Box to Get Question");

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
        }

    })
}


var populateCategories = function () {
    for (var i = 0; i < categories.length; i++) {
        $("#category-" + (i + 1)).html(categories[i]);
    }
}


var snd = function (nameOfSong) {

    var timeUp = new Audio("../sounds/" + nameOfSong + ".mp3");
    snd.play();
};

function askName() {
    newDiv = $("<div>").attr("id", "nameBoard");
    var img = $("<img id='title' src='assets/jeopardy.png' alt='Jeopardy!'>");
    var text = $("<p>Enter your name to begin</p>")
    var newForm = $("<form>").attr("id", "nameForm");
    newForm.append($("<input type='text' id='nameBox'>"))
    newForm.append($("<input type='submit' id='nameButton'>"))
    newDiv.append(img,text,newForm);
    $("body").append(newDiv);
    newDiv.slideDown(500);
    $("#nameForm").submit( function (e) {
        e.preventDefault();
        var enteredName = $("#nameBox").val();
        console.log(enteredName);
        newDiv.slideUp(500);
        newDiv.remove();
        $("#contName").text(enteredName);
        $(document).off();
    })
}

var readQuestion = function () {

}



function speakLine(text) {
    text = encodeURIComponent(text);
    console.log(text);

    var url = "https://translate.google.com/translate_tts?ie=UTF-8&q=" + text + "&tl=en&client=tw-ob"

    $("audio").attr("src", url).get(0).play();

}




////////////////////////////////////////////////
///////// Click & Keypress Events //////////////
////////////////////////////////////////////////




// On selected question click a blue box that we will be able to fill with relevant questions
$(".question").click(function () {
    var thisID = $(this).attr("id");
    $(this).text = "";
    thisID = thisID.split("-");
    currentQuestion = questions[thisID[1] - 1][points.indexOf(parseInt(thisID[2]))];
    if (currentQuestion === "") { return; }
    $("#instruction").text("Press Space Bar to Buzz In");
    questions[thisID[1] - 1][points.indexOf(parseInt(thisID[2]))] = "";
    console.log(currentQuestion);
    currentAnswer = answers[thisID[1] - 1][points.indexOf(parseInt(thisID[2]))];
    answers[thisID[1] - 1][points.indexOf(parseInt(thisID[2]))] = "";
    console.log(currentAnswer);
    acceptBuzzer = true;
    var newDiv = $("<div>").attr("id", "questionBoard");
    newDiv.append($("<p>").attr("id", "currentQuestion").text(currentQuestion));
    $("body").prepend(newDiv);
    newDiv.slideDown(750, "swing", readQuestion);
    var counter = 10;
    var counterText = $("<p>").text(counter);
    newDiv.append(counterText);
    var interval = setInterval(function () {
        counterText.text(--counter);
        if (counter === 0) {
            newDiv.slideUp(750, "swing", function () {
                newDiv.remove();
                clearInterval(interval);
                $(document).off();
            })
        }
    }, 1000)

    $(document).keypress(function (e) {
        if (e.keyCode == 32 && acceptBuzzer) {
            clearInterval(interval);
            counterText.remove();
            $("#instruction").text("Type Your Answer");
            var newForm = $("<form>").attr("id", "answerForm");
            newForm.append($("<input type='text' id='answerBox'>"))
            newForm.append($("<input type='submit' id='answerButton'>"))
            newDiv.append(newForm);
            $("#score .card-header").addClass("buzzed");
            $("#answerForm").submit(function (event) {
                event.preventDefault();
                var guessedAnswer = $('#answerBox').val();
                newDiv.slideUp(750, "swing", function () {
                    newDiv.remove()
                    $("#score .card-header").removeClass("buzzed");
                });
                console.log(guessedAnswer);
            })
        }
        acceptBuzzer = false;
        $(document).off();
    });


});


////////////////////////////////////////////////
////////////// Program Start ///////////////////
////////////////////////////////////////////////

askName();
loadQuestionsFromJService();