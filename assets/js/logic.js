///////////////////////////////////////////////
//////////// Global Variables /////////////////
///////////////////////////////////////////////

var allCategories = {
    name: ["Potpourriiii", "Stupid Answers", "Sports", "American History", "Animals", "3 Letter Words", "Science", "Transportation", "U.S. Cities", "People", "Television", "Hodgepodge", "State Capitals", "History", "The Bible", "Business & Industry", "U.S. Geography", "Annual Events", "Common Bonds", "Food", "Rhyme Time", "Word Origins", "Pop Music"],
    id: [306, 136, 42, 780, 21, 105, 25, 130, 7, 442, 67, 227, 109, 114, 31, 176, 582, 1114, 508, 49, 561, 223, 770]
}
var points = [200, 400, 600, 800, 1000];

var categories, questions, answers, wrongAnswers;


////////////////////////////////////////////////
/////////// Reusable Functions /////////////////
////////////////////////////////////////////////

//start on page load
var loadQuestionsFromJService = function () {
    // clear variables from last game
    categories = [];
    questions = [];
    answers = [];
    wrongAnswers = [];

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
    var apiCallCounter = 0;
    //i represents each category
    for (var i = 0; i < 6; i++) {
        //j represents each points value
        var catQuestions = [];
        var catAnswers = [];
        var catWrongAnswers = [];
        for (var j= 0; j<5;j++) {
            var queryUrl = "http://jservice.io/api/clues/?value=" + points[j] + "&category=" + indexList[i]// + '&max_date="2005-01-01T12:00:00.000Z"';
            $.ajax({
                url: queryUrl,
                method: "GET"
            }).then(function (response) {
                apiCallCounter++;
                var randomQ = Math.floor(Math.random()*response.length);
                var newQ = response[randomQ].question;
                var newA = response[randomQ].answer;
                catQuestions.push(newQ);
                catAnswers.push(newA);
                if(newQ===undefined) {
                    console.log("badone");
                }
                if(catQuestions.length===5) {
                    questions.push(catQuestions);
                    answers.push(catAnswers);
                    catQuestions = [];
                    catAnswers = [];
                }
                if (apiCallCounter===30) {
                    console.log(questions,answers);
                }
            })
        }
    }
}

    







////////////////////////////////////////////////
///////// Click & Keypress Events //////////////
////////////////////////////////////////////////




////////////////////////////////////////////////
////////////// Program Start ///////////////////
////////////////////////////////////////////////

loadQuestionsFromJService();