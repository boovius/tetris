console.log('shapes load successful');

var pieceID = 0;
function Block (top, left, moving, pieceID) {
	this.top = top; 
	this.left = left; 
	this.moving = moving; 
	this.pieceID = pieceID;
	this.blockID = '#pieceID_' + this.pieceID;
};

Block.prototype.getPosition = function(){
	this.top = $(this.blockID).css("top");
	this.top = parseInt(this.top);
	console.log('this.top = ' + this.top);

	this.left = $(this.blockID).css("left");
	this.left = parseInt(this.left);
	console.log('this.left = ' + this.left);
};

Block.prototype.moveLeft = function(){
	if (this.left !== 0)
		this.left = this.left - 25;
	$(this.blockID).animate({left: this.left}, {duration: 1, queue: false});
};
Block.prototype.moveRight = function(){
	if (this.left !== 475)
		this.left = this.left + 25;
	$(this.blockID).animate({left: this.left}, {duration: 1, queue: false});
};
Block.prototype.moveDown = function(){
	this.top = this.top + 25;
	$(this.blockID).animate({top: this.top}, {duration: 1, queue: false});
};
Block.prototype.moveUp = function(){
	this.top = this.top - 25;
	$(this.blockID).animate({top: this.top}, {duration: 1, queue: false});
};
Block.prototype.drop = function(){
};

Block.prototype.rotateBlock = function(anchorBlock){
	var deltaX = this.left - anchorBlock.left;
	var deltaY = anchorBlock.top - this.top;
	var temp = deltaY * 1;
	deltaY = deltaX;
	deltaX = temp;
	this.top = anchorBlock.top + deltaY;
	this.left = anchorBlock.left + deltaX; 
	$(this.blockID).animate({top: this.top}, {duration: 1, queue: false});
	$(this.blockID).animate({left: this.left}, {duration: 1, queue: false});
};



function Shape (block1, block2, block3, block4) {
	this.block1 = block1; 
	this.block2 = block2;
	this.block3 = block3; 
	this.block4 = block4;
};

Shape.prototype.getShapePosition = function() {
	this.block1.getPosition();
	this.block2.getPosition();
	this.block3.getPosition();
	this.block4.getPosition();
}

Shape.prototype.moveLeft = function() {
	if (this.block1.left !== 0 && this.block2.left !== 0 && this.block3.left !== 0 && this.block4.left !== 0
		&& this.block1.top !== -25 && this.block2.top !== -25 && this.block3.top !== -25 && this.block4.top !== -25){
		this.block1.moveLeft();
		this.block2.moveLeft();
		this.block3.moveLeft();
		this.block4.moveLeft();	
	};	
}

Shape.prototype.moveRight = function(){
	if (this.block1.left !== 475 && this.block2.left !== 475 && this.block3.left !== 475 && this.block4.left !== 475
		&& this.block1.top !== -25 && this.block2.top !== -25 && this.block3.top !== -25 && this.block4.top !== -25){
		this.block1.moveRight();
		this.block2.moveRight();
		this.block3.moveRight();
		this.block4.moveRight();
	};
}

Shape.prototype.moveDown = function(){
	this.block1.moveDown();
	this.block2.moveDown();
	this.block3.moveDown();
	this.block4.moveDown();
};

Shape.prototype.drop = function(gameboard){
	while (movingPiece){
		this.block1.moveDown();
		this.block2.moveDown();
		this.block3.moveDown();
		this.block4.moveDown();
		movingPiece = gameboard.pieceMoving(fallingShape);	
	};
};

Shape.prototype.getBlockPositionDifference = function(){
	this.getShapePosition();
};


Shape.prototype.rotate = function(){
	this.block4.rotateBlock(this.block1);
	this.block3.rotateBlock(this.block1);
	this.block2.rotateBlock(this.block1);
};


/* shape.changeBlockProperties()*/
/* - Changes intrinsinc properties of all 4 blocks in a shape */
/* - Changes each block's moving property and changes css classes */

Shape.prototype.changeBlockProperties = function(){
 	this.block1.moving = false;
 	$(this.block1.blockID).removeClass('fallingBlock').addClass('hitBlock');

 	this.block2.moving = false;
 	$(this.block2.blockID).removeClass('fallingBlock').addClass('hitBlock');

 	this.block3.moving = false;
 	$(this.block3.blockID).removeClass('fallingBlock').addClass('hitBlock');

 	this.block4.moving = false;
 	$(this.block4.blockID).removeClass('fallingBlock').addClass('hitBlock');
}

