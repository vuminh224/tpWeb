
var editingMode = { rect: 0, line: 1 };

function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.line;
	this.currLineWidth = 5;
	this.currColour = '#000000';
	this.currentShape = 0;

	// Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.
	document.getElementById('butRect').onclick = (_) => this.currEditingMode=editingMode.rect
	document.getElementById('butLine').onclick = (_) => this.currEditingMode=editingMode.line
	document.getElementById('spinnerWidth').onclick = (_) => this.currLineWidth=e.target.value
	document.getElementById('colour').onclick = (_) => this.currColour=e.target.value


	new DnD(canvas, this);

	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd
	this.onInteractionStart = function (DnD) {
		this.currentShape = new Rectangle();

	}.bind(this);
	this.onInteractionUpdate = function (DnD) {
		if(this.currEditingMode===editingMode.rect){
		this.currentShape=new Rectangle(DnD.initX,DnD.initY,this.currLineWidth,this.currColour,DnD.finalX - DnD.initX,DnD.finalY- DnD.initY);
		}else{
			this.currentShape=new Line(DnD.initX,DnD.initY,this.currLineWidth,this.currColour,DnD.finalX,DnD.finalY);
		}
		drawing.paint(ctx,canvas);
		this.currentShape.paint(ctx);
		//console.log("Update");
	}.bind(this);
	this.onInteractionEnd = function (DnD) {
		drawing.shapeArray.push(this.currentShape);
		drawing.paint(ctx,canvas);
		this.currentShape.paint(ctx);
	}.bind(this);
};


