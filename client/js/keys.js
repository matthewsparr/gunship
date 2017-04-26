/* global $ */
var allNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

var allScales = new Array ();

var selectedNotes = new Array ();

var matchingScales = new Array ();


function getScales() {
    for (var i = 0, len = allNotes.length; i < len; i++) {
        allScales.push({Scale:(allNotes[i] + " Major"), Notes:majorScale(i)});
        allScales.push({Scale:(allNotes[i] + " Minor"), Notes:minorScale(i)});
    }
    return allScales;
}



function majorScale(note) {
    var scale = new Array();
    var i = 0;
    var currentNote = note;
    var nextNote = 0;
    scale.push(" " + allNotes[note]);
    while (i < 6) {
        if (i == 2) {
            nextNote = currentNote + 1;
        } else {
            nextNote = currentNote + 2;
        }
        if (nextNote > 11) {
            nextNote = nextNote - 12;
        }
        currentNote = nextNote;
        scale.push(" " + allNotes[currentNote]);
        i++;
    }
    return scale;
}

function minorScale(note) {
    var scale = new Array();
    var i = 0;
    var currentNote = note;
    var nextNote = 0;
    scale.push(" " + allNotes[note]);
    while (i < 6) {
        if (i == 1 || i == 4) {
            nextNote = currentNote + 1;
        } else {
            nextNote = currentNote + 2;
        }
        if (nextNote > 11) {
            nextNote = nextNote - 12;
        }
        currentNote = nextNote;
        scale.push(" " + allNotes[currentNote]);
        i++;
    }
    return scale;
}




function findScales() {
    var matchingScales = new Array();
    var matchingScalesNotes = new Array();
    console.log(allScales.length);
    for (var i = 0, len = allScales.length; i < len; i++) {
        var hasNote = 0;
        for (var z = 0, lenz = selectedNotes.length; z < lenz; z++) {
            if (allScales[i].Notes.indexOf(selectedNotes[z])>= 0) {
                hasNote ++;
                console.log(hasNote);
            }
        }
        if (hasNote == selectedNotes.length) {
            matchingScales.push(allScales[i].Scale);
            matchingScalesNotes.push(allScales[i].Notes);
        }
    }
 
    return [matchingScales, matchingScalesNotes];
}


function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}


getScales();


for (var i = 0, len = allNotes.length; i < len; i++) {
document.getElementsByClassName(allNotes[i]).item(0).onclick = function() {
    if (this.style.backgroundColor == "yellow") {
        if (this.classList.contains("black")) {
            this.style.backgroundColor = "black";
        } else {
            this.style.backgroundColor = "white";
        }
        selectedNotes.splice(selectedNotes.indexOf(this.classList.item(1)), 1);
    } else {
        this.style.backgroundColor = "yellow";
        selectedNotes.push(" " + this.classList.item(1).toUpperCase());
    }
    // document.getElementByClassName(allNotes[i]).item(0).style.backgroundColor = "yellow";
}
};

 $('#findMatching').click(function() {
         $(".set").animate({marginRight:"700px"});
            });


document.getElementById("findMatching").onclick = function() {
    console.log(findScales());
    var scalesTable = document.getElementById("scalesTable");
    scalesTable.innerHTML = "";
    var scales = findScales();
    console.log(scales)
    for (var i = 0, len = scales[0].length; i < len; i++) {
        var row = scalesTable.insertRow(i);
        var scaleCell = row.insertCell(0);
        var notesCell = row.insertCell(1);

        scaleCell.innerHTML = scales[0][i];
        notesCell.innerHTML = scales[1][i];
    }
}

