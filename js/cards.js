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

function appendCards(data, id) {
    for (let i = 0; i < data.length; i++) {
        $(id).append(data[i]);
    }
}

function loadCards(name) {
    switch (name) {
        case "chems":
            var len = chemicalsJSON.length;
            var db = chemicalsJSON;
            var thing = "./chemical.html#";
            $("#chemicals").append(loadCardsLoop(db, len, thing));
            appendCards(loadCardsLoop(db, len, thing), "#chemicals");
            break;
        case "bmeasures":
            var len = ballotmeasuresJSON.length;
            var db = ballotmeasuresJSON;
            var thing = "./ballotmeasure.html#"
            appendCards(loadCardsLoop(db, len, thing), "#ballotmeasures");
            break;
    }
}

$(document).ready(function() {
    loadCards("chems");
    loadCards("bmeasures");
});