function getIDfromURL(){
    var url = $(location).attr('href');
    let pageAndId = url.split("#")[1];

    return [pageAndId.split("-")[0], pageAndId.split("-")[1]];
}

$(document).ready(function() {
    let values = getIDfromURL();
    let page = values[0];
    let id = values[1];

    let db;

    switch (page) {
        case "bm":
            db = ballotmeasuresJSON[id];
            $("#back").attr("href", "../index.html#bmeasures");
            break;
        case "chem":
            db = chemicalsJSON[id];
            $("#back").attr("href", "../index.html#chem");
            break;
    }

    $("#title").text(db.title);
    $("#members").text(db.members);
    $("#description").text(db.description);
    $("#gdocURL").attr("href", db.pdf);
    $("#posterURL").css("background-image", "url('" + db.poster + "')");
});