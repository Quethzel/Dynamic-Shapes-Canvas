
function Rectangle(x, y, w, h) {
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

function GetColor() {
	return Stage.colors[Math.floor(Math.random() * Stage.colors.length)];
};

var Stage = {
	canvas: null,
	ctx: null,
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
			var shape = Stage.data[i];
			var shapeToDraw = null;
			if(shape.type == "circle") {
				shapeToDraw = this._drawCircle(shape.obj);
			}

			var ctx = Stage.ctx;
			ctx.beginPath();
	        ctx.lineWidth = 2;
			ctx.fillStyle = "#F5EBE9";
	        ctx.strokeStyle = "#F0433A";
	        ctx.fill(shapeToDraw);			
			ctx.closePath();

		}
	},

	_drawCircle: function(circle) {
		/*
		var ctx = Stage.ctx;
		ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
        ctx.lineWidth = 2;
		ctx.fillStyle = "#F5EBE9";
        ctx.strokeStyle = "#F0433A";
        
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
		*/
        
        var path = new Path2D();
        path.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
        return path;


	},

	_drawEqTriangle: function(triangle) {
		var ctx = Stage.ctx;
		
		var color = GetColor();
		ctx.translate(Stage.canvas.width/2, Stage.canvas.height/2);
		ctx.beginPath();
		ctx.moveTo(0, - triangle.h / 2);
		ctx.lineTo(- triangle.s / 2, triangle.h / 2);
		ctx.lineTo(triangle.s / 2, triangle.h / 2);
		ctx.lineTo(0, - triangle.h / 2);
        ctx.lineWidth = 2;
		ctx.fillStyle = color.fill;
		ctx.strokeStyle = color.stroke;
		ctx.fill();
		ctx.stroke();
		ctx.closePath();

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
	
	var c = new circle(Stage.cooX, Stage.cooY, 80);
	var shape = { type: "circle", obj: c };
	Stage.data.push(shape);
	Stage.draw();
	

	/*
	var t = new triangle(120);
	Stage._drawEqTriangle(t);
	*/

}

function init() {
	Stage.init("canvas");
};

init();
