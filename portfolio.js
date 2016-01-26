var posX = 594;
var posX1 = 394;
var posY;
var w;
var h;
var cScalar = 0.7;
var c2Scalar = 1;
var cycleCheck = 0;
var spacing = 175;
var vertSelect = 0;
var horzSelect = 1;
var pArray = [];
var Canvas;
var img;
var c;

window.onresize = function() {
    history.go(0);
}
;

function preload(){
    img = loadImage('ukraine-landscape.jpg');
}
function setup() {
    img.loadPixels();
    c = img.get(img.width/2, img.height/2);
    w = windowWidth;
    h = windowHeight;
    Canvas = createCanvas(w, h);
    posY = h / 2.3;
    //fullscreen(true);
    
    //Prototyping data object for sub page listings - atangeman20151228
    
    
    var p1 = {
        name: "Recent",
        alias: "Re",
        size: 90,
        posX: (w / 2) - spacing,
        subPg: {
            subName: ["Thesis", "SDE Source Repair", "Crime Viewer"],
            subUrl: "www.contacts.com"
        },
        color: "blue"
    };
    var p2 = {
        name: "Home",
        alias: "H",
        size: 90,
        posX: w / 2,
        subPg: {
            subName: ["About Me", "Contact Me", "CV/Resume"],
            subUrl: "www.contacts.com"
        },
        color: "red"
    };
    var p3 = {
        name: "Programming",
        alias: "Pr",
        size: 90,
        posX: (w / 2) + spacing,
        subPg: {
            subName: ["SDE Source Repair", "Crime Viewer", "Python Geocoder", "Python Encryption", "Who's on First?"],
            subUrl: "www.contacts.com"
        },
        color: "green"
    };
    var p4 = {
        name: "GIS",
        alias: "Gs",
        size: 90,
        posX: (w / 2) + spacing * 2,
        subPg: {
            subName: ["Location Filter", "FRC Map", "Cluster/Outlier", "Getis-Cluster", "Land Value", "IG Planning", "SNAP-ED", "Noise Buffer"],
            subUrl: "www.contacts.com"
        },
        color: "white"
    };
    var p5 = {
        name: "Art",
        alias: "Ca",
        size: 90,
        posX: (w / 2) + spacing * 3,
        subPg: {
            subName: ["Washington D.C. Print", "Mt. Rainier", "NYC - Race & Ethnicity", "Seattle Liquifaction", "Thom York - Radiohead"],
            subUrl: "www.contacts.com"
        },
        color: "white"
    };
    pArray.push(p1);
    pArray.push(p2);
    pArray.push(p3);
    pArray.push(p4);
    pArray.push(p5);
}

function draw() {
    //background(111, 152, 150);
    textFont("Helvetica");
      background(c);
      image(img, 0, 0, width, height);
    drawGrid();
    fill(83, 76, 100, 100);
    rect(0, 0, w, 30);
    //     rect(0, 0, w, h/1.5);
    fill(239, 216, 207, 200);
    noStroke();
    textSize(20);
    textAlign(CENTER);
    text("Andrew G. Tangeman      |      M.S. GIScience      |      Portfolio of Work", width / 2, 20);
    //		var fs = fullscreen();
    nodeDisplay(pArray);
}

function mousePressed() {
    
}
//-----KEY ACTIONS----!

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

function keyPressed() {
    if (keyCode === LEFT_ARROW && horzSelect > 0) {
        horzSelect -= 1;
        vertSelect = 0;
        for (var j = 0; j < pArray.length; j++) {
            pArray[j].posX += spacing;
        }
    } else if (keyCode === RIGHT_ARROW && horzSelect < 4) {
        vertSelect = 0;
        horzSelect += 1;
        for (var k = 0; k < pArray.length; k++) {
            pArray[k].posX -= spacing;
        }
    }
    if (keyCode === UP_ARROW && vertSelect > 0) {
        vertSelect -= 1;
    }
    if (keyCode === DOWN_ARROW && vertSelect < pArray[horzSelect].subPg.subName.length) {
        vertSelect += 1;
    }

    if (keyCode === ENTER) {
        openDialog();
    }
}

function drawGrid() {
    fill(83, 76, 100, 100);
    for (var c = 120; c < 2500; c += 20) {
        stroke(16, 32, 125, 15);
        noFill();
        ellipse(w / 2, posY, c * (c / 100), c);
        ellipse(w / 2, posY, c, c * (c / 100));
    }
}

