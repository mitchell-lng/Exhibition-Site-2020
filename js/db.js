x = document.getElementById("dataspot");

for (let i = 0; i < ballotmeasuresJSON.length; i++) {
    var e = document.createElement("p");
    e.textContent = ballotmeasuresJSON[i].title;

    x.append(e);
}