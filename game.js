
let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let started = false;

let level = 0;

$(document).keypress(function() {
    if(!started){
        $("#level-title").text("Level " + level)
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
 let userChosenColor = $(this).attr("id");

 userClickedPattern.push(userChosenColor);

 playSound(userChosenColor);
 animatePress(userChosenColor);

 checkAnswer(userClickedPattern.length-1);

 //console.log(userClickedPattern);
});


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");
    

        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function (){
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}



function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 3);

    let randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);


    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); //Flash sequence

    playSound(randomChosenColor);

}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}



function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3"); //Sounds
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function (){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
