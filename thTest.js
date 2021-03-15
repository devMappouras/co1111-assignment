//calls treasure hunts from API
//creates a list with all treasure hunts
function listTest() {

    let listTestOutput = document.getElementById("listTestOutput");
    let thNum = document.getElementById("thNum");
    listTestOutput.style.display="block";


    let answer = thNum.value;

    fetch("https://codecyprus.org/th/test-api/list?number-of-ths=" + answer)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {

            //ul element that shows treasure hunts list

            let treasureHunts = jsonObject.treasureHunts;

            for(let i=0; i < treasureHunts.length; i++) {

                let thList = document.createElement("li");
                let thName =  treasureHunts[i].name;
                let thDesc =  treasureHunts[i].description;
                let treasureHuntID =  treasureHunts[i].uuid;

                let thOwnerEmail=treasureHunts[i].ownerEmail;
                let thSecretCode=treasureHunts[i].secretCode;
                let thSalt = treasureHunts[i].salt;
                let thVisibility = treasureHunts[i].visibility;
                let thStartsOn = treasureHunts[i].startsOn;
                let thEndsOn = treasureHunts[i].endsOn;
                let thMaxDuration = treasureHunts[i].maxDuration;
                let thShuffled = treasureHunts[i].shuffled;
                let thAuthentication = treasureHunts[i].requiresAuthentication;
                let thEmailResults = treasureHunts[i].emailResults;
                let thHasPrize = treasureHunts[i].hasPrize;

                thList.innerHTML ="<div class='liClass'>" + "<p>" +thName+ "</p>"+ "<p>" +thDesc+ "</p>" + "<p>" +thOwnerEmail+ "</p>" + "<p>" +thSecretCode+ "</p>" + "<p>" +thSalt+ "</p>" + "<p>" +thVisibility+ "</p>" + "<p>" +thStartsOn+ "</p>" + "<p>" +thEndsOn+ "</p>" + "<p>" +thMaxDuration+ "</p>" + "<p>" +thShuffled+ "</p>" + "<p>" +thAuthentication+ "</p>" + "<p>" +thEmailResults+ "</p>" + "<p>" +thHasPrize+ "</p>" + "<br>"+ "</div>";

                listTestOutput.appendChild(thList);
            }
        });
    }


function listClear() {

    let listTestOutput = document.getElementById("listTestOutput");
    listTestOutput.style.display="none";
    /*class is used than ID because the function listTest() can create more than one li-item,
     therefore an ID could not be used since it specifies a unique ID for an element*/
    //returns all elements by className as HTML collection object, each object has an index(starts at 0)
    let testDelete = document.getElementsByClassName("liClass");
    //while is used to delete the objects one by one until the length of the collection is 0
    while(testDelete.length>0){
        testDelete[0].parentNode.removeChild(testDelete[0]);
    }
  //  testDelete.parentNode.removeChild(testDelete);
}

function scoreTest(){

    let scoreTestOutput = document.getElementById("scoreTestOutput");
    let thScoreInput = document.getElementById("thScoreInput");
    scoreTestOutput.style.display="block";

    let answer = thScoreInput.value;

fetch("https://codecyprus.org/th/test-api/score?score=" + answer)
    .then(response => response.json()) //Parse JSON text to JavaScript object
    .then(jsonObject => {

       //let treasureHunts = jsonObject.treasureHunts;
       let thScoreTest = document.createElement("li");
       let thCompleted =  jsonObject.completed;
       let thFinished =  jsonObject.finished;
      // let treasureHuntID =  treasureHunts[i].uuid;

       let thPlayer=jsonObject.player;
       let thScore=jsonObject.score;
       let thHasPrize = jsonObject.hasPrize;
       let thStatus = jsonObject.status;



       thScoreTest.innerHTML ="<div id='liID'>" + "<p>" +thCompleted+ "</p>"+ "<p>" +thFinished+ "</p>" + "<p>" +thPlayer+ "</p>" + "<p>" +thScore+ "</p>" + "<p>" +thHasPrize+ "</p>" + "<p>" +thStatus+ "</p>" + "<br>"+ "</div>";

       scoreTestOutput.appendChild(thScoreTest);

    });
}

function scoreClear(){
   let scoreTestOutput = document.getElementById("scoreTestOutput");
   //removeChild method is used to delete children (liID) of a parent (e.g scoreTestOutput)
    //property parentNode is used to return the parent-node of the element
   let testDelete = document.getElementById("liID");
    testDelete.parentNode.removeChild(testDelete);

   scoreTestOutput.style.display="none";


}