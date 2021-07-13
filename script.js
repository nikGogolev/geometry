let line = document.querySelectorAll('.line');

let pointsX1 = [];
let pointsY1 = [];
let pointsX2 = [];
let pointsY2 = [];

class Point {
	constructor(){
		this.x = 0,
		this.y = 0,
		this.directX = '',
		this.directY = ''
	}
	
	defineDirect(){
		if (this.x > 499){
			this.directX = 'left';
		} else if (this.x < 1){
			this.directX = 'right';
		};
		
		if (this.y > 499){
			this.directY = 'up';
		} else if (this.y < 1){
			this.directY = 'down';
		}
	}
}

const point1 = new Point;
const point2 = new Point;

const point3 = new Point;
const point4 = new Point;


function moveCoordinate(coord, add, direction){
	
	switch (direction){
	
	case 'up':
		return coord -= add;
	case 'left':
		return coord -= add;
		
	case 'down':
		return coord += add;
	case 'right':
		return coord += add;
	}
}


let geometry = {
	init(){
		for (let i =  0; i < line.length; i++){
			pointsX1[i] = 0;
			pointsY1[i] = 0;
			pointsX2[i] = 0;
			pointsY2[i] = 0;
		}
		point1.x = 0;
		point1.y = 0;
		point2.x = 0;
		point2.y = 0;
		point1.directX = 'right';
		point1.directY = 'down';
		point2.directX = 'right';
		point2.directY = 'down';
	},
	
	run(){
		
		point1.x = moveCoordinate(point1.x, 4, point1.directX);
		point1.y = moveCoordinate(point1.y, 3, point1.directY);
		point1.defineDirect();
		point2.x = moveCoordinate(point2.x, 5, point2.directX);
		point2.y = moveCoordinate(point2.y, 9, point2.directY);
		point2.defineDirect();
		
		for (let i = line.length - 1; i > 0; i--){
			pointsX1[i] = pointsX1[i - 1];
			pointsY1[i] = pointsY1[i - 1]; 
			pointsX2[i] = pointsX2[i - 1]; 
			pointsY2[i] = pointsY2[i - 1];
		}
		pointsY1[0] = point1.y;
		pointsX1[0] = point1.x;
		pointsX2[0] = point2.x;
		pointsY2[0] = point2.y;
		
		
		line.forEach(function(item, i) {
			item.x1.baseVal.value = pointsX1[i];
			item.y1.baseVal.value = pointsY1[i];
			item.x2.baseVal.value = pointsX2[i];
			item.y2.baseVal.value = pointsY2[i];
			
		});
	}
}

geometry.init();

setInterval(geometry.run, 50);