/* #region  Base */
const _totalTime = "total-time";
const _perPlayerTime = "per-player-time";

var colorOptions = {
    "color-red": "Röd",
    "color-green": "Grön",
    "color-black": "Svart",
    "color-yellow": "Gul",
    "color-purple": "Lila",
    "color-brown": "Brun",
};
var elemMessage = document.getElementById("message");
/* #endregion */

/* #region  Game params */
var numPlayers,
    gameTimer = { timerType: "", time: 0 },
    players = [],
    currentPlayerIndex = 0,
    intervalId;
/* #endregion */

/* #region  Elements & listeners for settings */
var elemNumPlayers = document.getElementById("numPlayers");
var elemTimerType = document.getElementById("timerType");
var elemTime = document.getElementById("time");
var elemPlayerDetails = document.getElementById("playerDetails");
var elemSettingsContent = document.getElementById("settingsContent");
var elemGameContent = document.getElementById("gameContent");
var elemBtnContainer = document.getElementById("btnContainer");

var btnSaveSettings = document.getElementById("saveSettings");
btnSaveSettings.addEventListener("click", settingsSaved, false);
var btnStartGame = document.getElementById("startGame");
btnStartGame.addEventListener("click", initGame, false);
/* #endregion */

/* #region Elements & listeners for game */
var elemCurrentPlayerName = document.getElementById("currentPlayerName");
var elemTimeLeft = document.getElementById("timeLeft");
var btnReset = document.getElementById("reset");
btnReset.addEventListener("click", function () {
    gameTime = 0;
});
var btnExit = document.getElementById("exit");
btnExit.addEventListener("click", exitGame);

/* #endregion */

document.addEventListener("keypress", function (e) {
    if (e.keyCode == 13) {
        settingsSaved(e);
    }
});

function settingsSaved(e) {
    e.preventDefault();
    if (validateBaseSettings()) {
        elemMessage.classList.add("hidden");
        numPlayers = elemNumPlayers.options[elemNumPlayers.selectedIndex].value;
        renderPlayerSettings(numPlayers);
        elemBtnContainer.classList.remove("hidden");
    }
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
            option.value = key;
            option.text = colorOptions[key];
            elemPlayerColor.appendChild(option);
        }

        elemPlayerDiv.appendChild(elemPlayerTitle);
        elemPlayerDiv.appendChild(elemFormLabel);
        btnStartGame.classList.remove("hidden");
        elemFormLabel.appendChild(elemPlayerNameLabel);
        elemFormLabel.appendChild(elemPlayerName);
        elemFormLabel.appendChild(elemPlayerColorLabel);
        elemFormLabel.appendChild(elemPlayerColor);
        elemPlayerDetails.appendChild(elemPlayerDiv);
    }
}

function initGame(e) {
    e.preventDefault();
    if (validateBaseSettings()) {
        elemSettingsContent.classList.add("hidden");
        elemGameContent.classList.remove("hidden");
        elemGameContent.addEventListener("click", nextPlayer);

        play();
    }
}
function setUpTimer() {
    if (
        elemTime.value != "" &&
        elemTimerType[elemTimerType.selectedIndex].value != ""
    ) {
        gameTimer.timerType = elemTimerType[elemTimerType.selectedIndex].value;
        gameTimer.time = elemTime.value * 60;
    }
    console.log(gameTimer.time);
    console.log(gameTimer.timerType);
}

function setUpPlayers() {
    const inputIndex = 1;
    const colorIndex = 3;
    var playerData;
    var playerName;
    var playerColor;
    for (var i = 0; i < numPlayers; i++) {
        playerData = elemPlayerDetails.childNodes[i].getElementsByClassName(
            "form-label-pair"
        );
        for (var j = 0; j < playerData.length; j++) {
            /* playerName = playerData[j].childNodes[inputIndex].value;
            playerColor = playerData[j].childNodes[colorIndex].value; */
            playerName = "Spelare " + (i + 1);
            playerColor = Object.keys(colorOptions)[i];

            if (playerName == "" || playerColor == "") {
                elemMessage.classList.remove("hidden");
                elemMessage.innerHTML = "<p>Fyll i alla fält.</p>";

                return false;
            }

            elemMessage.classList.add("hidden");

            players[i] = {
                name: playerName,
                color: playerColor,
                timeLeft: 0,
            };
        }
    }
}

function startTimer() {
    /* Sätt rätt timer, starta spelet */
}
function play() {
    setUpTimer();
    setUpPlayers();

    currentPlayer = players[currentPlayerIndex];
    elemCurrentPlayerName.innerHTML = currentPlayer.name;
    elemGameContent.className = currentPlayer.color;

    intervalId = setInterval(updateTime, 100);
    //startTimer();
}
function updateTime() {}

function nextPlayer() {
    if (currentPlayerIndex < numPlayers - 1) {
        currentPlayerIndex++;
    } else {
        currentPlayerIndex = 0;
    }

    play();
}
function exitGame() {
    numPlayers = 0;
    gameTime = 0;
    players = [];
    currentPlayerIndex = 0;

    elemNumPlayers.value = 0;
    elemTimerType.value = 0;
    elemPlayerDetails.innerHTML = "";
    elemTime.value = "";
    elemSettingsContent.classList.remove("hidden");
    elemGameContent.classList.add("hidden");
    btnStartGame.classList.add("hidden");
}

function validateBaseSettings() {
    if (
        elemNumPlayers.value == "" ||
        elemTimerType.value == "" ||
        elemTime.value == ""
    ) {
        elemMessage.classList.remove("hidden");
        elemMessage.innerHTML = "<p>Fyll i alla fält.</p>";

        return false;
    }
    return true;
}
