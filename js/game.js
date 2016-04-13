$(function() {

    // console.log('game.js');

    // variables used for the onclick function below
    var addPlayer = document.getElementById("submit-name");
    var nameInput = document.getElementById("input-box"); 
    var allPlayers = document.getElementById("players");
    var userResult = document.getElementById("result");


    // var addPlayer2 = document.getElementById("submit-name");
    // var nameInput2 = document.getElementById("input-box"); 
    // var allPlayers2 = document.getElementById("players");

    // we will use this to append the scores
    var score = document.getElementById("accuracyScore");

    // var currentplayer = allPlayers.lastChild;

    // this is the inital template set up 
    // so everything will start out hidden except for the info page
    $("#info").hide();
    $("#counting3").hide();
    $("#counting2").hide();
    $("#counting1").hide();
    $("#go").hide();
    $("#gameboard").hide();
    $("#inputfield").hide();
    $("#difficult").hide();
    $("#normal").hide();
    $("#first").hide();
    $("#second").hide();
    $("#third").hide();
    $("#fourth").hide();
    $("#fifth").hide();
    $("#arrowL").hide();
    $("#arrowR").hide();
    $("#choose-level").hide();
    
    // showing main screen after user clicks ok on the info page 
    document.getElementById("ok").onclick = function(event) {
        console.log("here!!");
        $("#intro").hide();
        $("#difficult").show();
        $("#normal").show();
        $("#inputfield").show();
        $("#choose-level").show();
        // ========================================
        //    THE PLAYER ADDS THEIR NAME TO LIST
        // ========================================
        addPlayer.onclick = function(event) {
            $("#choose-level").hide();
            console.log('addPlayer clicked!');

            var nameContainer = document.createElement("li");
                nameContainer.setAttribute("class", "currentplayer");

            var player = document.createTextNode(nameInput.value);

            nameContainer.appendChild(player);
            allPlayers.appendChild(nameContainer); 

            // clear input fields
            $("#input-box").val("");
            $("#input-box2").val("");
            // after user adds their name the game will start to initialize
            // the user is being instructed on how to begin
            // alert("Click on the textarea to load game");
            $("#arrowL").show();
            $("#arrowR").show();
            // now the user has started the game initialization
            document.getElementById("usertext").onclick = function(event) {
                $("#arrowL").hide();
                $("#arrowR").hide();
                $("#difficult").hide();
                $("#normal").hide();

                var match = 0;
                var nonmatch = 0;
                var correct = [];

                // game will count down 3..2..1 to load the gameClock
                var ready = setInterval(countDown, 300);
                var count = 14;
                function countDown(){

                    // will use to reset pagetext for each game
                    $div3Child = $("#pagetext");
                    // will use to reset users results from previous game
                    $output = $("#result");
                    // decrementing operation for countdown
                    count--;

                    // making pop up divs to count down 3..2..1
                    if(count == 12){
                        $("#counting3").show();
                    }
                    else if(count == 8){
                        $("#counting3").hide();
                      
                        $("#counting2").show();

                    }
                    else if(count == 4){
                        $("#counting2").hide();
                        
                        $("#counting1").show();

                    }
                    else if(count <= 0){
                        $("#counting1").hide();
                        
                        $("#go").show();
                        $("#go").hide();
                        // =======================
                        //     END OF COUNTDOWN
                        // =======================

                        // initializing starting score for new game
                        var span = document.createElement("Span");
                        var first_score = document.createTextNode("100"); 
                        span.appendChild(first_score);
                        score.appendChild(span);

                        // initializing starting clock time for new game
                        $("#elapsedtime").addClass("elapsed").html("00:00");
                        // initializing starting text for new game

                        // $("#pagetext").html(strings[0]);
                        $("#first").show();

                        // initializing game layout
                        $("#gameboard").show()
                        // ("slow", function() {
                        // // Animation complete.
                        // });
                        $("#difficult").show();
                        $("#normal").show();
                        $("#textcontainer").show();
                        // $("#pagetext").show();
                        $("#textcontainer2").hide();

                        clearInterval(ready);
                        
                        // =================
                        //     GAME ON!!!
                        // =================

                        // countdown is over and the gameClock is invoked
                        var clock = setTimeout(gameClock, 1000);
                    }
                }

                // Interval invoking checkLastTime function which will  
                // deduct points from player if they try to delay the game
                var keyClock = setInterval(checkLastTime,1000);

                // now the users typing is recognized to launch game function
                document.getElementById("usertext").addEventListener("keyup", game);
               
               
                
                function displayScore(){

                    while (score.firstChild) {
                        score.removeChild(score.firstChild);
                    }
                    var span = document.createElement("Span");
                    var text = document.createTextNode(accuracyScore); 
                    span.appendChild(text);
                    score.appendChild(span);
                    // console.log(score.firstChild.innerHTML)
                }




                var elapsedTime = 0;
                var $elapsed = $('#elapsedtime');

                function gameClock() {
                    // alert('sgisnefi');
                    elapsedTime++;

                    // calculate the minutes and seconds from elapsed time
                    var minute = Math.floor(elapsedTime / 60);
                    var second = elapsedTime % 60;   

                    // add padding 0 if minute and second is less then 10
                    if(minute < 10) 
                        minute = "0" + minute;

                    if(second < 10) 
                        second = "0" + second;

                    // display the elapsed time during game
                    $elapsed.html(minute+":"+second);
                    
                    if(elapsedTime == 8){
                        console.log(correct);
                        $("#first").hide("drop");
                        $("#second").show();
                        // clear result & text box when new string appears
                        $("#result").empty();
                        $("#usertext").val("");
                        match = 0;
                        nonmatch = 0;
                        correct = [];
                    }
                    if(elapsedTime == 18){
                        console.log(correct);
                        $("#second").hide("drop");
                        $("#third").show();
                        $("#result").empty();
                        $("#usertext").val("");
                        match = 0;
                        nonmatch = 0;
                        correct = [];
                    }
                    if(elapsedTime == 35){
                        $("#third").hide("drop");
                        $("#fourth").show();
                        $("#result").empty();
                        $("#usertext").val("");
                        match = 0;
                        nonmatch = 0;
                        correct = [];
                    }
                    // conditional for the end of the game
                    if(elapsedTime == 60){
                        var currentplayer = allPlayers.lastChild;
                        var x = document.createTextNode(accuracyScore);
                        currentplayer.appendChild(x);
                        // ===================
                        //     END OF GAME
                        // ===================
                        $("#fourth").hide("drop");

                        alert('TIME UP');
                        $("#result").empty();
                        $("#usertext").val("");
                
                        // clear game board at the end
                        $("#gameboard").hide();
                        
                        // after game, user has the option of 
                        // clicking to see the game info
                        $("#info").show();
                        document.getElementById("info").onclick = function(event){
                            $("#intro").show();
                            $("#difficult").hide();
                            $("#normal").hide();
                            $("#info").hide();
                            $("#inputfield").hide();
                        }

                        // remove score so score can be reset
                        score.removeChild(score.firstChild);

                    }else{
                        var stop = setTimeout(gameClock, 1000);
                    }
                }

                

                var typedText = document.getElementById('usertext');
                var userText = typedText.value.split("");
                
                // var match = 0;
                // var nonmatch = 0;
                // var correct = [];    

                var lastKeyTime = 0;

                // var speedScore = 100;
                var accuracyScore = 100;
                
                function checkLastTime(){
                    // console.log("checking time..."+elapsedTime+":"+lastKeyTime);
                    if ( (elapsedTime - lastKeyTime) > 10){
                            accuracyScore -= 10;
                            displayScore();
                           
                    }
                        
                }



                // GAME FUNCTION CONTAINING ALL FUNCTIONS 
                function game() {
                  
                    // var pageText = document.getElementById('pagetext').innerHTML.split("");
                    var first = document.getElementById('first').innerHTML.split("");
                    var second = document.getElementById('second').innerHTML.split("");
                    var third = document.getElementById('third').innerHTML.split("");
                    var fourth = document.getElementById('fourth').innerHTML.split("");
                    // var pageText = [first, second, third, fourth];
                    // var length = pageText.length;
                      
                    var typedText = document.getElementById('usertext');
                    var userText = typedText.value.split("");


                    console.log("keyPress");
                    lastKeyTime = elapsedTime;
                    // stopClock();
                    clearText();
                    checkCorrect();
                    
                    checkLength();
                    displayCorrect();
                    accuracyCheck();
                    checkLastTime();
                    displayScore();
                   


                    function accuracyCheck(){
                        console.log(correct.length);
                        if(correct[correct.length-1] == "incorrect"){
                            accuracyScore -= 5;
                        }else if(correct[correct.length-1] == "correct"){
                            accuracyScore +=5;
                        }
                    }



                    function checkCorrect(){
                      
                        var typedText = document.getElementById('usertext');
                        var userText = typedText.value.split("");
                        
                        // conditional for first string
                        if(elapsedTime < 8){
                            for (var i = 0; i < correct.length; i++) {
                            correct[i] = "";
                            }
                            for (var i = 0; i < userText.length; i++) {
                                if (first[i] == userText[i]){
                                    match++;
                                    correct[i] = "correct"; 
                                }
                                else{
                                    nonmatch++;
                                    console.log(accuracyScore);
                                    correct[i] = "incorrect";
                                }
                            }
                        }

                        // conditional for second string
                        else if(elapsedTime >= 8 && elapsedTime < 18){
                            for (var i = 0; i < correct.length; i++) {
                            correct[i] = "";
                            }
                            for (var i = 0; i < userText.length; i++) {
                                if (second[i] == userText[i]){
                                    match++;
                                    correct[i] = "correct"; 
                                }
                                else{
                                    nonmatch++;
                                    console.log(accuracyScore);
                                    correct[i] = "incorrect";
                                }
                            }
                        }           
                        // conditional for third string
                        else if(elapsedTime >= 18 && elapsedTime < 35){
                            for (var i = 0; i < correct.length; i++) {
                            correct[i] = "";
                            }
                            for (var i = 0; i < userText.length; i++) {
                                if (third[i] == userText[i]){
                                    match++;
                                    correct[i] = "correct"; 
                                }
                                else{
                                    nonmatch++;
                                    console.log(accuracyScore);
                                    correct[i] = "incorrect";
                                }
                            }
                        }  
                        // conditional for fourth string
                        else if(elapsedTime >= 35 && elapsedTime < 60){
                            for (var i = 0; i < correct.length; i++) {
                            correct[i] = "";
                            }
                            for (var i = 0; i < userText.length; i++) {
                                if (fourth[i] == userText[i]){
                                    match++;
                                    correct[i] = "correct"; 
                                }
                                else{
                                    nonmatch++;
                                    console.log(accuracyScore);
                                    correct[i] = "incorrect";
                                }
                            }
                        }                           
                    }
                    
                    function checkLength(){
                        // checking length of first string
                        if(elapsedTime < 8){
                            if (userText.length > first.length){
                                for (var i = first.length ; i < userText.length; i++)
                                    correct[i] = "incorrect";
                            }
                        }
                        // checking length of second string
                        else if(elapsedTime >= 8 && elapsedTime < 18){
                            if (userText.length > second.length){
                                for (var i = second.length ; i < userText.length; i++)
                                    correct[i] = "incorrect";
                            }
                        }
                        // checking length of third string
                        else if(elapsedTime >= 18 && elapsedTime < 35){
                            if (userText.length > third.length){
                                for (var i = third.length ; i < userText.length; i++)
                                    correct[i] = "incorrect";
                            }
                        }
                        // checking length of fourth string
                        else if(elapsedTime >= 35 && elapsedTime < 60){
                            if (userText.length > fourth.length){
                                for (var i = fourth.length ; i < userText.length; i++)
                                    correct[i] = "incorrect";
                            }
                        }
                    }
                    // end checkLength function
                    
                    function displayCorrect(){
                        for (var i = 0; i < userText.length; i++){
                            var span = document.createElement("Span");
                            var text = document.createTextNode(userText[i]);
                            if (correct[i] == "correct")
                                span.style.color = "blue";
                            else if (correct[i] == "incorrect")
                                span.style.color = "red";   
                            // after conditionals, do this
                            span.appendChild(text);
                            document.getElementById("result").appendChild(span);
                        }
                    }
                    // end displayCorrect function


                    // function that prevents the result from rendering the curent letter
                    // that the users typing along with the preveious letters. 
                    // Prevents recursion
                    function clearText(){
                        var userResult = document.getElementById("result");
                        while (userResult.firstChild) {
                            userResult.removeChild(userResult.firstChild);
                        }
                    }
                    // end cleartext function
                }
                // end game function
            }
            // end onclick for user clicking on textarea to initialize game 
        }
        // end addPlayer/EASY game


        // ===============================================
        //                 DIFFICULT GAME
        // ===============================================

        var addPlayer2 = document.getElementById("submit-name2");
        var nameInput2 = document.getElementById("input-box2"); 
        var allPlayers2 = document.getElementById("players2");
        var currentplayer2 = allPlayers2.lastChild;

            
        // ======================================================
        //    THE PLAYER ADDS THEIR NAME TO LIST FOR HARD GAME
        // ======================================================
        addPlayer2.onclick = function(event) {
            $("#choose-level").hide();
            // console.log('addPlayer clicked!');

            var nameContainer = document.createElement("li");
                nameContainer.setAttribute("class", "currentplayer2");

            var player = document.createTextNode(nameInput2.value);

            nameContainer.appendChild(player);
            allPlayers2.appendChild(nameContainer); 
            
            // clear input fields
            $("#input-box").val("");
            $("#input-box2").val("");
            // after user adds their name the game will start to initialize
            // the user is being instructed on how to begin
            $("#arrowL").show();
            $("#arrowR").show();
            // now the user has started the game initialization
            document.getElementById("usertext").onclick = function(event) {
                $("#arrowL").hide();
                $("#arrowR").hide();
                $("#difficult").hide();
                $("#normal").hide();

                // game will count down 3..2..1 to load the gameClock
                var ready = setInterval(countDown, 300);
                var count = 14;
                function countDown(){

                    // will use to reset pagetext for each game
                    $div3Child = $("#pagetext2");
                    // will use to reset users results from previous game
                    $output = $("#result");
                    // decrementing operation for countdown
                    count--;

                    // making pop up divs to count down 3..2..1
                    if(count == 12){
                        $("#counting3").show();
                    }
                    else if(count == 8){
                        $("#counting3").hide();
                      
                        $("#counting2").show();

                    }
                    else if(count == 4){
                        $("#counting2").hide();
                        
                        $("#counting1").show();

                    }
                    else if(count <= 0){
                        $("#counting1").hide();
                        
                        $("#go").show();
                        $("#go").hide();
                        // =======================
                        //     END OF COUNTDOWN
                        // =======================

                        // initializing starting score for new game
                        var span = document.createElement("Span");
                        var first_score = document.createTextNode("100"); 
                        span.appendChild(first_score);
                        score.appendChild(span);

                        // initializing starting clock time for new game
                        $("#elapsedtime").addClass("elapsed").html("00:00");
                        // initializing starting text for new game
                        $("#pagetext2").html("At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.");
                        // initializing game layout
                        $("#gameboard").show("slow", function() {
                        // Animation complete.
                        });
                        $("#textcontainer").hide();
                        $("#textcontainer2").show();
                        // $("#pagetext2").hide();
                        $("#difficult").show();
                        $("#normal").show();
                        clearInterval(ready);
                        
                        // =================
                        //     GAME ON!!!
                        // =================

                        // countdown is over and the gameClock is invoked
                        var clock = setTimeout(gameClock, 1000);
                    }
                }

                // Interval invoking checkLastTime function which will  
                // deduct points from player if they try to delay the game
                var keyClock = setInterval(checkLastTime,1000);

                // now the users typing is recognized to launch game function
                document.getElementById("usertext").addEventListener("keyup", game);
               
               
                
                function displayScore(){

                    while (score.firstChild) {
                        score.removeChild(score.firstChild);
                    }
                    var span = document.createElement("Span");
                    var text = document.createTextNode(accuracyScore); 
                    span.appendChild(text);
                    score.appendChild(span);
                    // console.log(score.firstChild.innerHTML)
                }




                var elapsedTime = 0;
                var $elapsed = $('#elapsedtime');

                function gameClock() {
                    // alert('sgisnefi');
                    elapsedTime++;

                    // calculate the minutes and seconds from elapsed time
                    var minute = Math.floor(elapsedTime / 60);
                    var second = elapsedTime % 60;   

                    // add padding 0 if minute and second is less then 10
                    if(minute < 10) 
                        minute = "0" + minute;

                    if(second < 10) 
                        second = "0" + second;

                    // display the elapsed time during game
                    $elapsed.html(minute+":"+second);
                    
                    // conditional for the end of the game
                    if(elapsedTime == 60){
                        var currentplayer2 = allPlayers2.lastChild;
                        var x = document.createTextNode(accuracyScore);
                        currentplayer2.appendChild(x);
                        // ===================
                        //     END OF GAME
                        // ===================
                        alert('TIME UP');
                        $("#gameboard").hide();
                        $("#result").empty();
                        $("#usertext").val("");
                        // $("#pagetext2").empty();
                        // remove score so score can be reset
                        score.removeChild(score.firstChild);
                        // remove pagetext so text can be reset
                        $("#pagetext2").removeChild($("#pagetext2").firstChild);
                        // clear game board at the end
                        
                        // after game, user has the option of 
                        // clicking to see the game info
                        $("#info").show();
                        document.getElementById("info").onclick = function(event){
                            $("#intro").show();
                            $("#difficult").hide();
                            $("#normal").hide();
                            $("#info").hide();
                            $("#inputfield").hide();
                        }


                    }else{
                        var stop = setTimeout(gameClock, 1000);
                    }
                }

                

                var typedText = document.getElementById('usertext');
                var userText = typedText.value.split("");
                
                var match = 0;
                var nonmatch = 0;
                var correct = [];    

                var lastKeyTime = 0;

                // var speedScore = 100;
                var accuracyScore = 100;
                
                function checkLastTime(){
                    // console.log("checking time..."+elapsedTime+":"+lastKeyTime);
                    if ( (elapsedTime - lastKeyTime) > 10){
                            accuracyScore -= 10;
                            displayScore();
                           
                    }
                        
                }



                // GAME FUNCTION CONTAINING ALL FUNCTIONS 
                function game() {
                  
                    var pageText = document.getElementById('pagetext2').innerHTML.split("");
                    var length = pageText.length;
                      
                    var typedText = document.getElementById('usertext');
                    var userText = typedText.value.split("");


                    console.log("keyPress");
                    lastKeyTime = elapsedTime;
                    // stopClock();
                    clearText();
                    checkCorrect();
                    
                    checkLength();
                    displayCorrect();
                    accuracyCheck();
                    checkLastTime();
                    displayScore();
                   


                    function accuracyCheck(){
                        console.log(correct.length);
                        if(correct[correct.length-1] == "incorrect"){
                            accuracyScore -= 5;
                        }else if(correct[correct.length-1] == "correct"){
                            accuracyScore +=5;
                        }



                    }



                    function checkCorrect(){
                      
                         var typedText = document.getElementById('usertext');
                        var userText = typedText.value.split("");
                        console.log(userText);
                           for (var i = 0; i < correct.length; i++) {
                            correct[i] = "";
                        }
                        for (var i = 0; i < userText.length; i++) {
                            
                            if (pageText[i] == userText[i]){
                                match++;
                                correct[i] = "correct"; 
                                // accuracyScore += 5;       
                            }
                            else{
                                nonmatch++;
                                console.log(accuracyScore);
                                correct[i] = "incorrect";
                                
                            }
                        }
                    }
                    
                    function checkLength(){
                        if (userText.length > length){
                            for (var i = pageText.length ; i < userText.length; i++)
                                correct[i] = "incorrect";
                        }
                    }
                    // end checkLength function
                
                    function displayCorrect(){
                        for (var i = 0; i < userText.length; i++){
                            var span = document.createElement("Span");
                            var text = document.createTextNode(userText[i]);
                            if (correct[i] == "correct")
                                span.style.color = "blue";
                            else if (correct[i] == "incorrect")
                                span.style.color = "red";   
                            // after conditionals, do this
                            span.appendChild(text);
                            document.getElementById("result").appendChild(span);
                        }
                    }
                    // end displayCorrect function


                    // function that keeps the text result from copying the previous text and repasting
                    // this allows us to render the proper text
                    function clearText(){
                        var userResult = document.getElementById("result");
                        while (userResult.firstChild) {
                            userResult.removeChild(userResult.firstChild);
                        }
                    }
                    // end cleartext function
                }
                // end game function
            }
            // end onclick for user clicking on textarea to initialize game 
        }
        // end addPlayer/EASY game
    }
    // end onclick for "ok" button on info screen






});
