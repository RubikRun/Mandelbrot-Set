function drawLine(x1, y1, x2, y2, color) {
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.strokeStyle = color;
    c.stroke();
}

function getBoundness(a, b) {
    var p = a;
    var q = b;

    var counter = 0;
    while (p * p + q * q <= 500) {
        var newP = p * p - q * q + a;
        var newQ = 2 * p * q + b;
        p = newP;
        q = newQ;

        counter += 1;
        if (counter >= 1000) {
            return (p * p + q * q) * 100;
        }
    }
    return counter;
}

var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
c.lineWidth = 1;

var zoomLevel = 300;

var i, j;
for (i = 0; i < canvas.width; i++) {  
    for (j = 0; j < canvas.height; j++) {
        var boundness = getBoundness((i - canvas.width / 2) / zoomLevel, (j - canvas.height / 2) / zoomLevel);
        if (boundness == -1) {
            drawLine(i, j, i + 1, j + 1, 'rgba(' + boundness % 256 + ', ' + boundness % 256 + ', ' + boundness % 256 + ', ' + 250 + ')');
        }
        else {
            drawLine(i, j, i + 1, j + 1, 'rgba(' + boundness * 2 % 256 + ', ' + boundness * 3 % 256 + ', ' + boundness * 4 % 256 + ', ' + 250 + ')');
        }
    }
}
/*
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    var i, j;
    for (i = 0; i < canvas.width; i += 5) {  
        for (j = 0; j < canvas.height; j += 5) {
            var boundness = getBoundness((i - canvas.width / 2) / zoomLevel, (j - canvas.height / 2) / zoomLevel);
            if (boundness == -1) {
                drawLine(i, j, i + 5, j + 5, 'black');
            }
            else {
                drawLine(i, j, i + 5, j + 5, 'rgba(' + boundness * 2 % 256 + ', ' + boundness * 3 % 256 + ', ' + boundness * 4 % 256 + ', ' + 250 + ')');
            }
        }
    }
}

animate();*/