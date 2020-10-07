function loadCardsLoop(db, len, thing) {
    var returnList = [];

    for (let i = 0; i < len; i++) {
        var article = $("<article></article>");
        var div =$("<div></div>");
        var title = $("<h1></h1>").text(db[i].title);
        var names = $("<h2></h2>").text(db[i].members);
        var description = $("<h3></h3>").text(db[i].description);
        var readmore = $("<a>Read More</a>").attr("href", thing + i)

        div.append(title, names, description);
        article.append(div, readmore);

        returnList.push(article);
    }

    return returnList;
}

function loadCards(name) {
    switch (name) {
        case "chems":
            var thing = "../templates/chemical.html#";
            $("#chemicals").append(loadCardsLoop(chemicalsJSON, chemicalsJSON.length, thing))
            break;
        case "bmeasures":
            var thing = "../templates/ballotmeasure.html#"
            $("#ballotmeasures").append(loadCardsLoop(ballotmeasuresJSON, ballotmeasuresJSON.length, thing));
            break;
    }
}

$(document).ready(function() {
    loadCards("chems");
    loadCards("bmeasures");
});