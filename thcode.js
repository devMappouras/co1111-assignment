
//calls treasure hunts from API
//creates a list with all treasure hunts
function getTreasureHunts() {

    fetch("https://codecyprus.org/th/api/list")
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {

            let playersName=prompt("Enter Your Name:", "");

            checkCookie(playersName);

            //ul element that shows treasure hunts list
            let thList = document.getElementById("thList");
            let treasureHunts = jsonObject.treasureHunts;

            for(let i=0; i < treasureHunts.length; i++) {

                let listItem = document.createElement("li");
                let treasureHuntName =  treasureHunts[i].name;
                let treasureHuntDesc =  treasureHunts[i].description;
                let treasureHuntID =  treasureHunts[i].uuid;

                //listItem.innerHTML ="<div class='container2'>" + "<h4>" +treasureHuntName+ "</h4>"+ "<p>" +treasureHuntDesc+ "</p>" + "<a href='https://codecyprus.org/th/api/start?player="+ playersName +"&app=team3TreasureHunt&treasure-hunt-id="+treasureHuntID+"'>Start</a>" + "</div><br>";
                listItem.innerHTML ="<div class='container2'>" + "<h4>" +treasureHuntName+ "</h4>"+ "<p>" +treasureHuntDesc+ "</p>" + "<a href='question.html?player="+ playersName +"&treasure-hunt-id="+treasureHuntID+"'>Start</a>" + "</div><br>";

                thList.appendChild(listItem);
            }
        });
}

//creates cookies
function createCookie(cookieName,cookieValue,hoursToExpire)
{
    var date = new Date();
    date.setTime(date.getTime()+(hoursToExpire*60*60*1000));
    document.cookie = cookieName + "=" + cookieValue + "; expires=" + date.toGMTString();
}


//accessing the cookies with cookieName
function accessCookie(cookieName)
{
    var name = cookieName + "=";
    var allCookieArray = document.cookie.split(';');
    for(var i=0; i<allCookieArray.length; i++)
    {
        var temp = allCookieArray[i].trim();
        if (temp.indexOf(name)===0)
            return temp.substring(name.length,temp.length);
    }
    return "";
}

//checks if session has already started and did not finish
function checkCookie(playersName) {
    var nameInTh = accessCookie("username");
    if (playersName === nameInTh) {
        //alert("Welcome Back!");
        let link = "question.html?player="+ playersName +"&treasure-hunt-id="+ accessCookie("sessionID");
        console.log(link);
        getQuestion(link);
        //window.location.replace(link);
    }
}

//function that starts the th game
    function getStartData() {

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const playersName = urlParams.get('player')
        let treasureHuntID = urlParams.get('treasure-hunt-id')

        //console.log(playersName);
        //console.log(treasureHuntID);

        //example link
        //https://codecyprus.org/th/api/start?player=Homer&app=simpsons-app&treasure-hunt-id=ag9nfmNvZGVjeXBydXNvcmdyGQsSDFRyZWFzdXJlSHVudBiAgICAvKGCCgw
        fetch("https://codecyprus.org/th/api/start?player=" + playersName + "&app=team3TreasureHunt&treasure-hunt-id=" + treasureHuntID + "")
            .then(response => response.json()) //Parse JSON text to JavaScript object
            .then(jsonObject => {

                let thstatus = jsonObject.status;
                let thsession = jsonObject.session;

                let totalQuestions = jsonObject.numOfQuestions;

                if (thstatus === "OK") {
                    createCookie("sessionID", thsession, 1);
                    createCookie("username", playersName, 1);
                    //gets questions from server and shows them to the user
                    getQuestion(thsession);
                } else {
                    alert(jsonObject.errorMessages);
                    window.location.replace("https://pelopedis.github.io/co1111-assignment/app.html");
                }

                //console.log(thsession);
                //console.log(totalQuestions);

            });
    }

let sendAnswerBool = false;

