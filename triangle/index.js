var canvas, ctx;
var interval = null,
    timesToRun = +prompt ("Choose how many times you want to run triangles"),
    x = 1;
var toSplitTemp = [],
    toDraw = [],
    toSplit = []; 
var topCol = 'white',
    rightCol = 'white',
    leftCol = 'white';
var colFil = true;

function triangle(){
    this.a = [0, 0];
    this.b = [0, 0];
    this.c = [0, 0];
    this.color = '';
}

function firstTri(){
    var first_tri = new triangle();
    first_tri.a = [canvas.width/2, 0];
    first_tri.b = [canvas.width, canvas.height];
    first_tri.c = [0, canvas.height];
    first_tri.color = rightCol;
    toDraw.push(first_tri);
    toSplit.push(first_tri);
}

function start(){    
    firstTri();    
    interval = setInterval(draw, 500);    
}

window.onload = function(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 700;
    
    start();   
}

function draw(){
    drawBlock(0,0, canvas.width,canvas.height,'black'); 
    
    for(var i = 0; i < toDraw.length; i++){  
        ctx.beginPath();
        ctx.moveTo(toDraw[i].a[0],toDraw[i].a[1]);
        ctx.lineTo(toDraw[i].b[0],toDraw[i].b[1]);
        ctx.lineTo(toDraw[i].c[0],toDraw[i].c[1]);
        ctx.closePath();
        
        if (colFil){
            ctx.fillStyle = toDraw[i].color; 
            ctx.fill(); 
        }else{
            ctx.lineWidth = 1;
            ctx.strokeStyle = toDraw[i].color;
            ctx.stroke();
        }
    }    
    toDraw = [];
   
    for(var i = 0; i < toSplit.length; i++)
        split(toSplit[i]);
	
    toSplit = [];
    toSplit = toSplitTemp;
    toSplitTemp = [];
	
    if(x === timesToRun)
        clearInterval(interval);
	
    x++;    
}

function split(tri){
    var a = tri.a;
    var b = tri.b;
    var c = tri.c;
    var i = [(tri.a[0]+tri.c[0])/2, (tri.a[1]+tri.c[1])/2];
    var j = [(tri.a[0]+tri.b[0])/2, (tri.a[1]+tri.b[1])/2]; 
    var k = [(tri.c[0]+tri.b[0])/2, (tri.c[1]+tri.b[1])/2];
	
    var top = new triangle();
        top.a = a;
        top.b = j;
        top.c = i;
        top.color = topCol;    
    toDraw.push(top);
    toSplitTemp.push(top);    
	
    var right = new triangle();
        right.a = j;
        right.b = b;
        right.c = k;
        right.color = rightCol;    
    toDraw.push(right);
    toSplitTemp.push(right);
    
    var left = new triangle();
        left.a = i;
        left.b = k;
        left.c = c;
        left.color = leftCol;    
    toDraw.push(left);
    toSplitTemp.push(left);
}

function drawBlock(x,y, width,height, color){
    ctx.fillStyle = color;
    ctx.fillRect(x,y, width,height, color);
}
