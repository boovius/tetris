console.log('movement load successful');



/* ////////////////////  */

/* VARIABLE DECLARATIONS */

/* ////////////////////  */


/* BUILDS THE FIRST SHAPE */
var fallingShape = makeShape();
fallingShape.formL();
/*console.log(fallingShape); //checks to make sure shape is created successfully */


/* creates array that holds each individual block after collision */
var piecesArray = []; /* array of blocks with pieces */

/* movingPiece bool instantiated to true, turns false if one or 
blocks of a shape hits a spot on the gameboard with hit set to true */ 
var movingPiece = true;


/* clearRow boolean - probably no longer being used */
/*var clearRow = false;  becomes true if a row fills */




		





/* ////////////////////  */

/* EXECUTION */

/* ////////////////////  */



$(function(){
	$(window).keydown(function(data){
		console.log(data);

		/* MOVEMENT CONTROL - */
		
		if ( movingPiece ){
			
			/* - DOWN */
				if(data.keyCode === 40){
					fallingShape.moveDown();
							
				};
			
			/* - LEFT */
				if(data.keyCode === 37){
					fallingShape.moveLeft();
				};

				/* - RIGHT */
				if(data.keyCode === 39){
					fallingShape.moveRight();
				};

				/* - DOWN */
				if(data.keyCode === 82){
					fallingShape.rotate();
								
				};
				/* - DROP */
				if(data.keyCode === 68){
					while (movingPiece){
						fallingShape.moveDown();
						movingPiece = gameboard.pieceMoving(fallingShape);	
					};
				};

				/*moving piece boolean update */
					/* takes shape as argument to pieceMoving function */
					/* pieceMoving runs tracker on each block of shape */
				movingPiece = gameboard.pieceMoving(fallingShape);

			}
			else 
			{
				
				/* sets collision on gameboard board spot to top of each block of shape */
				gameboard.gameBoardHit(fallingShape);

				/* change fallingBlock properties */
				fallingShape.changeBlockProperties();
				

				/* fills the pieces array with fallingShape.block objects*/
				gameboard.piecesArray.push(fallingShape.block1);
				gameboard.piecesArray.push(fallingShape.block2);
				gameboard.piecesArray.push(fallingShape.block3);
				gameboard.piecesArray.push(fallingShape.block4);
				//console.log(piecesArray); checks to see if piecesArray filling with unique references
				

				/* 
				checks if entire row is full
				if entire row full: 
					row clears; 
					all other pieces drop;
					collision adjusted on GameBoard; 
				*/
				gameboard.checkRowFull();
/*				if (gameboard.checkRowFull()){
					gameboard.killRow();
				};*/
				
				/* resets Counters, makes new shape, and resets movingPiece boolean */
				gameboard.resetRowsCounters();
				fallingShape = makeShape();
				fallingShape.formShape();
				movingPiece = true; /* resets movingPiece boolean for next falling shape */
				fallingShape.moveDown();

			};
		
	});
					
});