//function that calls the questions from server
    function getQuestion(thsession) {

        //example link
        //https://codecyprus.org/th/api/question?session=ag9nfmNvZGVjeXBydXNvcmdyFAsSB1Nlc3Npb24YgICAoMa0gQoM
        fetch("https://codecyprus.org/th/api/question?session=" + accessCookie("sessionID"))
            .then(response => response.json()) //Parse JSON text to JavaScript object
            .then(jsonObject => {

                //hides all answer elements
                questionButton = document.getElementsByClassName("questionButton");
                answerButton = document.getElementsByClassName("answerButton");

                for (i = 0; i < questionButton.length; i++) {
                    questionButton[i].style.display = "none";
                }

                for (i = 0; i < answerButton.length; i++) {
                    answerButton[i].style.display = "none";
                }

                //initializing properties from server
                let qStatus = jsonObject.status;

                //gets the number of total questions
                let totalQuestions = jsonObject.numOfQuestions;

                //calculates the final question
                let finalQuestion = totalQuestions - 1;

                //gets the number of current question
                let questionNo = jsonObject.currentQuestionIndex;

                //gets question from server
                let questionText = jsonObject.questionText;

                //gets what type is the question
                let questionType = jsonObject.questionType;
                //console.log(questionType)

                //specifies if question can be skipped
                let isSkip = jsonObject.canBeSkipped;

                //specifies if the user has completed this treasure hunt
                let isComplete = jsonObject.completed;

                //testing when treasure hunt ends
                //console.log("th is: " + isComplete);

                //specifies if question requires location
                let isLocation = jsonObject.requiresLocation;

                //get element in html to print question
                let question = document.getElementById("question");

                //get element in html to print question number
                let questionNoHTML = document.getElementById("questionNo");

                //functionality of HTML elements
                //text elements
                let submitString = document.getElementById("submitString");
                let answerString = document.getElementById("answerString");

                //number elements
                let submitNo = document.getElementById("submitNo");
                let answerNo = document.getElementById("answerNo");


                //boolean elements
                let boolF = document.getElementById("boolF");
                let boolT = document.getElementById("boolT");

                //MCQ buttons
                let buttonA = document.getElementById("buttonA");
                let buttonB = document.getElementById("buttonB");
                let buttonC = document.getElementById("buttonC");
                let buttonD = document.getElementById("buttonD");

                //qr show/hide button
                let qrDropdown = document.getElementsByClassName("qrDropdown");

                //get element in html to show camera button
                let qrBtn = document.getElementById("qrBtn");
                //get element in html to show camera switch button
                let switchButton = document.getElementById("switch");

                //exports question to player
                question.innerHTML = questionText;

                //exports question number to player
                questionNoHTML.innerHTML = "Question: " + questionNo + "/" + totalQuestions;

                //initialising the variable which sends the answer to server
                let answer;

                sendAnswerBool = false;

                //checks if treasure hunt is not completed
                if (isComplete === false) {

                    //show question text
                    question.style.display = "block";

                    //show question number
                    questionNoHTML.style.display = "inline-block";

                    //show camera button
                    qrBtn.style.display = "inline-block";

                    //show camera switch button
                    switchButton.style.display = "inline-block";

                    getScore();

                    //checks if question can be skipped
                    if (isSkip === true) {
                        skipQuestion(thsession);
                    }

                    //checks what type each question is and acts accordingly
                    if (questionType === "BOOLEAN") {

                        //shows boolean submit buttons (changing css display to inline)
                        boolT.style.display = "inline";
                        boolF.style.display = "inline";


                        //get answer (using onclick in js)
                        boolT.onclick = function () {
                            //if answer requires location then get location before sending answer
                            if (isLocation === true) {
                                getLocation();
                            }
                            answer = true;
                            sendAnswertoServer(thsession, answer);
                        };

                        //get answer (using onclick in js)
                        boolF.onclick = function () {
                            //if answer requires location then get location before sending answer
                            if (isLocation === true) {
                                getLocation();
                            }
                            answer = false;
                            sendAnswertoServer(thsession, answer);
                        };

                    } else if (questionType === "INTEGER") {

                        //shows number input and submit button (changing css display to inline)
                        answerNo.style.display = "inline";
                        submitNo.style.display = "inline";

                        //get answer (using onclick in js)
                        submitNo.onclick = function () {
                            //if answer requires location then get location before sending answer
                            if (isLocation === true) {
                                getLocation();
                            }
                            answer = answerNo.value;
                            sendAnswertoServer(thsession, answer);
                            answerNo.value = '';
                        };


                    } else if (questionType === "NUMERIC") {

                        //shows number input and submit button (changing css display to inline)
                        answerNo.style.display = "inline";
                        submitNo.style.display = "inline";
                        answer = answerNo.value;

                        //get answer (using onclick in js)
                        submitNo.onclick = function () {
                            //if answer requires location then get location before sending answer
                            if (isLocation === true) {
                                getLocation();
                            }
                            answer = answerNo.value;
                            sendAnswertoServer(thsession, answer);
                            answerNo.value = '';
                        };
                    } else if (questionType === "MCQ") {

                        //shows 4 boolean submit buttons (changing css display to inline)
                        buttonA.style.display = "inline";
                        buttonB.style.display = "inline";
                        buttonC.style.display = "inline";
                        buttonD.style.display = "inline";

                        //get answer (using onclick in js)
                        buttonA.onclick = function () {
                            //if answer requires location then get location before sending answer
                            if (isLocation === true) {
                                getLocation();
                            }
                            answer = 'A';
                            sendAnswertoServer(thsession, answer);
                        };

                        //get answer (using onclick in js)
                        buttonB.onclick = function () {
                            //if answer requires location then get location before sending answer
                            if (isLocation === true) {
                                getLocation();
                            }
                            answer = 'B';
                            sendAnswertoServer(thsession, answer);
                        };

                        //get answer (using onclick in js)
                        buttonC.onclick = function () {
                            //if answer requires location then get location before sending answer
                            if (isLocation === true) {
                                getLocation();
                            }
                            answer = 'C';
                            sendAnswertoServer(thsession, answer);
                        };

                        //get answer (using onclick in js)
                        buttonD.onclick = function () {
                            //if answer requires location then get location before sending answer
                            if (isLocation === true) {
                                getLocation();
                            }
                            answer = 'D';
                            sendAnswertoServer(thsession, answer);
                        };


                    } else if (questionType === "TEXT") {

                        //shows text input and submit button (changing css display to inline)
                        answerString.style.display = "inline";
                        submitString.style.display = "inline";

                        //get answer (using onclick in js)
                        submitString.onclick = function () {
                            //if answer requires location then get location before sending answer
                            if (isLocation === true) {
                                getLocation();
                                if (sendAnswerBool === true) {
                                    answer = answerString.value;
                                    sendAnswertoServer(thsession, answer);
                                    answerString.value = '';
                                }
                            } else {
                                answer = answerString.value;
                                sendAnswertoServer(thsession, answer);
                                answerString.value = '';
                            }
                        };
                    }
                }
                //when treasure hunt ends, brings player to leaderboard
                else if (isComplete) {
                    for (i = 0; i < qrDropdown.length; i++) {
                        qrDropdown[i].style.display = "none";
                    }
                    getLeaderboard(thsession);
                }
            });
    }

    function sendAnswertoServer(thsession, answer) {

        //example link
        //https://codecyprus.org/th/api/answer?session=ag9nfmNvZGVjeXBydXNvcmdyFAsSB1Nlc3Npb24YgICAoMa0gQoM&answer=42
        fetch("https://codecyprus.org/th/api/answer?session=" + thsession + "&answer=" + answer + "")
            .then(response => response.json()) //Parse JSON text to JavaScript object
            .then(jsonObject => {

                //console.log(answer);

                //initializing properties from server
                let ansStatus = jsonObject.status;

                //gets boolean if answer is correct
                let isCorrect = jsonObject.correct;
                //console.log(isCorrect);

                //gets boolean if session has been completed
                let isComplete = jsonObject.completed;

                //gets message from server
                let message = jsonObject.message;

                let messageElement = document.getElementById("message");

                //shows message according to status (OK/ERROR)
                if (ansStatus === "OK") {
                    messageElement.innerText = message;
                    messageElement.style.display = "block";
                    if (isCorrect === true) {
                        getQuestion(thsession);
                    }
                } else if (ansStatus === "ERROR") {
                    let errorMessages = jsonObject.errorMessages;

                    for (let i = 0; i < errorMessages.length; i++) {
                        messageElement.innerText = errorMessages[i];
                    }
                }
            });
    }

    function skipQuestion(thsession) {

        //initializing button element
        let skipButton = document.getElementById("skipButton");

        //makes skipButton visible
        skipButton.style.display = "inline-block";

        let messageElement = document.getElementById("message");

        //if skipButton pressed then skips the current question
        skipButton.onclick = function () {
            //example link
            //https://codecyprus.org/th/api/skip?session=ag9nfmNvZGVjeXBydXNvcmdyFAsSB1Nlc3Npb24YgICAoMa0gQoM
            fetch("https://codecyprus.org/th/api/skip?session=" + thsession)
                .then(response => response.json()) //Parse JSON text to JavaScript object
                .then(jsonObject => {

                    //initializing properties from server
                    let skipStatus = jsonObject.status;

                    //specifies if the user has completed this treasure hunt
                    let isComplete = jsonObject.completed;

                    //gets message from server
                    let message = jsonObject.message;

                    //shows message according to status (OK/ERROR)
                    if (skipStatus === "OK") {
                        messageElement.innerText = message;
                        messageElement.style.display = "block";
                        getQuestion(thsession);
                    }

                });
        }
    }