function nodeDisplay(pArray) {
    textFont("Courier New");
    var radius;
    var selectedCol = (pArray[horzSelect]);
    noFill();
    stroke(255);
    var str = String(selectedCol.name);
    rectMode(CENTER);
    textSize(70);
    noStroke();
    for (var i = 0; i < pArray.length; i++) {
        fill(200, 150);
        if (pArray[i].posX === w / 2) {
            stroke(255, 100);
            radius = 75 + Math.sin(frameCount / 10);
            fill(255, 97, 59, 200);
            pArray[i].size = radius;
            ellipse(pArray[i].posX, posY, pArray[i].size * cScalar, pArray[i].size * cScalar);
            subNodeDisplay(pArray[i]);
            textAlign(RIGHT);
            textStyle(NORMAL);
            textSize(50);
            fill(255);
            text(String(selectedCol.name), (width / 3), (height / 1.48));
            if (pArray[i].subPg.subName[vertSelect]) {
                textSize(25);
                text(pArray[i].subPg.subName[vertSelect], (width / 3), (height / 1.35));
            }
        } else {
            stroke(100, 50);
            pArray[i].size = 50;
            ellipse(pArray[i].posX, posY, pArray[i].size, pArray[i].size);
        }
        textStyle(BOLD);
        fill(255, 250);
        textSize(25);
        textAlign(CENTER);
        text(pArray[i].alias, pArray[i].posX, (posY) + 8);
        //textSize(20);
        //   text(pArray[i].name, pArray[i].posX, (posY) + 50);
    }
}
function openDialog() {
    $('<div/>').dialog({
        modal: true,
        open: function() 
        {
            if ($(this).is(':empty')) {
                $(this).load('test2/index.html');
            }
        },
        height: 800,
        width: 1050,
        //title: "JQuery Dialog"
    });
    $(".ui-dialog-titlebar").hide();
}
function subNodeDisplay(pNode) {
    fill(200);
    textAlign(LEFT);
    noStroke();
    textFont("Courier New");
    textStyle(BOLD);
    textSize(15);
    stroke(200, 200);
    strokeWeight(4);
    bezier(width / 2.25, height / 1.95, (width / 2.25) - 40, (height / 1.95), (width / 2.25), (height / 1.5), (width / 2.25) - 60, (height / 1.5));
    bezier((width / 2.25) - 60, (height / 1.5), (width / 2.25), (height / 1.5), (width / 2.25) - 40, (height / 1.05), width / 2.25, height / 1.05);
    //   text(pNode.subPg.subName.length, 50, 50);
    strokeWeight(1);
    for (var subN = 0; subN < pNode.subPg.subName.length; subN++) {
        if (vertSelect === subN) {
            fill(250, 170);
            ellipse(pNode.posX, (posY + 100) - 60 * (subN - vertSelect), 30, 30);
            fill(100, 75);
            stroke(255);
            rectMode(CORNER);
            rect(pNode.posX - 25, (posY + 75), ((String(pNode.subPg.subName[subN]).length) * 15) + 75, 50);
            noStroke();
            fill(255, 200);
            textSize(20);
            text(pNode.subPg.subName[subN], pNode.posX + 30, (posY + 105) + 67 * ((subN - vertSelect)));
            textSize(15);
        } else if (subN === vertSelect - 1) {
            fill(200, 125);
            noStroke();
            ellipse(pNode.posX, (posY - 30) + 37 * ((subN - vertSelect)), 30 + Math.sin(frameCount / 10), 30 + Math.sin(frameCount / 10));
            text(pNode.subPg.subName[subN], pNode.posX + 30, (posY - 25) + 37 * ((subN - vertSelect)));
            strokeWeight(1);
            stroke(255, 75);
            fill(0);
            //     text(pNode.subPg.subName[subN], pNode.posX + 30, (posY - 30) + 37 * ((subN - vertSelect)));
        } else if (subN >= vertSelect + 1) {
            fill(200, 130);
            ellipse(pNode.posX, (posY + 100) + 67 * ((subN - vertSelect)), 30, 30);
            fill(255, 150);
            text(pNode.subPg.subName[subN], pNode.posX + 30, (posY + 105) + 67 * ((subN - vertSelect)));
        }
        noStroke();
        fill(200);
    }
}