Shape.prototype.formLine = function() {
	this.block1.getPosition();

	this.block2.getPosition();
	this.block2.moveRight(); 

	this.block3.getPosition();
	this.block3.moveRight();
	this.block3.moveRight();

	this.block4.getPosition();
	this.block4.moveRight();
	this.block4.moveRight();
	this.block4.moveRight();
}

Shape.prototype.formTee = function() {
	this.block1.getPosition();
	
	this.block2.getPosition();
	this.block2.moveRight(); 

	this.block3.getPosition();
	this.block3.moveRight();
	this.block3.moveRight();

	this.block4.getPosition();
	this.block4.moveRight();
	this.block4.moveUp();
}

Shape.prototype.formL = function() {
	this.block1.getPosition();

	this.block2.getPosition();
	this.block2.moveDown(); 

	this.block3.getPosition();
	this.block3.moveDown(); 
	this.block3.moveRight();
	
	this.block4.getPosition();
	this.block4.moveDown(); 
	this.block4.moveRight();
	this.block4.moveRight();
}


Shape.prototype.formReverseL = function() {
	this.block1.getPosition();

	this.block2.getPosition();
	this.block2.moveUp(); 

	this.block3.getPosition();
	this.block3.moveUp();
	this.block3.moveRight();

	this.block4.getPosition();
	this.block4.moveUp();
	this.block4.moveRight();
	this.block4.moveRight();
}


Shape.prototype.formSquare = function() {
	this.block1.getPosition();

	this.block2.getPosition();
	this.block2.moveUp(); 

	this.block3.getPosition();
	this.block3.moveRight();

	this.block4.getPosition();
	this.block4.moveUp();
	this.block4.moveRight();
}


Shape.prototype.formS = function() {
	this.block1.getPosition();

	this.block2.getPosition();
	this.block2.moveRight(); 

	this.block3.getPosition();
	this.block3.moveRight();
	this.block3.moveUp();

	this.block4.getPosition();
	this.block4.moveUp();
	this.block4.moveRight();
	this.block4.moveRight();
}


Shape.prototype.formZ = function() {
	this.block1.getPosition();

	this.block2.getPosition();
	this.block2.moveRight(); 

	this.block3.getPosition();
	this.block3.moveUp();

	this.block4.getPosition();
	this.block4.moveLeft();
	this.block4.moveUp();
}

Shape.prototype.formShape = function(){
	var i = Math.floor(Math.random() * (7)) + 1 ;
   switch(i){
   		case 1: 
   			this.formLine();
   			/*console.log('1');*/
   			break;
   		case 2: 
	   		this.formL();
   			/*console.log('2');*/
   			break;	
   		case 3: 
   			this.formReverseL();
   			/*console.log('3');*/
   			break;
   		case 4: 
   			this.formTee();
   			/*console.log('4');*/
   			break;
   		case 5: 
   			this.formSquare();
   			/*console.log('5');*/
   			break;
   		case 6:
   			this.formS(); 
   			/*console.log('6');*/
   			break;
   		case 7: 
   			this.formZ();
   			/*console.log('7');*/
   			break;					
   };
}

window.makeShape = function(){
	pieceID++; 
	var fallingBlock1 = new Block(0, 0, true, pieceID);
	$('#container').append("<div id='pieceID_" + fallingBlock1.pieceID + "' class='box block fallingBlock'></div>"); 
	

	pieceID++; 
	var fallingBlock2 = new Block(0, 0, true, pieceID);
	$('#container').append("<div id='pieceID_" + fallingBlock2.pieceID + "' class='box block fallingBlock'></div>"); 


	pieceID++; 
	var fallingBlock3 = new Block(0, 0, true, pieceID); 
	$('#container').append("<div id='pieceID_" + fallingBlock3.pieceID + "' class='box block fallingBlock'></div>"); 


	pieceID++; 
	var fallingBlock4 = new Block(0, 0, true, pieceID); 	
	$('#container').append("<div id='pieceID_" + fallingBlock4.pieceID + "' class='box block fallingBlock'></div>"); 

	return new Shape(fallingBlock1, fallingBlock2, fallingBlock3, fallingBlock4);

}