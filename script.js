let line = document.querySelectorAll('.line');
let picture = document.querySelector('.picture');
let width = window.screen.width;

if (width > 900){
	width = 900;
}
let height = width*3/4;

picture.style.width = width;
picture.style.height = height;

let pointsX1 = [];
let pointsY1 = [];
let pointsX2 = [];
let pointsY2 = [];
let colors = [];

let red = 0;
let green = 0;
let blue = 0;
let redDirect = '';
let greenDirect = '';
let blueDirect = '';

class Point {
	constructor(){
		this.x = 0,
		this.y = 0,
		this.directX = '',
		this.directY = '',
		this.speedX = 0,
		this.speedY = 0
	}
	
	defineDirect(){
		if (this.x > width){
			this.directX = 'left';
		} else if (this.x < 1){
			this.directX = 'right';
		};
		
		if (this.y > height){
			this.directY = 'up';
		} else if (this.y < 1){
			this.directY = 'down';
		}
	}
	
	moveX(){
		this.defineDirect();
		switch (this.directX){
		
		case 'left':
			return this.x -= this.speedX;
			
		case 'right':
			return this.x += this.speedX;
		}
	}
	
	moveY(){
		this.defineDirect();
		switch (this.directY){
		
		case 'up':
			return this.y -= this.speedY;
			
		case 'down':
			return this.y += this.speedY;
		}
	}
}

class Color {
	constructor(){
		this.red = 0,
		this.green = 0,
		this.blue = 0,
		this.redDirect = '',
		this.greenDirect = '',
		this.blueDirect = '',
		this.redSpeed = 0,
		this.greenSpeed = 0,
		this.blueSpeed = 0
	}
	
	changeColor(){
		if (this.red > 254){
			this.redDirect = 'down';
		} else if (this.red < 1){
			this.redDirect = 'up';
		}
		if (this.green > 254){
			this.greenDirect = 'down';
		} else if (this.green < 1){
			this.greenDirect = 'up';
		}
		if (this.blue > 254){
			this.blueDirect = 'down';
		} else if (this.blue < 1){
			this.blueDirect = 'up';
		}
		if (this.redDirect == 'down'){
			this.red -= this.redSpeed;
		} else if (this.redDirect == 'up'){
			this.red += this.redSpeed;
		}
		if (this.greenDirect == 'down'){
			this.green -= this.greenSpeed;
		} else if (this.greenDirect == 'up'){
			this.green += this.greenSpeed;
		}
		if (this.blueDirect == 'down'){
			this.blue -= this.blueSpeed;
		} else if (this.blueDirect == 'up'){
			this.blue += this.blueSpeed;
		}
		return `rgb(${this.red},${this.green},${this.blue})`;
	}
}

const point1 = new Point;
const point2 = new Point;
const color1 = new Color;

let geometry = {
	init(){
		for (let i =  0; i < line.length; i++){
			pointsX1[i] = 0;
			pointsY1[i] = 0;
			pointsX2[i] = 0;
			pointsY2[i] = 0;
			colors[i] = 'rgb(0, 0, 0)';
		}
		
		point1.x = 0;
		point1.y = 0;
		point1.directX = 'right';
		point1.directY = 'down';
		point1.speedX = 6;
		point1.speedY = 3;
		
		point2.x = 0;
		point2.y = 0;
		point2.directX = 'right';
		point2.directY = 'down';
		point2.speedX = 5;
		point2.speedY = 9;
		
		color1.red = 0;
		color1.green = 0;
		color1.blue = 0;
		color1.redDirect = 'up';
		color1.greenDirect = 'up';
		color1.blueDirect = 'up';
		color1.redSpeed = 2;
		color1.greenSpeed = 4;
		color1.blueSpeed = 5;
	},
	
	run(){
		point1.moveX();
		point1.moveY();
		point2.moveX();
		point2.moveY();
		
		for (let i = line.length - 1; i > 0; i--){
			pointsX1[i] = pointsX1[i - 1];
			pointsY1[i] = pointsY1[i - 1]; 
			pointsX2[i] = pointsX2[i - 1]; 
			pointsY2[i] = pointsY2[i - 1];
			colors[i] = colors[i - 1];
		}
		
		pointsY1[0] = point1.y;
		pointsX1[0] = point1.x;
		pointsX2[0] = point2.x;
		pointsY2[0] = point2.y;
		colors[0] = color1.changeColor();
		
		line.forEach(function(item, i) {
			item.x1.baseVal.value = pointsX1[i];
			item.y1.baseVal.value = pointsY1[i];
			item.x2.baseVal.value = pointsX2[i];
			item.y2.baseVal.value = pointsY2[i];
			item.style.stroke = colors[i];
			
		});
	}
}

geometry.init();

setInterval(geometry.run, 50);
