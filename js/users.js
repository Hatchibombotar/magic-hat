let theHat = []
let players = []
let Cplayers = []
let currentPlayer = 0

function test() {
    theHat.push({
        name: "role",
        number: 2,
        totalTokens: 0, // total token amount
        unitChance: 0 // the percentage per avaliable token
    })

    theHat.push({
        name: "role1",
        number: 1,
        totalTokens: 0, // total token amount
        unitChance: 0 // the percentage per avaliable token
    })

    players.push({
        name: "joe",
        tokens: {},
        percent_chances: {},
        selected: "",
        id: players.length
    })

    players.push({
        name: "jeff",
        tokens: {},
        percent_chances: {},
        selected: "",
        id: players.length
    })

    players.push({
        name: "bob",
        tokens: {},
        percent_chances: {},
        selected: "",
        id: players.length
    })
}

function addName() {
    let name = document.getElementById("text").value
    let number = document.getElementById("number").value

    theHat.push({
        name,
        number,
        totalTokens: 0, // total token amount
        unitChance: 0 // the percentage per avaliable token
    })

    let hatText = document.createElement("p")
    hatText.appendChild(document.createTextNode(name + " x" + number))
    hatText.setAttribute("class", "nomarginpadding")
    document.getElementById("theHat").appendChild(hatText)
}

function openHat() {
    currentPlayer = 0
    Cplayers = []
    for (const element of theHat) {
        element.totalTokens = 0
        for (const player of players) {
            if (!player.tokens[element.name]) player.tokens[element.name] = 1
            element.totalTokens += player.tokens[element.name]
        }
        element.unitChance = 1 / element.totalTokens
    }
    for (element of theHat) {
        for (i = 0; i < element.number; i++) {
            const selectedloc = Math.random()
            let min = 0

            element.unitChance = 1 / element.totalTokens
            for (const player of players) {
                player.percent_chances[element.name] = element.unitChance * player.tokens[element.name]
            }

            for (playerindex in players) {
                const player = players[playerindex]
                if (min <= selectedloc && selectedloc <= (player.percent_chances[element.name] + min)) {
                    player.selected = element.name
                    removedElements = players.splice(playerindex, 1)

                    player.tokens[element.name] = 1

                    Cplayers.push(removedElements[0])

                    for (const element of theHat) {
                        element.totalTokens -= player.tokens[element.name]
                    }
                } else {
                    player.tokens[element.name] += 1
                }
                min += player.percent_chances[element.name]
            }
        }
    }

    players = Cplayers.sort(sortByProperty("id"))

    document.getElementById("config").classList.add("hidden")
    document.getElementById("continue-button").classList.remove("hidden")
    document.getElementById("player-text").innerHTML = `Player: ${players[currentPlayer].name}`
}


function showNextElement() {
    document.getElementById("element-text").classList.remove("hidden")
    document.getElementById("next-button").classList.remove("hidden")
    document.getElementById("continue-button").classList.add("hidden")

    document.getElementById("element-text").innerHTML = players[currentPlayer].selected;
    currentPlayer += 1
}

function next() {
    document.getElementById("element-text").classList.add("hidden")
    document.getElementById("next-button").classList.add("hidden")

    if (currentPlayer < players.length) {
        document.getElementById("continue-button").classList.remove("hidden")
        document.getElementById("player-text").innerHTML = `Player: ${players[currentPlayer].name}`
    } else {
        document.getElementById("continue-button").classList.add("hidden")
        document.getElementById("config").classList.remove("hidden")
        document.getElementById("player-text").innerHTML = ``
    }
}

function addPlayer() {
    let text = document.getElementById("playerName").value
    players.push({
        id: players.length,
        name: text,
        tokens: {},
        percent_chances: {},
        selected: ""
    })

    let playerText = document.createElement("p")
    playerText.appendChild(document.createTextNode(text))
    playerText.setAttribute("class", "nomarginpadding")
    document.getElementById("playerContainer").appendChild(playerText)
}

function sortByProperty(property) {
    return function (a, b) {
        return a[property] > b[property] ? 1 : a[property] < b[property] ? -1 : 0
    }
}

