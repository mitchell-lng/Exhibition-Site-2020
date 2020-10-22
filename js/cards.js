function loadCardsLoop(db, url, search) {
    var returnList = [];
    var url = "../templates/individualcard.html?"

    if (url == 0) {
        url = url + "chem-";
    } else if (url == 1) {
        url = url + "bm-";
    }

    for (let i = 0; i < db.length; i++) {
        var groups = db[i].groups;

        var article = $("<article></article>");
        var div =$("<div></div>");
        var title = $("<h1></h1>").text(db[i].title);
        var nameText = "";

        // Iterates through groups and add names to the string
        for (var k = 0; k < groups.length; k++) {
            var members = groups[k].members;

            // Iterates Through Members in a group
            for (var j = 0; j < members.length; j++) {
                if (j != (members.length - 1)) {
                    if ((members.length - 2 == j) && (groups.length - 1 == k)) {
                        nameText = nameText + members[j] + ", and ";
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

        // Search Function
        if (search != null)
        {
            if (!nameText.toLowerCase().includes(search.toLowerCase())) {
                continue;
            }
        }

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