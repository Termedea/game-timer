const _totalTime = "total-time";
const _perPlayerTime = "per-player-time";
var numPlayers,
    timerType,
    gameTime,
    players = [],
    currentPlayerIndex = 0;
var colorOptions = {
    "color-red": "Röd",
    "color-green": "Grön",
    "color-black": "Svart",
    "color-yellow": "Gul",
    "color-purple": "Lila",
    "color-brown": "Brun",
};
var elemPlayers = document.getElementById("numPlayers");
var elemTimer = document.getElementById("timerType");
var elemTime = document.getElementById("time");
var elemPlayerDetails = document.getElementById("playerDetails");
var elemSettingsContent = document.getElementById("settingsContent");
var elemGameContent = document.getElementById("gameContent");
var elemBtnContainer = document.getElementById("btnContainer");
var elemMessage = document.getElementById("message");
var elemCurrentPlayerName = document.getElementById("currentPlayerName");
var elemTimeLeft = document.getElementById("timeLeft");

var btnSaveSettings = document.getElementById("saveSettings");
var btnStartGame = document.getElementById("startGame");
var btnNextPlayer = document.getElementById("nextPlayer");

btnSaveSettings.addEventListener("click", settingsSaved, false);
btnStartGame.addEventListener("click", initGame, false);
document.addEventListener("keypress", function (e) {
    if (e.keyCode == 13) {
        settingsSaved(e);
    }
});

function settingsSaved(e) {
    e.preventDefault();

    if (
        elemPlayers.value == "" ||
        elemTimer.value == "" ||
        elemTime.value == ""
    ) {
        elemMessage.classList.remove("hidden");
        elemMessage.innerHTML = "<p>Fyll i alla fält.</p>";

        return false;
    }
    elemMessage.classList.add("hidden");
    numPlayers = elemPlayers.options[elemPlayers.selectedIndex].value;
    renderPlayerSettings(numPlayers);
    elemBtnContainer.classList.remove("hidden");
}

function renderPlayerSettings(numPlayers) {
    elemPlayerDetails.innerHTML = "";

    for (var i = 1; i <= numPlayers; i++) {
        var elemPlayerDiv = document.createElement("div");
        var elemFormLabel = document.createElement("div");
        var elemPlayerTitle = document.createElement("h2");
        var elemPlayerNameLabel = document.createElement("label");
        var elemPlayerColorLabel = document.createElement("label");
        var elemPlayerName = document.createElement("input");
        var elemPlayerColor = document.createElement("select");

        elemPlayerDiv.classList.add("player-div");

        elemPlayerTitle.innerHTML = "Spelare " + i;
        elemFormLabel.classList.add("form-label-pair");
        elemPlayerNameLabel.htmlFor = "player-" + i + "-name";
        elemPlayerNameLabel.innerHTML = "Namn:";
        elemPlayerName.name = "player-" + i + "-name";
        elemPlayerName.id = "player" + i + "Name";
        elemPlayerName.setAttribute("required", "required");
        elemPlayerColorLabel.htmlFor = "player-" + i + "-color";
        elemPlayerColorLabel.innerHTML = "Spelarfärg:";
        elemPlayerColor.appendChild(document.createElement("option"));
        elemPlayerColor.name = "player-" + i + "-color";
        elemPlayerColor.id = "player" + i + "Color";
        elemPlayerColor.setAttribute("required", "required");

        for (var key in colorOptions) {
            var option = document.createElement("option");
            option.name = key;
            option.value = key;
            option.text = colorOptions[key];
            elemPlayerColor.appendChild(option);
        }

        elemPlayerDiv.appendChild(elemPlayerTitle);
        elemPlayerDiv.appendChild(elemFormLabel);

        elemFormLabel.appendChild(elemPlayerNameLabel);
        elemFormLabel.appendChild(elemPlayerName);
        elemFormLabel.appendChild(elemPlayerColorLabel);
        elemFormLabel.appendChild(elemPlayerColor);
        elemPlayerDetails.appendChild(elemPlayerDiv);
    }
}

function initGame(e) {
    e.preventDefault();

    const inputIndex = 1;
    const colorIndex = 3;
    var playerData;
    var playerName;
    var playerColor;
    var playerTime;

    if (elemTime.value != "") {
        gameTime =
            elemTimer[elemTimer.selectedIndex].value == _totalTime
                ? elemTime.value
                : 0;
        playerTime =
            elemTimer[elemTimer.selectedIndex].value == _perPlayerTime
                ? elemTime.value
                : -1;
    }
    console.log("game: " + gameTime + " player: " + playerTime);

    for (var i = 0; i < numPlayers; i++) {
        playerData = elemPlayerDetails.childNodes[i].getElementsByClassName(
            "form-label-pair"
        );
        for (var j = 0; j < playerData.length; j++) {
            playerName = playerData[j].childNodes[inputIndex].value;
            playerColor = playerData[j].childNodes[colorIndex].value;

            if (playerName == "" || playerColor == "") {
                elemMessage.classList.remove("hidden");
                elemMessage.innerHTML = "<p>Fyll i alla fält.</p>";

                return false;
            }

            elemMessage.classList.add("hidden");
            players[i] = {
                name: playerName,
                color: playerColor,
                timeLeft: playerTime,
            };

            console.log(players);
        }
    }

    elemSettingsContent.classList.add("hidden");
    elemGameContent.classList.remove("hidden");
    btnNextPlayer.addEventListener("click", nextPlayer);
    run();
}
function run() {
    console.log("cpi " + currentPlayerIndex);
    currentPlayer = players[currentPlayerIndex];
    elemCurrentPlayerName.innerHTML = currentPlayer.name;

    elemGameContent.className = currentPlayer.color;
}

function nextPlayer() {
    if (currentPlayerIndex < numPlayers - 1) {
        currentPlayerIndex++;
    } else {
        currentPlayerIndex = 0;
    }

    run();
}
