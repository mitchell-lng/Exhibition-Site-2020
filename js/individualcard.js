function getIDfromURL(){
    var url = $(location).attr('href');
    let pageAndId = url.split("?")[1];

    return [pageAndId.split("-")[0], pageAndId.split("-")[1], pageAndId.split("-")[2]];
}

$(document).ready(function() {
    let values = getIDfromURL();
    let page = values[0];
    let id = values[1];
    let group = values[2];

    let db;

    switch (page) {
        case "bm":
            db = ballotmeasuresJSON[id];
            $("#back").attr("href", "../index.html#bmeasures");
            break;
        case "chem":
            db = chemicalsJSON[id];
            $("#back").attr("href", "../index.html#chem");
            $("#gdocURL").hide();
            break;
    }

    if (db.groups.length == 1) {
        $(".otherPoster").hide();
    }
    else {
        $(".otherPoster").show();
    }

    if (group == 0) {
        $(".otherPoster").attr("href", "individualcard.html?" + page + "-" + id + "-" + "1");
    }
    else if (group == 1) {
        $(".otherPoster").attr("href", "individualcard.html?" + page + "-" + id + "-" + "0");
    }

    $("#title").text(db.title);

    var m = [...db.groups[group].members];
    m.pop();
    
    $("#members").text(m.join(", ") + " and " + db.groups[group].members[db.groups[group].members.length - 1]);
    $("#description").text(db.description);
    $("#gdocURL").attr("href", db.groups[group].pdf);
    $("#posterURL").css("background-image", "url('" + db.groups[group].poster + "')");
    $(".posterLink").attr("href", db.groups[group].poster);
});

