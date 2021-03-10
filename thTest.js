//calls treasure hunts from API
//creates a list with all treasure hunts
function listTest() {

    let listTestOutput = document.getElementById("listTestOutput");
    let thNum = document.getElementById("thNum");
    listTestOutput.style.display="block";

    //if answer requires location then get location before sending answer
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

                thList.innerHTML ="<div id='liID'>" + "<p>" +thName+ "</p>"+ "<p>" +thDesc+ "</p>" + "<p>" +thOwnerEmail+ "</p>" + "<p>" +thSecretCode+ "</p>" + "<p>" +thSalt+ "</p>" + "<p>" +thVisibility+ "</p>" + "<p>" +thStartsOn+ "</p>" + "<p>" +thEndsOn+ "</p>" + "<p>" +thMaxDuration+ "</p>" + "<p>" +thShuffled+ "</p>" + "<p>" +thAuthentication+ "</p>" + "<p>" +thEmailResults+ "</p>" + "<p>" +thHasPrize+ "</p>" + "</div><br>";

                listTestOutput.appendChild(thList);
            }
        });
    }

//calls treasure hunts from API
//creates a list with all treasure hunts
function listClear() {

    let listTestOutput = document.getElementById("listTestOutput");
    listTestOutput.style.display="none";
}