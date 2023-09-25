var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse={
    x: undefined,
    y: undefined
}
var maxRedious = 40;
// var minRedious = 4;

var colorArray = [
    '#348888',
    '#22BABB',
    '#9EF8EE',
    '#FA7F08',
    '#F24405'
];

window.addEventListener('mousemove',function(event){
    mouse.x=event.x;
    mouse.y=event.y;
});

window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});


function Circle(x,y,dx,dy,redious){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.redious = redious;
    this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
    this.minRedious = redious;

    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.redious,0,Math.PI*2,false);
        c.fillStyle=this.color;
        c.fill();
        
    }

    this.update = function(){
        if (this.x+this.redious>innerWidth || this.x-this.redious<0) {
            this.dx=-this.dx;
            
        }
    
        if (this.y+this.redious>innerHeight || this.y-this.redious<0) {
            this.dy=-this.dy;
            
        }
    
        this.x+=this.dx;
        this.y+=this.dy;

        if (mouse.x-this.x<50 && mouse.x-this.x>-50 && mouse.y-this.y<50 && mouse.y-this.y>-50 && this.redious<maxRedious) {
            this.redious+=1;
        }
        else if(this.redious>this.minRedious){
            this.redious -= 1;
        }

        this.draw();
        
    }

}

// var circle = new Circle(200,200,3,3,30);



var circleArray =[];

function init(){
    circleArray =[];
    
    for (var i = 0; i < 1000; i++) {
        
        var x = Math.random()*(innerWidth-redious*2)+redious;
        var y = Math.random()*(innerHeight-redious*2)+redious;
        var dx = (Math.random()-0.5);
        var dy = (Math.random()-0.5);
        var redious = Math.random()*3+1; 
        console.log(redious);
        circleArray.push(new Circle(x,y,dx,dy,redious));
            
    }

}

init();



function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);

    for (var i= 0; i < circleArray.length; i++) {
        circleArray[i].update();
        
    }
     
}
animate();


