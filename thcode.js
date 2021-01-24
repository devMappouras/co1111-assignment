
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
                let  id = treasureHunts[i].uuid;

                let listItem = document.createElement("li");
                let treasureHuntName =  treasureHunts[i].name;
                //listItem.innerHTML = treasureHuntName;

                listItem.innerHTML = "<a href='https://codecyprus.org/th/api/start?player="+ playersName +"&app=team3TreasureHunt&treasure-hunt-id="+id+"'>" + treasureHuntName + "</a>";

                thList.appendChild(listItem);
            }
        });
}