//function gets player location
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                showPosition(position.coords.latitude, position.coords.longitude);
            });
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    }

//function sends player's location to server
    function showPosition(latitude, longitude) {

        //example link
        //https://codecyprus.org/th/api/location?session=ag9nfmNvZGVjeXBydXNvcmdyFAsSB1Nlc3Npb24YgICAoMa0gQoM&latitude=34.683646&longitude=33.055391
        fetch("https://codecyprus.org/th/api/location?session=" + accessCookie("sessionID") + "&latitude=" + latitude + "&longitude=" + longitude)
            .then(response => response.json()) //Parse JSON text to JavaScript object
            .then(jsonObject => {

                let locStatus = jsonObject.status;

                if (locStatus === "OK") {
                    sendAnswerBool = true;
                }
            });
    }

//function gets leaderboard
    function getLeaderboard(thsession) {
        let limit = 15;

        //example link
        //https://codecyprus.org/th/api/leaderboard?session=ag9nfmNvZGVjeXBydXNvcmdyFAsSB1Nlc3Npb24YgICAoMa0gQoM&sorted&limit=10
        fetch("https://codecyprus.org/th/api/leaderboard?session=" + thsession + "&sorted&limit=" + limit + "")
            .then(response => response.json()) //Parse JSON text to JavaScript object
            .then(jsonObject => {

                //ul element that shows teams score
                let lbScores = document.getElementById("lbScores");
                //gets a element
                let toHome = document.getElementById("toHome");
                //gets scoreboard Title
                let scoreboardTitle = document.getElementById("scoreboardTitle");

                let tableContent = "";

                //shows leaderboard elements
                scoreboardTitle.style.display = "block";
                lbScores.style.display = "block";
                toHome.style.display = "block";

                //gets scores
                let leaderboard = jsonObject.leaderboard;

                //creating list items and adds scores to ul
                for (let i = 0; i < leaderboard.length; i++) {

                    let teamName = leaderboard[i].player;
                    let teamScore = leaderboard[i].score;
                    let teamTime = leaderboard[i].completionTime;

                    let options = { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
                        second: '2-digit' };
                    let date = new Date(teamTime);
                    let formattedDate = date.toLocaleDateString("en-UK", options);

                    tableContent += "<tr>" + "<td>" + teamName + "</td>" +
                        "<td>" + teamScore + "</td>" +
                        "<td>" + formattedDate + "</td>" +
                        "</tr>";
                }

                lbScores.innerHTML += tableContent;

            });
    }

//function gets score of current player
function getScore() {
    let limit = 15;

    //example link
    //https://codecyprus.org/th/api/score?session=ag9nfmNvZGVjeXBydXNvcmdyFAsSB1Nlc3Npb24YgICAoMa0gQoM
    fetch("https://codecyprus.org/th/api/score?session=" + accessCookie("sessionID"))
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {

            //gets scores
            let scoreStatus = jsonObject.status;

            //gets scores
            let scoreAPI = jsonObject.score;

            //gets a element
            let score = document.getElementById("score");

            if(scoreStatus ==="OK") {
                score.innerHTML = "Score: " + scoreAPI;

                //shows score to player
                score.style.display = "inline-block";
            }else{

            }


        });
}

