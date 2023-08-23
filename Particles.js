//Particle Class

function Particle(x, y, lttr, offs){

	this.sTime = frameTime;							
	this.startPoint = new Vector2(x, y);			//The position of the starting point in the letter the particle is currently drawing
	this.currentPoint = this.startPoint;			//The current position of the particle
	this.nextPoint = "null";						//The target point in the letter the particle is traveling towards
	this.letter = lttr;								//The letter this particle is drawing.
	this.delay = Math.floor(Math.random() * 1500);	//Time delay before the particle activates to stop clumped starts
	this.iterator = 0;
	this.started = false;							//A short delay to spread the particles apart when they start drawing their letter
	this.xOffset = offs;

}

Particle.prototype.move = function(){

//Checks the letter the particle should be drawing.
//Then determines the next point the Particle needs to move to.
//Interpolates to that point.
//Then determines the next point.

//Go towardsnextPoint -> Once you reach next point, check letter reference for next point and iterate counter.
//Once iterator has gone through the whole path, reset().

if(frameTime - this.sTime > this.delay && this.started == false){
	this.started = true;
	this.sTime = frameTime;
}

if(this.started == true){
	if(this.nextPoint == "null"){
		this.nextPoint = new Vector2(letterHash[this.letter][this.iterator].X, letterHash[this.letter][this.iterator].Y);
		//console.log(this.nextPoint.X);
		this.nextPoint.X = this.nextPoint.X + this.xOffset;
		//console.log(this.nextPoint.X + this.xOffset);
	}

	if(this.currentPoint.X == this.nextPoint.X && this.currentPoint.Y == this.nextPoint.Y){
		if(this.iterator + 1 < letterHash[this.letter].length){
			this.iterator++;
			this.startPoint = this.currentPoint;
			this.nextPoint.X = letterHash[this.letter][this.iterator].X;
			this.nextPoint.Y = letterHash[this.letter][this.iterator].Y;
			//console.log(this.nextPoint.X);
			this.nextPoint.X = this.nextPoint.X + this.xOffset;
			//console.log(this.nextPoint.X);
			this.sTime = frameTime;
			//console.log("Point Reached!")
		}
		else{
			this.resetPos();
		}
	}
	else{
		this.currentPoint.X = Lerp(this.startPoint.X, this.nextPoint.X, (frameTime - this.sTime) / 400);
		this.currentPoint.Y = Lerp(this.startPoint.Y, this.nextPoint.Y, (frameTime - this.sTime) / 400);
	}
}
	//context.drawImage(img, this.currentPoint.X, this.currentPoint.Y);
	draw_Shape(this.currentPoint.X, this.currentPoint.Y);
	//if(!this.nextPoint.X){
	//	console.log(this);
	//}
	//console.log("Draw something?");
}

Particle.prototype.resetPos = function(){
	//Resets particle to the starting position so that it may begin it's journey again.
	//this.currentPoint = this.startPoint;
	this.nextPoint = "null";
	this.iterator = 0;
	this.sTime = frameTime;
	this.started = false;
	//console.log("RESET!")
}

Particle.prototype.transition = function(){
	//Moves the particles to their new starting point then delays them.
}

//Linear interpolation function
function Lerp(a, b, n){
	return (1 - n) * a + n * b;
}

//Function for determining distance between two 2D points
function PythagDistance(x1, x2, y1, y2){
	var a = x1 - x2;
	var b = y1 - y2;
	return Math.sqrt(a * a + b * b);
}

//Function for finding the angle between two points
function angleBetween(n1, n2){
	return Math.atan2(n2.Y - n1.Y, n2.X - n1.X) * 180 / Math.PI;
}