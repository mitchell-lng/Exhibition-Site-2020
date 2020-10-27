function loadCardsLoop(db, url, search) {
    var returnList = [];

    // Dont change this, it'll break the search page
    if (url == 0) {
        url = "templates/individualcard.html?chem-";
    } else {
        url = "templates/individualcard.html?bm-";
    }

    for (let i = 0; i < db.length; i++) {
        var titleText = db[i].title;
        var descriptionText = db[i].description;

        var groups = db[i].groups;

        var article = $("<article></article>");
        var div = $("<div></div>");
        var title = $("<h1></h1>").text(titleText);
        var nameText = "";

        // Iterates through groups and add names to the string
        for (var k = 0; k < groups.length; k++) {
            var members = groups[k].members;

            // Iterates Through Members in a group
            for (var j = 0; j < members.length; j++) {
                if (j != (members.length - 1)) {
                    if ((members.length - 2 == j) && (groups.length - 1 == k)) {
                        nameText = nameText + members[j] + " and ";
                    } else {
                        nameText = nameText + members[j] + ", ";
                    }
                } else {
                    nameText = nameText + members[j];
                }
            }

            if (groups.length - 1 != k && groups.length > 1) {
                nameText = nameText + ", ";
            }
        }

        var skip = false;

        // Search Function
        if (search != null)
        {
            var containsName = !nameText.toLowerCase().includes(search.toLowerCase());
            var containsDescription = !descriptionText.toLowerCase().includes(search.toLowerCase());
            var containsTitle = !titleText.toLowerCase().includes(search.toLowerCase());
            if (containsName && containsDescription && containsTitle) {
                skip = true;
                if (containsName == containsDescription == containsTitle == false) { skip = false; }
            }
        }

        if (skip) continue;

        var names = $("<h2></h2>").text(nameText);
        var description = $("<h3></h3>").text(db[i].description);
        var readmore = $("<a>Read More</a>").attr("href", url + i + "-0");

        div.append(title, names, description);
        article.append(div, readmore);

        returnList.push(article);
    }

    return returnList;
}

function loadCards(name) {
    switch (name) {
        case "chems":
            $("#chemicals").append(loadCardsLoop(chemicalsJSON, 0, null));
            break;
        case "bmeasures":
            $("#ballotmeasures").append(loadCardsLoop(ballotmeasuresJSON, 1, null));
            break;
    }
}

$(document).ready(function() {
    loadCards("chems");
    loadCards("bmeasures");
});