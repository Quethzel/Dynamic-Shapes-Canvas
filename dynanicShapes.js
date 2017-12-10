
function rectangle(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
}


function circle(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
}

function triangle(s) {
	this.s = s;
	this.h = s * (Math.sqrt(3)/2);
}

function star(x, y, s, or, ir) {
	this.x = x;
	this.y = y;
	this.spikes = s;
	this.or = or;
	this.ir = ir;
}

function GetColor() {
	return Stage.colors[Math.floor(Math.random() * Stage.colors.length)];
};

var Stage = {
	canvas: null,
	ctx: null,
	lineWidth: 8,
	offsetX: 0,
	offsetY: 0,
	cooX: 0,
	cooY: 0,

	init: function(id) {
		this.canvas = document.getElementById(id);
		this.ctx = this.canvas.getContext("2d");
		this.cooX = this.canvas.width / 2;
		this.cooY = this.canvas.height / 2;
		this.draw();
	},

	clear: function() {
		if(this.ctx != null) {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
	},

	draw: function() {
		this.clear();
		for (var i = 0; i < Stage.data.length; i++) {
			var color = GetColor();
			var ctx = Stage.ctx;
			var dataShape = Stage.data[i];
			var shape = null;

			switch(dataShape.type) {
				case "circle":
					shape = this._drawCircle(dataShape.obj);
					break;
				case "square":
					shape = this._drawSquare(dataShape.obj);
					break;
				case "eqTriangle":
					this._drawEqTriangle(dataShape.obj);
					break;
				case "star":
					this._drawStar(dataShape.obj);
					break;
			}
			
			if(dataShape.type != "eqTriangle" && dataShape.type != "star") {
				ctx.beginPath();
				ctx.fillStyle = color.fill;
		        ctx.strokeStyle = color.stroke;
		        ctx.fill(shape);
		        ctx.lineWidth = this.lineWidth;
		        ctx.stroke(shape);
				ctx.closePath();
			}
		}
	},

	_drawCircle: function(circle) {
        var path = new Path2D();
        path.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
        return path;
	},

	_drawSquare: function(square) {
		var path = new Path2D();
		path.rect(square.x, square.y, square.w, square.h);
		return path;
	},

	_drawEqTriangle: function(triangle) {
		var color = GetColor();
		Stage.ctx.save();
		Stage.ctx.beginPath();
		Stage.ctx.translate(Stage.canvas.width/2, Stage.canvas.height/2);
		Stage.ctx.moveTo(0, - triangle.h / 2);
		Stage.ctx.lineTo(- triangle.s / 2, triangle.h / 2);
		Stage.ctx.lineTo(triangle.s / 2, triangle.h / 2);
		Stage.ctx.lineTo(0, - triangle.h / 2);
        Stage.ctx.lineWidth = Stage.lineWidth;
		Stage.ctx.fillStyle = color.fill;
		Stage.ctx.strokeStyle = color.stroke;
		Stage.ctx.fill();
		Stage.ctx.stroke();
		Stage.ctx.closePath();
		Stage.ctx.restore();		
	},
	_drawStar: function(star) {
		var color = GetColor();
    	var rot = Math.PI / 2 * 3;
		var step = Math.PI /star.spikes;
		var x = star.x;
		var y = star.y;

		Stage.ctx.save();
		Stage.ctx.strokeStyle = color.stroke;
		Stage.ctx.beginPath();
	    Stage.ctx.moveTo(star.x, star.y - star.or)
	    for (i = 0; i < star.spikes; i++) {
	        x = star.x + Math.cos(rot) * star.or;
	        y = star.y + Math.sin(rot) * star.or;
	        Stage.ctx.lineTo(x, y)
	        rot += step

	        x = star.x + Math.cos(rot) * star.ir;
	        y = star.y + Math.sin(rot) * star.ir;
	        Stage.ctx.lineTo(x, y)
	        rot += step
	    }
	    Stage.ctx.lineTo(star.x, star.y - star.or)
    	Stage.ctx.closePath();    
    	Stage.ctx.lineWidth = Stage.lineWidth;
    	Stage.ctx.strokeStyle = color.stroke;
    	Stage.ctx.stroke();
    	Stage.ctx.fillStyle = color.fill;
    	Stage.ctx.fill();
    	Stage.ctx.restore();
	}

};

Stage.data = [];

Stage.colors = [
	{ stroke: "#FFAB00", fill: "#C67C00", name: "Amber" },
	{ stroke: "#D50000", fill: "#9B0000", name: "Red" },
	{ stroke: "#008E76", fill: "#00BFA5", name: "Teal" }
];


/* 	------------------------------------------------------
	Logic
	------------------------------------------------------
*/
function createShape() {
	Stage.data = [];
	var n = Math.floor(Math.random() * 4);
	var shape = {type: null, obj: null};
	
	switch(n) {
		case 0: 
			shape.type = "circle";
			shape.obj = new circle(Stage.cooX, Stage.cooY, 80);
			break;
		case 1:
			shape.type = "square";
			shape.obj = new rectangle(Stage.canvas.width - 180,  Stage.canvas.height - 180, 150, 150);
			break;
		case 2:
			shape.type = "eqTriangle";
			shape.obj = new triangle(180);
			break;
		case 3:
			shape.type = "star";
			shape.obj = new star(100, 100, 5, 80, 40);
			break;
	}
	Stage.data.push(shape);
	Stage.draw();
}

function init() {
	Stage.init("canvas");
};

init();
