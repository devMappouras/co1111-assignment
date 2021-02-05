
//calls treasure hunts from API
//creates a list with all treasure hunts
function getTreasureHunts() {

    fetch("https://codecyprus.org/th/api/list")
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {

            let playersName=prompt("Enter Your Name:", "");

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

//function that starts the th game
function getStartData() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const playersName = urlParams.get('player')
    let treasureHuntID = urlParams.get('treasure-hunt-id')

    console.log(playersName);
    console.log(treasureHuntID);

    //example link
    //https://codecyprus.org/th/api/start?player=Homer&app=simpsons-app&treasure-hunt-id=ag9nfmNvZGVjeXBydXNvcmdyGQsSDFRyZWFzdXJlSHVudBiAgICAvKGCCgw
    fetch("https://codecyprus.org/th/api/start?player="+ playersName +"&app=team3TreasureHunt&treasure-hunt-id="+treasureHuntID+"")
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {

            let thstatus = jsonObject.status;
            let thsession = jsonObject.session;
            let totalQuestions = jsonObject.numOfQuestions;

            if(thstatus==="OK") {
                //gets questions from server and shows them to the user
                getQuestion(thsession);

            } else {
                document.write(jsonObject.errorMessages);
            }

            console.log(thsession);
            console.log(totalQuestions);

        });
}

//function that calls the questions from server
function getQuestion(thsession) {
    //let questionNo = 0;

    //example link
    //https://codecyprus.org/th/api/question?session=ag9nfmNvZGVjeXBydXNvcmdyFAsSB1Nlc3Npb24YgICAoMa0gQoM
    fetch("https://codecyprus.org/th/api/question?session="+ thsession +"")
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {

            //initializing properties from server
            let qStatus = jsonObject.status;
            let totalQuestions = jsonObject.numOfQuestions;

            //gets the number of current question
            let questionNo = jsonObject.currentQuestionIndex;

            //calculates the final question
            let finalQuestion = jsonObject.numOfQuestions;
            finalQuestion = finalQuestion - 1;

            //gets question from server
            let questionText = jsonObject.questionText;

            //gets what type is the question
            let questionType = jsonObject.questionType;
            console.log(questionType)

            //boolean variables for questions
            let isSkip = jsonObject.canBeSkipped;
            let isComplete = jsonObject.completed;

            //get element in html to print question
            let question = document.getElementById("question");

            //exports question to player
            question.innerHTML = questionText;


            //functionality of HTML elements

            //text elements
            let submitString = document.getElementById("submitString");
            let answerString = document.getElementById("answerString");

            //number elements
            let submitNo = document.getElementById("submitNo");
            let answerNo = document.getElementById("answerNo");

            //boolean elements
            let boolF = document.getElementById("false");
            let boolT = document.getElementById("true");

            //checks what type is each question and acts accordingly
            if (questionType==="BOOLEAN") {
                //shows boolean submit buttons (changing css display to inline)
                boolT.style.display = "inline";
                boolF.style.display = "inline";


            }
            else if (questionType==="INTEGER") {
                //shows number input and submit button (changing css display to inline)
                answerNo.style.display = "inline";
                submitNo.style.display = "inline";


            }
            else if (questionType==="NUMERIC") {
                //shows number input and submit button (changing css display to inline)
                answerNo.style.display = "inline";
                submitNo.style.display = "inline";

            }
            else if (questionType==="MCQ") {
                //shows 4 boolean submit buttons (changing css display to inline)



            }
            else if (questionType==="TEXT") {
                //shows text input and submit button (changing css display to inline)
                answerString.style.display = "inline";
                submitString.style.display = "inline";

            }

            let message = document.getElementById("message");

        });
}

function sendAnswer(thsession, answer){

    //example link
    //https://codecyprus.org/th/api/answer?session=ag9nfmNvZGVjeXBydXNvcmdyFAsSB1Nlc3Npb24YgICAoMa0gQoM&answer=42
    fetch("https://codecyprus.org/th/api/answer?session="+ thsession +"&answer="+ answer +"")
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {





        });
}
