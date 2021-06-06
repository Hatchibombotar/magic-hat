var theHat = []
var hatObject = {}

function addName() {
    var text = document.getElementById("text").value
    var number = document.getElementById("number").value
    
    hatObject[text] = number

    repeat(function () {
        theHat.push(text)

        var hatText = document.createElement("p")
        hatText.appendChild(document.createTextNode(text))
        hatText.setAttribute("class", "nomarginpadding")
        document.getElementById("theHat").appendChild(hatText)
    }, number);
}

function repeat(func, times) {
    func();
    times && --times && repeat(func, times);
}

function openHat() {
    originalHat = theHat
    var hidingElements = document.getElementsByClassName("hides")
    for (element of hidingElements) {
        element.classList.add("hidden")
    }
    document.getElementById("continue-button").classList.remove("hidden")
}

function showNextElement() {
    if (theHat.length != 0) {
        document.getElementById("element-text").classList.remove("hidden")
        document.getElementById("next-button").classList.remove("hidden")
        document.getElementById("continue-button").classList.add("hidden")

        var randomIndex = Math.floor(Math.random() * theHat.length);
        document.getElementById("element-text").innerHTML = theHat.splice(randomIndex, 1);
    } else {
        var hatKeys = Object.keys(hatObject);

        var url = new URL(window.location.href);
        var search_params = url.searchParams;
        for (i of hatKeys) {
            search_params.set(i, hatObject[i]);
        }
        url.search = search_params.toString();
        var new_url = url.toString();
        window.location.href = new_url
    }
}

function next() {
    document.getElementById("element-text").classList.add("hidden")

    document.getElementById("next-button").classList.add("hidden")
    document.getElementById("continue-button").classList.remove("hidden")
}

window.onload = function() {
    var urlHatObject = getUrlVars()
    var hatKeys = Object.keys(urlHatObject);
    for (i of hatKeys) {
        repeat(function () {
            theHat.push(i)
    
            var hatText = document.createElement("p")
            hatText.appendChild(document.createTextNode(i))
            hatText.setAttribute("class", "nomarginpadding")
            document.getElementById("theHat").appendChild(hatText)
        }, urlHatObject[i]);
    }
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}