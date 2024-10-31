
// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
	// Définir ici les attributs de la 'classe'
  //Q1
    this.initX=0;
    this.initY=0;
    this.finalX=0;
    this.finalY=0;
    this.isPressed = false;
    this.interactor = interactor;
	// Developper les 3 fonctions gérant les événements

    this.maFctGerantLaPression= function (evt){
      var position = getMousePosition(canvas,evt);
      this.initX = position.x;
      this.initY = position.y;
      this.isPressed=true;
      this.interactor.onInteractionStart(this);
      console.log(position)
    }.bind(this);

    this.maFctGerantLeDeplacement = function (evt){
      if ( this.isPressed){
        var position = getMousePosition(canvas,evt);
        this.finalX=position.x;
        this.finalY=position.y;
        this.isPressed=true;
        this.interactor.onInteractionUpdate(this);
        console.log(position);
      }

    }.bind(this);

  this.maFctGerantLeRelachement= function (evt){
      var position = getMousePosition(canvas,evt);
      this.finalX=position.x;
      this.finalY=position.y;
      this.isPressed=false;
      this.interactor.onInteractionEnd(this);
      console.log(position);
  }.bind(this);

	// Associer les fonctions précédentes aux évènements du canvas.
  canvas.addEventListener('mousedown', this.maFctGerantLaPression, false);
  canvas.addEventListener('mousemove', this.maFctGerantLeDeplacement, false);
  canvas.addEventListener('mouseup', this.maFctGerantLeRelachement, false);
};


// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top

  };
};



