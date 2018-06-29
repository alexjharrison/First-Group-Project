///////////////////////////////////////////////
//////////// Global Variables /////////////////
///////////////////////////////////////////////

var categories = {
    name: [ "Potpourriiii", "Stupid Answers", "Sports", "American History", "Animals", "3 Letter Words", "Science", "Transportation","U.S. Cities", "People", "Television","Hodgepodge","State Capitals","History","The Bible","Business & Industry","U.S. Geography","Annual Events","Common Bonds","Food","Rhyme Time","Word Origins","Pop Music"],
    id: [306, 136, 42, 780, 21, 105, 25, 130, 7, 442, 67, 227, 109, 114, 31, 176, 582, 1114, 508, 49, 561, 223,770]
}

////////////////////////////////////////////////
/////////// Reusable Functions /////////////////
////////////////////////////////////////////////

var requestQuestions = function (){

    //TODO: neeed add min_date
   var queryUrl = "http://jservice.io/api/clues?category=" + categoryId + "min_date=" + "offset"
   
    $.ajax (function(){
        url: queryUrl
        method: "GET"

    })
}



var pickRandomItem = function(inputArray) {
    return Math.floor(Math.random() * inputArray);
}



////////////////////////////////////////////////
///////// Click & Keypress Events //////////////
////////////////////////////////////////////////




////////////////////////////////////////////////
////////////// Program Start ///////////////////
////////////////////////////////////////////////

