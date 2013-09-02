console.log('gameboard load successful');

var GameBoard = function(){
	this.rows = rows = [
	[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
	[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
	[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
	[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
	[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
	[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
	[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
	[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
	[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
	[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
	[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
	[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
	[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
	[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
	[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
	[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
	[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
	[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
	[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
	[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
	];
	this.rowCounter = 0;
	this.colCounter = 0;
	this.blockID = '#';
	this.newTop = 0;
	this.clearRow = false;
	this.piecesArray = [];
}

/*resertRowsCounters*/
/*this function may not be needed */

GameBoard.prototype.resetRowsCounters = function(){
	this.rowCounter = 0;
	this.colCounter = 0;
}


/* pieceTracker() */
/* - tells you where a block is on the gameboard corresponding to the rows[][] */
GameBoard.prototype.pieceTracker = function(block){
 	for (this.rowCounter=0; this.rowCounter<20; this.rowCounter++){
 			if (this.rows[this.rowCounter][this.colCounter].top === block.top){
 				for (this.colCounter=0; this.colCounter<20; this.colCounter++){
 					if (this.rows[this.rowCounter][this.colCounter].left === block.left){
 						console.log("this.rowCounter=" + this.rowCounter  + " and this.colCounter=" + this.colCounter);
 						break;	
 					};
 				};
 				break;
 			};
 		};
 }


/* shape.moving() */
/* - returns a boolean: true if none of the 4 blocks of a shape have hit something */
/* - returns false if any of the blocks make contact with something */
GameBoard.prototype.pieceMoving = function(shape){
	this.pieceTracker(shape.block1);
	if (this.rows[this.rowCounter][this.colCounter].hit === true){
		return false;
	}
	this.pieceTracker(shape.block2);
	if (this.rows[this.rowCounter][this.colCounter].hit === true){
		return false;
	}
	this.pieceTracker(shape.block3);
	if (this.rows[this.rowCounter][this.colCounter].hit === true){
		return false;
	}
	this.pieceTracker(shape.block4);
	if (this.rows[this.rowCounter][this.colCounter].hit === true){
		return false;
	}
	return true;	
}


/* gameBoardSwitcher() */		
/* - Changes the hit property on the board where the block that is passed to it is */
/* - Called by gameBoardHit () below, not called explicity during execution  */
GameBoard.prototype.gameBoardSwitcher = function(block){

	this.pieceTracker(block);
	this.rows[this.rowCounter-1][this.colCounter].hit = true;
	this.rows[this.rowCounter-1][this.colCounter].pieceID = block.pieceID;

 }


/* gameBoardHit() */
/* - Passed in a shape, that is currently in execution */		
/* - Runs the gameBoardSwitcher () on each of the 4 blocks in shape */
GameBoard.prototype.gameBoardHit = function(shape){
	this.gameBoardSwitcher(shape.block1);

	this.gameBoardSwitcher(shape.block2);

	this.gameBoardSwitcher(shape.block3);
	
	this.gameBoardSwitcher(shape.block4);	
}

/*checkRowFull()*/
/* takes */
GameBoard.prototype.checkRowFull = function(){
	for (this.rowCounter=1; this.rowCounter<20; this.rowCounter++){
		for (this.colCounter=0; this.colCounter<20; this.colCounter++){
			if (this.rows[this.rowCounter-1][this.colCounter].hit === true){
				this.clearRow = true;
			}			
			else {
				this.clearRow = false;
				break;	
			};		 
		};
		if(this.clearRow)
			this.killRow();
	}	
};

GameBoard.prototype.killRow = function (piecesArray){


	/* Removes Filled Rows */
	for (var i=0; i<20; i++){
		this.blockID = '#pieceID_' + this.rows[this.rowCounter-1][i].pieceID;
		$(this.blockID).remove();
	}; 	

	/* Drops all remaining pieces */
	for (i=0; i<this.piecesArray.length; i++){
		this.blockID = '#pieceID_' + this.piecesArray[i].pieceID;
		this.newTop = $(this.blockID).css('top');
		if (this.newTop !== 475){
			this.newTop = parseInt(this.newTop);
			this.newTop = this.newTop + 25;
			$(this.blockID).animate({top: this.newTop}, {duration: 1, queue: false});	
		}		
	}; 	
	
	/* updates the gameboard collision */
	for (i=18; i>0; i--){
		for (j=0; j<20; j++){
			this.rows[i][j].hit = this.rows[i-1][j].hit;
			this.rows[i][j].pieceID = this.rows[i-1][j].pieceID;
		};
	};		
		
 };	


GameBoard.prototype.fillRows = function(){
	/* ROW 0 - Ceiling */

	this.rows[0][0] = {'top': 0, 'left': 0,     'hit': false, 'pieceID': 0};    
	this.rows[0][1] = {'top': 0, 'left': 25,    'hit': false, 'pieceID': 0};    
	this.rows[0][2] = {'top': 0, 'left': 50,    'hit': false, 'pieceID': 0};    
	this.rows[0][3] = {'top': 0, 'left': 75,    'hit': false, 'pieceID': 0};    
	this.rows[0][4] = {'top': 0, 'left': 100,   'hit': false, 'pieceID': 0};    
	this.rows[0][5] = {'top': 0, 'left': 125,   'hit': false, 'pieceID': 0};    
	this.rows[0][6] = {'top': 0, 'left': 150,   'hit': false, 'pieceID': 0};    
	this.rows[0][7] = {'top': 0, 'left': 175,   'hit': false, 'pieceID': 0};    
	this.rows[0][8] = {'top': 0, 'left': 200,   'hit': false, 'pieceID': 0};    
	this.rows[0][9] = {'top': 0, 'left': 225,   'hit': false, 'pieceID': 0};    
	this.rows[0][10]= {'top': 0, 'left': 250,   'hit': false, 'pieceID': 0};    
	this.rows[0][11]= {'top': 0, 'left': 275,   'hit': false, 'pieceID': 0};    
	this.rows[0][12]= {'top': 0, 'left': 300,   'hit': false, 'pieceID': 0};    
	this.rows[0][13]= {'top': 0, 'left': 325,   'hit': false, 'pieceID': 0};    
	this.rows[0][14]= {'top': 0, 'left': 350,   'hit': false, 'pieceID': 0};    
	this.rows[0][15]= {'top': 0, 'left': 375,   'hit': false, 'pieceID': 0};    
	this.rows[0][16]= {'top': 0, 'left': 400,   'hit': false, 'pieceID': 0};    
	this.rows[0][17]= {'top': 0, 'left': 425,   'hit': false, 'pieceID': 0};    
	this.rows[0][18]= {'top': 0, 'left': 450,   'hit': false, 'pieceID': 0};    
	this.rows[0][19]= {'top': 0, 'left': 475,   'hit': false, 'pieceID': 0};    

	/* ROW 1 */
	this.rows[1][0] = {'top': 25, 'left': 0,     'hit': false, 'pieceID': 0};  
	this.rows[1][1] = {'top': 25, 'left': 25,    'hit': false, 'pieceID': 0};  
	this.rows[1][2] = {'top': 25, 'left': 50,    'hit': false, 'pieceID': 0};  
	this.rows[1][3] = {'top': 25, 'left': 75,    'hit': false, 'pieceID': 0};  
	this.rows[1][4] = {'top': 25, 'left': 100,   'hit': false, 'pieceID': 0};  
	this.rows[1][5] = {'top': 25, 'left': 125,   'hit': false, 'pieceID': 0};  
	this.rows[1][6] = {'top': 25, 'left': 150,   'hit': false, 'pieceID': 0};  
	this.rows[1][7] = {'top': 25, 'left': 175,   'hit': false, 'pieceID': 0};  
	this.rows[1][8] = {'top': 25, 'left': 200,   'hit': false, 'pieceID': 0};  
	this.rows[1][9] = {'top': 25, 'left': 225,   'hit': false, 'pieceID': 0};  
	this.rows[1][10]= {'top': 25, 'left': 250,   'hit': false, 'pieceID': 0};  
	this.rows[1][11]= {'top': 25, 'left': 275,   'hit': false, 'pieceID': 0};  
	this.rows[1][12]= {'top': 25, 'left': 300,   'hit': false, 'pieceID': 0};  
	this.rows[1][13]= {'top': 25, 'left': 325,   'hit': false, 'pieceID': 0};  
	this.rows[1][14]= {'top': 25, 'left': 350,   'hit': false, 'pieceID': 0};  
	this.rows[1][15]= {'top': 25, 'left': 375,   'hit': false, 'pieceID': 0};  
	this.rows[1][16]= {'top': 25, 'left': 400,   'hit': false, 'pieceID': 0};  
	this.rows[1][17]= {'top': 25, 'left': 425,   'hit': false, 'pieceID': 0};  
	this.rows[1][18]= {'top': 25, 'left': 450,   'hit': false, 'pieceID': 0};  
	this.rows[1][19]= {'top': 25, 'left': 475,   'hit': false, 'pieceID': 0};     

	/* ROW 2 */
	this.rows[2][0] = {'top': 50, 'left': 0,     'hit': false, 'pieceID': 0};  
	this.rows[2][1] = {'top': 50, 'left': 25,    'hit': false, 'pieceID': 0};  
	this.rows[2][2] = {'top': 50, 'left': 50,    'hit': false, 'pieceID': 0};  
	this.rows[2][3] = {'top': 50, 'left': 75,    'hit': false, 'pieceID': 0};  
	this.rows[2][4] = {'top': 50, 'left': 100,   'hit': false, 'pieceID': 0};  
	this.rows[2][5] = {'top': 50, 'left': 125,   'hit': false, 'pieceID': 0};  
	this.rows[2][6] = {'top': 50, 'left': 150,   'hit': false, 'pieceID': 0};  
	this.rows[2][7] = {'top': 50, 'left': 175,   'hit': false, 'pieceID': 0};  
	this.rows[2][8] = {'top': 50, 'left': 200,   'hit': false, 'pieceID': 0};  
	this.rows[2][9] = {'top': 50, 'left': 225,   'hit': false, 'pieceID': 0};  
	this.rows[2][10]= {'top': 50, 'left': 250,   'hit': false, 'pieceID': 0};  
	this.rows[2][11]= {'top': 50, 'left': 275,   'hit': false, 'pieceID': 0};  
	this.rows[2][12]= {'top': 50, 'left': 300,   'hit': false, 'pieceID': 0};  
	this.rows[2][13]= {'top': 50, 'left': 325,   'hit': false, 'pieceID': 0};  
	this.rows[2][14]= {'top': 50, 'left': 350,   'hit': false, 'pieceID': 0};  
	this.rows[2][15]= {'top': 50, 'left': 375,   'hit': false, 'pieceID': 0};  
	this.rows[2][16]= {'top': 50, 'left': 400,   'hit': false, 'pieceID': 0};  
	this.rows[2][17]= {'top': 50, 'left': 425,   'hit': false, 'pieceID': 0};  
	this.rows[2][18]= {'top': 50, 'left': 450,   'hit': false, 'pieceID': 0};  
	this.rows[2][19]= {'top': 50, 'left': 475,   'hit': false, 'pieceID': 0};  

	/* ROW 3 */
	this.rows[3][0] = {'top': 75, 'left': 0,     'hit': false, 'pieceID': 0};  
	this.rows[3][1] = {'top': 75, 'left': 25,    'hit': false, 'pieceID': 0};  
	this.rows[3][2] = {'top': 75, 'left': 50,    'hit': false, 'pieceID': 0};  
	this.rows[3][3] = {'top': 75, 'left': 75,    'hit': false, 'pieceID': 0};  
	this.rows[3][4] = {'top': 75, 'left': 100,   'hit': false, 'pieceID': 0};  
	this.rows[3][5] = {'top': 75, 'left': 125,   'hit': false, 'pieceID': 0};  
	this.rows[3][6] = {'top': 75, 'left': 150,   'hit': false, 'pieceID': 0};  
	this.rows[3][7] = {'top': 75, 'left': 175,   'hit': false, 'pieceID': 0};  
	this.rows[3][8] = {'top': 75, 'left': 200,   'hit': false, 'pieceID': 0};  
	this.rows[3][9] = {'top': 75, 'left': 225,   'hit': false, 'pieceID': 0};  
	this.rows[3][10]= {'top': 75, 'left': 250,   'hit': false, 'pieceID': 0};  
	this.rows[3][11]= {'top': 75, 'left': 275,   'hit': false, 'pieceID': 0};  
	this.rows[3][12]= {'top': 75, 'left': 300,   'hit': false, 'pieceID': 0};  
	this.rows[3][13]= {'top': 75, 'left': 325,   'hit': false, 'pieceID': 0};  
	this.rows[3][14]= {'top': 75, 'left': 350,   'hit': false, 'pieceID': 0};  
	this.rows[3][15]= {'top': 75, 'left': 375,   'hit': false, 'pieceID': 0};  
	this.rows[3][16]= {'top': 75, 'left': 400,   'hit': false, 'pieceID': 0};  
	this.rows[3][17]= {'top': 75, 'left': 425,   'hit': false, 'pieceID': 0};  
	this.rows[3][18]= {'top': 75, 'left': 450,   'hit': false, 'pieceID': 0};  
	this.rows[3][19]= {'top': 75, 'left': 475,   'hit': false, 'pieceID': 0};  

	/* ROW 4 */
	this.rows[4][0] = {'top': 100, 'left': 0,     'hit': false, 'pieceID': 0};  
	this.rows[4][1] = {'top': 100, 'left': 25,    'hit': false, 'pieceID': 0};  
	this.rows[4][2] = {'top': 100, 'left': 50,    'hit': false, 'pieceID': 0};  
	this.rows[4][3] = {'top': 100, 'left': 75,    'hit': false, 'pieceID': 0};  
	this.rows[4][4] = {'top': 100, 'left': 100,   'hit': false, 'pieceID': 0};  
	this.rows[4][5] = {'top': 100, 'left': 125,   'hit': false, 'pieceID': 0};  
	this.rows[4][6] = {'top': 100, 'left': 150,   'hit': false, 'pieceID': 0};  
	this.rows[4][7] = {'top': 100, 'left': 175,   'hit': false, 'pieceID': 0};  
	this.rows[4][8] = {'top': 100, 'left': 200,   'hit': false, 'pieceID': 0};  
	this.rows[4][9] = {'top': 100, 'left': 225,   'hit': false, 'pieceID': 0};  
	this.rows[4][10]= {'top': 100, 'left': 250,   'hit': false, 'pieceID': 0};  
	this.rows[4][11]= {'top': 100, 'left': 275,   'hit': false, 'pieceID': 0};  
	this.rows[4][12]= {'top': 100, 'left': 300,   'hit': false, 'pieceID': 0};  
	this.rows[4][13]= {'top': 100, 'left': 325,   'hit': false, 'pieceID': 0};  
	this.rows[4][14]= {'top': 100, 'left': 350,   'hit': false, 'pieceID': 0};  
	this.rows[4][15]= {'top': 100, 'left': 375,   'hit': false, 'pieceID': 0};  
	this.rows[4][16]= {'top': 100, 'left': 400,   'hit': false, 'pieceID': 0};  
	this.rows[4][17]= {'top': 100, 'left': 425,   'hit': false, 'pieceID': 0};  
	this.rows[4][18]= {'top': 100, 'left': 450,   'hit': false, 'pieceID': 0};  
	this.rows[4][19]= {'top': 100, 'left': 475,   'hit': false, 'pieceID': 0};  

	/* ROW 5 */
	this.rows[5][0] = {'top': 125, 'left': 0,     'hit': false, 'pieceID': 0};  
	this.rows[5][1] = {'top': 125, 'left': 25,    'hit': false, 'pieceID': 0};  
	this.rows[5][2] = {'top': 125, 'left': 50,    'hit': false, 'pieceID': 0};  
	this.rows[5][3] = {'top': 125, 'left': 75,    'hit': false, 'pieceID': 0};  
	this.rows[5][4] = {'top': 125, 'left': 100,   'hit': false, 'pieceID': 0};  
	this.rows[5][5] = {'top': 125, 'left': 125,   'hit': false, 'pieceID': 0};  
	this.rows[5][6] = {'top': 125, 'left': 150,   'hit': false, 'pieceID': 0};  
	this.rows[5][7] = {'top': 125, 'left': 175,   'hit': false, 'pieceID': 0};  
	this.rows[5][8] = {'top': 125, 'left': 200,   'hit': false, 'pieceID': 0};  
	this.rows[5][9] = {'top': 125, 'left': 225,   'hit': false, 'pieceID': 0};  
	this.rows[5][10]= {'top': 125, 'left': 250,   'hit': false, 'pieceID': 0};  
	this.rows[5][11]= {'top': 125, 'left': 275,   'hit': false, 'pieceID': 0};  
	this.rows[5][12]= {'top': 125, 'left': 300,   'hit': false, 'pieceID': 0};  
	this.rows[5][13]= {'top': 125, 'left': 325,   'hit': false, 'pieceID': 0};  
	this.rows[5][14]= {'top': 125, 'left': 350,   'hit': false, 'pieceID': 0};  
	this.rows[5][15]= {'top': 125, 'left': 375,   'hit': false, 'pieceID': 0};  
	this.rows[5][16]= {'top': 125, 'left': 400,   'hit': false, 'pieceID': 0};  
	this.rows[5][17]= {'top': 125, 'left': 425,   'hit': false, 'pieceID': 0};  
	this.rows[5][18]= {'top': 125, 'left': 450,   'hit': false, 'pieceID': 0};  
	this.rows[5][19]= {'top': 125, 'left': 475,   'hit': false, 'pieceID': 0};  

	/* ROW 6 */
	this.rows[6][0] = {'top': 150, 'left': 0,     'hit': false, 'pieceID': 0};  
	this.rows[6][1] = {'top': 150, 'left': 25,    'hit': false, 'pieceID': 0};  
	this.rows[6][2] = {'top': 150, 'left': 50,    'hit': false, 'pieceID': 0};  
	this.rows[6][3] = {'top': 150, 'left': 75,    'hit': false, 'pieceID': 0};  
	this.rows[6][4] = {'top': 150, 'left': 100,   'hit': false, 'pieceID': 0};  
	this.rows[6][5] = {'top': 150, 'left': 125,   'hit': false, 'pieceID': 0};  
	this.rows[6][6] = {'top': 150, 'left': 150,   'hit': false, 'pieceID': 0};  
	this.rows[6][7] = {'top': 150, 'left': 175,   'hit': false, 'pieceID': 0};  
	this.rows[6][8] = {'top': 150, 'left': 200,   'hit': false, 'pieceID': 0};  
	this.rows[6][9] = {'top': 150, 'left': 225,   'hit': false, 'pieceID': 0};  
	this.rows[6][10]= {'top': 150, 'left': 250,   'hit': false, 'pieceID': 0};  
	this.rows[6][11]= {'top': 150, 'left': 275,   'hit': false, 'pieceID': 0};  
	this.rows[6][12]= {'top': 150, 'left': 300,   'hit': false, 'pieceID': 0};  
	this.rows[6][13]= {'top': 150, 'left': 325,   'hit': false, 'pieceID': 0};  
	this.rows[6][14]= {'top': 150, 'left': 350,   'hit': false, 'pieceID': 0};  
	this.rows[6][15]= {'top': 150, 'left': 375,   'hit': false, 'pieceID': 0};  
	this.rows[6][16]= {'top': 150, 'left': 400,   'hit': false, 'pieceID': 0};  
	this.rows[6][17]= {'top': 150, 'left': 425,   'hit': false, 'pieceID': 0};  
	this.rows[6][18]= {'top': 150, 'left': 450,   'hit': false, 'pieceID': 0};  
	this.rows[6][19]= {'top': 150, 'left': 475,   'hit': false, 'pieceID': 0};  

	/* ROW 7 */
	this.rows[7][0] = {'top': 175, 'left': 0,     'hit': false, 'pieceID': 0};  
	this.rows[7][1] = {'top': 175, 'left': 25,    'hit': false, 'pieceID': 0};  
	this.rows[7][2] = {'top': 175, 'left': 50,    'hit': false, 'pieceID': 0};  
	this.rows[7][3] = {'top': 175, 'left': 75,    'hit': false, 'pieceID': 0};  
	this.rows[7][4] = {'top': 175, 'left': 100,   'hit': false, 'pieceID': 0};  
	this.rows[7][5] = {'top': 175, 'left': 125,   'hit': false, 'pieceID': 0};  
	this.rows[7][6] = {'top': 175, 'left': 150,   'hit': false, 'pieceID': 0};  
	this.rows[7][7] = {'top': 175, 'left': 175,   'hit': false, 'pieceID': 0};  
	this.rows[7][8] = {'top': 175, 'left': 200,   'hit': false, 'pieceID': 0};  
	this.rows[7][9] = {'top': 175, 'left': 225,   'hit': false, 'pieceID': 0};  
	this.rows[7][10]= {'top': 175, 'left': 250,   'hit': false, 'pieceID': 0};  
	this.rows[7][11]= {'top': 175, 'left': 275,   'hit': false, 'pieceID': 0};  
	this.rows[7][12]= {'top': 175, 'left': 300,   'hit': false, 'pieceID': 0};  
	this.rows[7][13]= {'top': 175, 'left': 325,   'hit': false, 'pieceID': 0};  
	this.rows[7][14]= {'top': 175, 'left': 350,   'hit': false, 'pieceID': 0};  
	this.rows[7][15]= {'top': 175, 'left': 375,   'hit': false, 'pieceID': 0};  
	this.rows[7][16]= {'top': 175, 'left': 400,   'hit': false, 'pieceID': 0};  
	this.rows[7][17]= {'top': 175, 'left': 425,   'hit': false, 'pieceID': 0};  
	this.rows[7][18]= {'top': 175, 'left': 450,   'hit': false, 'pieceID': 0};  
	this.rows[7][19]= {'top': 175, 'left': 475,   'hit': false, 'pieceID': 0};

	/* ROW 8 */
	this.rows[8][0] = {'top': 200, 'left': 0,     'hit': false, 'pieceID': 0};  
	this.rows[8][1] = {'top': 200, 'left': 25,    'hit': false, 'pieceID': 0};  
	this.rows[8][2] = {'top': 200, 'left': 50,    'hit': false, 'pieceID': 0};  
	this.rows[8][3] = {'top': 200, 'left': 75,    'hit': false, 'pieceID': 0};  
	this.rows[8][4] = {'top': 200, 'left': 100,   'hit': false, 'pieceID': 0};  
	this.rows[8][5] = {'top': 200, 'left': 125,   'hit': false, 'pieceID': 0};  
	this.rows[8][6] = {'top': 200, 'left': 150,   'hit': false, 'pieceID': 0};  
	this.rows[8][7] = {'top': 200, 'left': 175,   'hit': false, 'pieceID': 0};  
	this.rows[8][8] = {'top': 200, 'left': 200,   'hit': false, 'pieceID': 0};  
	this.rows[8][9] = {'top': 200, 'left': 225,   'hit': false, 'pieceID': 0};  
	this.rows[8][10]= {'top': 200, 'left': 250,   'hit': false, 'pieceID': 0};  
	this.rows[8][11]= {'top': 200, 'left': 275,   'hit': false, 'pieceID': 0};  
	this.rows[8][12]= {'top': 200, 'left': 300,   'hit': false, 'pieceID': 0};  
	this.rows[8][13]= {'top': 200, 'left': 325,   'hit': false, 'pieceID': 0};  
	this.rows[8][14]= {'top': 200, 'left': 350,   'hit': false, 'pieceID': 0};  
	this.rows[8][15]= {'top': 200, 'left': 375,   'hit': false, 'pieceID': 0};  
	this.rows[8][16]= {'top': 200, 'left': 400,   'hit': false, 'pieceID': 0};  
	this.rows[8][17]= {'top': 200, 'left': 425,   'hit': false, 'pieceID': 0};  
	this.rows[8][18]= {'top': 200, 'left': 450,   'hit': false, 'pieceID': 0};  
	this.rows[8][19]= {'top': 200, 'left': 475,   'hit': false, 'pieceID': 0};  

	/* ROW 9 */
	this.rows[9][0] = {'top': 225, 'left': 0,     'hit': false, 'pieceID': 0};  
	this.rows[9][1] = {'top': 225, 'left': 25,    'hit': false, 'pieceID': 0};  
	this.rows[9][2] = {'top': 225, 'left': 50,    'hit': false, 'pieceID': 0};  
	this.rows[9][3] = {'top': 225, 'left': 75,    'hit': false, 'pieceID': 0};  
	this.rows[9][4] = {'top': 225, 'left': 100,   'hit': false, 'pieceID': 0};  
	this.rows[9][5] = {'top': 225, 'left': 125,   'hit': false, 'pieceID': 0};  
	this.rows[9][6] = {'top': 225, 'left': 150,   'hit': false, 'pieceID': 0};  
	this.rows[9][7] = {'top': 225, 'left': 175,   'hit': false, 'pieceID': 0};  
	this.rows[9][8] = {'top': 225, 'left': 200,   'hit': false, 'pieceID': 0};  
	this.rows[9][9] = {'top': 225, 'left': 225,   'hit': false, 'pieceID': 0};  
	this.rows[9][10]= {'top': 225, 'left': 250,   'hit': false, 'pieceID': 0};  
	this.rows[9][11]= {'top': 225, 'left': 275,   'hit': false, 'pieceID': 0};  
	this.rows[9][12]= {'top': 225, 'left': 300,   'hit': false, 'pieceID': 0};  
	this.rows[9][13]= {'top': 225, 'left': 325,   'hit': false, 'pieceID': 0};  
	this.rows[9][14]= {'top': 225, 'left': 350,   'hit': false, 'pieceID': 0};  
	this.rows[9][15]= {'top': 225, 'left': 375,   'hit': false, 'pieceID': 0};  
	this.rows[9][16]= {'top': 225, 'left': 400,   'hit': false, 'pieceID': 0};  
	this.rows[9][17]= {'top': 225, 'left': 425,   'hit': false, 'pieceID': 0};  
	this.rows[9][18]= {'top': 225, 'left': 450,   'hit': false, 'pieceID': 0};  
	this.rows[9][19]= {'top': 225, 'left': 475,   'hit': false, 'pieceID': 0};  

	/* ROW 10 */
	this.rows[10][0] = {'top': 250, 'left': 0,     'hit': false, 'pieceID': 0};  
	this.rows[10][1] = {'top': 250, 'left': 25,    'hit': false, 'pieceID': 0};  
	this.rows[10][2] = {'top': 250, 'left': 50,    'hit': false, 'pieceID': 0};  
	this.rows[10][3] = {'top': 250, 'left': 75,    'hit': false, 'pieceID': 0};  
	this.rows[10][4] = {'top': 250, 'left': 100,   'hit': false, 'pieceID': 0};  
	this.rows[10][5] = {'top': 250, 'left': 125,   'hit': false, 'pieceID': 0};  
	this.rows[10][6] = {'top': 250, 'left': 150,   'hit': false, 'pieceID': 0};  
	this.rows[10][7] = {'top': 250, 'left': 175,   'hit': false, 'pieceID': 0};  
	this.rows[10][8] = {'top': 250, 'left': 200,   'hit': false, 'pieceID': 0};  
	this.rows[10][9] = {'top': 250, 'left': 225,   'hit': false, 'pieceID': 0};  
	this.rows[10][10]= {'top': 250, 'left': 250,   'hit': false, 'pieceID': 0};  
	this.rows[10][11]= {'top': 250, 'left': 275,   'hit': false, 'pieceID': 0};  
	this.rows[10][12]= {'top': 250, 'left': 300,   'hit': false, 'pieceID': 0};  
	this.rows[10][13]= {'top': 250, 'left': 325,   'hit': false, 'pieceID': 0};  
	this.rows[10][14]= {'top': 250, 'left': 350,   'hit': false, 'pieceID': 0};  
	this.rows[10][15]= {'top': 250, 'left': 375,   'hit': false, 'pieceID': 0};  
	this.rows[10][16]= {'top': 250, 'left': 400,   'hit': false, 'pieceID': 0};  
	this.rows[10][17]= {'top': 250, 'left': 425,   'hit': false, 'pieceID': 0};  
	this.rows[10][18]= {'top': 250, 'left': 450,   'hit': false, 'pieceID': 0};  
	this.rows[10][19]= {'top': 250, 'left': 475,   'hit': false, 'pieceID': 0}; 

	/* ROW 11 */
	this.rows[11][0] = {'top': 275, 'left': 0,     'hit': false, 'pieceID': 0};  
	this.rows[11][1] = {'top': 275, 'left': 25,    'hit': false, 'pieceID': 0};  
	this.rows[11][2] = {'top': 275, 'left': 50,    'hit': false, 'pieceID': 0};  
	this.rows[11][3] = {'top': 275, 'left': 75,    'hit': false, 'pieceID': 0};  
	this.rows[11][4] = {'top': 275, 'left': 100,   'hit': false, 'pieceID': 0};  
	this.rows[11][5] = {'top': 275, 'left': 125,   'hit': false, 'pieceID': 0};  
	this.rows[11][6] = {'top': 275, 'left': 150,   'hit': false, 'pieceID': 0};  
	this.rows[11][7] = {'top': 275, 'left': 175,   'hit': false, 'pieceID': 0};  
	this.rows[11][8] = {'top': 275, 'left': 200,   'hit': false, 'pieceID': 0};  
	this.rows[11][9] = {'top': 275, 'left': 225,   'hit': false, 'pieceID': 0};  
	this.rows[11][10]= {'top': 275, 'left': 250,   'hit': false, 'pieceID': 0};  
	this.rows[11][11]= {'top': 275, 'left': 275,   'hit': false, 'pieceID': 0};  
	this.rows[11][12]= {'top': 275, 'left': 300,   'hit': false, 'pieceID': 0};  
	this.rows[11][13]= {'top': 275, 'left': 325,   'hit': false, 'pieceID': 0};  
	this.rows[11][14]= {'top': 275, 'left': 350,   'hit': false, 'pieceID': 0};  
	this.rows[11][15]= {'top': 275, 'left': 375,   'hit': false, 'pieceID': 0};  
	this.rows[11][16]= {'top': 275, 'left': 400,   'hit': false, 'pieceID': 0};  
	this.rows[11][17]= {'top': 275, 'left': 425,   'hit': false, 'pieceID': 0};  
	this.rows[11][18]= {'top': 275, 'left': 450,   'hit': false, 'pieceID': 0};  
	this.rows[11][19]= {'top': 275, 'left': 475,   'hit': false, 'pieceID': 0}; 

	/* ROW 12 */
	this.rows[12][0] = {'top': 300, 'left': 0,     'hit': false, 'pieceID': 0};  
	this.rows[12][1] = {'top': 300, 'left': 25,    'hit': false, 'pieceID': 0};  
	this.rows[12][2] = {'top': 300, 'left': 50,    'hit': false, 'pieceID': 0};  
	this.rows[12][3] = {'top': 300, 'left': 75,    'hit': false, 'pieceID': 0};  
	this.rows[12][4] = {'top': 300, 'left': 100,   'hit': false, 'pieceID': 0};  
	this.rows[12][5] = {'top': 300, 'left': 125,   'hit': false, 'pieceID': 0};  
	this.rows[12][6] = {'top': 300, 'left': 150,   'hit': false, 'pieceID': 0};  
	this.rows[12][7] = {'top': 300, 'left': 175,   'hit': false, 'pieceID': 0};  
	this.rows[12][8] = {'top': 300, 'left': 200,   'hit': false, 'pieceID': 0};  
	this.rows[12][9] = {'top': 300, 'left': 225,   'hit': false, 'pieceID': 0};  
	this.rows[12][10]= {'top': 300, 'left': 250,   'hit': false, 'pieceID': 0};  
	this.rows[12][11]= {'top': 300, 'left': 275,   'hit': false, 'pieceID': 0};  
	this.rows[12][12]= {'top': 300, 'left': 300,   'hit': false, 'pieceID': 0};  
	this.rows[12][13]= {'top': 300, 'left': 325,   'hit': false, 'pieceID': 0};  
	this.rows[12][14]= {'top': 300, 'left': 350,   'hit': false, 'pieceID': 0};  
	this.rows[12][15]= {'top': 300, 'left': 375,   'hit': false, 'pieceID': 0};  
	this.rows[12][16]= {'top': 300, 'left': 400,   'hit': false, 'pieceID': 0};  
	this.rows[12][17]= {'top': 300, 'left': 425,   'hit': false, 'pieceID': 0};  
	this.rows[12][18]= {'top': 300, 'left': 450,   'hit': false, 'pieceID': 0};  
	this.rows[12][19]= {'top': 300, 'left': 475,   'hit': false, 'pieceID': 0}; 

	/* ROW 13 */
	this.rows[13][0] = {'top': 325, 'left': 0,     'hit': false, 'pieceID': 0};  
	this.rows[13][1] = {'top': 325, 'left': 25,    'hit': false, 'pieceID': 0};  
	this.rows[13][2] = {'top': 325, 'left': 50,    'hit': false, 'pieceID': 0};  
	this.rows[13][3] = {'top': 325, 'left': 75,    'hit': false, 'pieceID': 0};  
	this.rows[13][4] = {'top': 325, 'left': 100,   'hit': false, 'pieceID': 0};  
	this.rows[13][5] = {'top': 325, 'left': 125,   'hit': false, 'pieceID': 0};  
	this.rows[13][6] = {'top': 325, 'left': 150,   'hit': false, 'pieceID': 0};  
	this.rows[13][7] = {'top': 325, 'left': 175,   'hit': false, 'pieceID': 0};  
	this.rows[13][8] = {'top': 325, 'left': 200,   'hit': false, 'pieceID': 0};  
	this.rows[13][9] = {'top': 325, 'left': 225,   'hit': false, 'pieceID': 0};  
	this.rows[13][10]= {'top': 325, 'left': 250,   'hit': false, 'pieceID': 0};  
	this.rows[13][11]= {'top': 325, 'left': 275,   'hit': false, 'pieceID': 0};  
	this.rows[13][12]= {'top': 325, 'left': 300,   'hit': false, 'pieceID': 0};  
	this.rows[13][13]= {'top': 325, 'left': 325,   'hit': false, 'pieceID': 0};  
	this.rows[13][14]= {'top': 325, 'left': 350,   'hit': false, 'pieceID': 0};  
	this.rows[13][15]= {'top': 325, 'left': 375,   'hit': false, 'pieceID': 0};  
	this.rows[13][16]= {'top': 325, 'left': 400,   'hit': false, 'pieceID': 0};  
	this.rows[13][17]= {'top': 325, 'left': 425,   'hit': false, 'pieceID': 0};  
	this.rows[13][18]= {'top': 325, 'left': 450,   'hit': false, 'pieceID': 0};  
	this.rows[13][19]= {'top': 325, 'left': 475,   'hit': false, 'pieceID': 0}; 

	/* ROW 14 */
	this.rows[14][0] = {'top': 350, 'left': 0,     'hit': false, 'pieceID': 0};  
	this.rows[14][1] = {'top': 350, 'left': 25,    'hit': false, 'pieceID': 0};  
	this.rows[14][2] = {'top': 350, 'left': 50,    'hit': false, 'pieceID': 0};  
	this.rows[14][3] = {'top': 350, 'left': 75,    'hit': false, 'pieceID': 0};  
	this.rows[14][4] = {'top': 350, 'left': 100,   'hit': false, 'pieceID': 0};  
	this.rows[14][5] = {'top': 350, 'left': 125,   'hit': false, 'pieceID': 0};  
	this.rows[14][6] = {'top': 350, 'left': 150,   'hit': false, 'pieceID': 0};  
	this.rows[14][7] = {'top': 350, 'left': 175,   'hit': false, 'pieceID': 0};  
	this.rows[14][8] = {'top': 350, 'left': 200,   'hit': false, 'pieceID': 0};  
	this.rows[14][9] = {'top': 350, 'left': 225,   'hit': false, 'pieceID': 0};  
	this.rows[14][10]= {'top': 350, 'left': 250,   'hit': false, 'pieceID': 0};  
	this.rows[14][11]= {'top': 350, 'left': 275,   'hit': false, 'pieceID': 0};  
	this.rows[14][12]= {'top': 350, 'left': 300,   'hit': false, 'pieceID': 0};  
	this.rows[14][13]= {'top': 350, 'left': 325,   'hit': false, 'pieceID': 0};  
	this.rows[14][14]= {'top': 350, 'left': 350,   'hit': false, 'pieceID': 0};  
	this.rows[14][15]= {'top': 350, 'left': 375,   'hit': false, 'pieceID': 0};  
	this.rows[14][16]= {'top': 350, 'left': 400,   'hit': false, 'pieceID': 0};  
	this.rows[14][17]= {'top': 350, 'left': 425,   'hit': false, 'pieceID': 0};  
	this.rows[14][18]= {'top': 350, 'left': 450,   'hit': false, 'pieceID': 0};  
	this.rows[14][19]= {'top': 350, 'left': 475,   'hit': false, 'pieceID': 0}; 

	/* ROW 15 */
	this.rows[15][0] = {'top': 375, 'left': 0,     'hit': false, 'pieceID': 0};  
	this.rows[15][1] = {'top': 375, 'left': 25,    'hit': false, 'pieceID': 0};  
	this.rows[15][2] = {'top': 375, 'left': 50,    'hit': false, 'pieceID': 0};  
	this.rows[15][3] = {'top': 375, 'left': 75,    'hit': false, 'pieceID': 0};  
	this.rows[15][4] = {'top': 375, 'left': 100,   'hit': false, 'pieceID': 0};  
	this.rows[15][5] = {'top': 375, 'left': 125,   'hit': false, 'pieceID': 0};  
	this.rows[15][6] = {'top': 375, 'left': 150,   'hit': false, 'pieceID': 0};  
	this.rows[15][7] = {'top': 375, 'left': 175,   'hit': false, 'pieceID': 0};  
	this.rows[15][8] = {'top': 375, 'left': 200,   'hit': false, 'pieceID': 0};  
	this.rows[15][9] = {'top': 375, 'left': 225,   'hit': false, 'pieceID': 0};  
	this.rows[15][10]= {'top': 375, 'left': 250,   'hit': false, 'pieceID': 0};  
	this.rows[15][11]= {'top': 375, 'left': 275,   'hit': false, 'pieceID': 0};  
	this.rows[15][12]= {'top': 375, 'left': 300,   'hit': false, 'pieceID': 0};  
	this.rows[15][13]= {'top': 375, 'left': 325,   'hit': false, 'pieceID': 0};  
	this.rows[15][14]= {'top': 375, 'left': 350,   'hit': false, 'pieceID': 0};  
	this.rows[15][15]= {'top': 375, 'left': 375,   'hit': false, 'pieceID': 0};  
	this.rows[15][16]= {'top': 375, 'left': 400,   'hit': false, 'pieceID': 0};  
	this.rows[15][17]= {'top': 375, 'left': 425,   'hit': false, 'pieceID': 0};  
	this.rows[15][18]= {'top': 375, 'left': 450,   'hit': false, 'pieceID': 0};  
	this.rows[15][19]= {'top': 375, 'left': 475,   'hit': false, 'pieceID': 0}; 

	/* ROW 16 */
	this.rows[16][0] = {'top': 400, 'left': 0,     'hit': false, 'pieceID': 0};  
	this.rows[16][1] = {'top': 400, 'left': 25,    'hit': false, 'pieceID': 0};  
	this.rows[16][2] = {'top': 400, 'left': 50,    'hit': false, 'pieceID': 0};  
	this.rows[16][3] = {'top': 400, 'left': 75,    'hit': false, 'pieceID': 0};  
	this.rows[16][4] = {'top': 400, 'left': 100,   'hit': false, 'pieceID': 0};  
	this.rows[16][5] = {'top': 400, 'left': 125,   'hit': false, 'pieceID': 0};  
	this.rows[16][6] = {'top': 400, 'left': 150,   'hit': false, 'pieceID': 0};  
	this.rows[16][7] = {'top': 400, 'left': 175,   'hit': false, 'pieceID': 0};  
	this.rows[16][8] = {'top': 400, 'left': 200,   'hit': false, 'pieceID': 0};  
	this.rows[16][9] = {'top': 400, 'left': 225,   'hit': false, 'pieceID': 0};  
	this.rows[16][10]= {'top': 400, 'left': 250,   'hit': false, 'pieceID': 0};  
	this.rows[16][11]= {'top': 400, 'left': 275,   'hit': false, 'pieceID': 0};  
	this.rows[16][12]= {'top': 400, 'left': 300,   'hit': false, 'pieceID': 0};  
	this.rows[16][13]= {'top': 400, 'left': 325,   'hit': false, 'pieceID': 0};  
	this.rows[16][14]= {'top': 400, 'left': 350,   'hit': false, 'pieceID': 0};  
	this.rows[16][15]= {'top': 400, 'left': 375,   'hit': false, 'pieceID': 0};  
	this.rows[16][16]= {'top': 400, 'left': 400,   'hit': false, 'pieceID': 0};  
	this.rows[16][17]= {'top': 400, 'left': 425,   'hit': false, 'pieceID': 0};  
	this.rows[16][18]= {'top': 400, 'left': 450,   'hit': false, 'pieceID': 0};  
	this.rows[16][19]= {'top': 400, 'left': 475,   'hit': false, 'pieceID': 0}; 

	/* ROW 17 */
	this.rows[17][0] = {'top': 425, 'left': 0,     'hit': false, 'pieceID': 0};  
	this.rows[17][1] = {'top': 425, 'left': 25,    'hit': false, 'pieceID': 0};  
	this.rows[17][2] = {'top': 425, 'left': 50,    'hit': false, 'pieceID': 0};  
	this.rows[17][3] = {'top': 425, 'left': 75,    'hit': false, 'pieceID': 0};  
	this.rows[17][4] = {'top': 425, 'left': 100,   'hit': false, 'pieceID': 0};  
	this.rows[17][5] = {'top': 425, 'left': 125,   'hit': false, 'pieceID': 0};  
	this.rows[17][6] = {'top': 425, 'left': 150,   'hit': false, 'pieceID': 0};  
	this.rows[17][7] = {'top': 425, 'left': 175,   'hit': false, 'pieceID': 0};  
	this.rows[17][8] = {'top': 425, 'left': 200,   'hit': false, 'pieceID': 0};  
	this.rows[17][9] = {'top': 425, 'left': 225,   'hit': false, 'pieceID': 0};  
	this.rows[17][10]= {'top': 425, 'left': 250,   'hit': false, 'pieceID': 0};  
	this.rows[17][11]= {'top': 425, 'left': 275,   'hit': false, 'pieceID': 0};  
	this.rows[17][12]= {'top': 425, 'left': 300,   'hit': false, 'pieceID': 0};  
	this.rows[17][13]= {'top': 425, 'left': 325,   'hit': false, 'pieceID': 0};  
	this.rows[17][14]= {'top': 425, 'left': 350,   'hit': false, 'pieceID': 0};  
	this.rows[17][15]= {'top': 425, 'left': 375,   'hit': false, 'pieceID': 0};  
	this.rows[17][16]= {'top': 425, 'left': 400,   'hit': false, 'pieceID': 0};  
	this.rows[17][17]= {'top': 425, 'left': 425,   'hit': false, 'pieceID': 0};  
	this.rows[17][18]= {'top': 425, 'left': 450,   'hit': false, 'pieceID': 0};  
	this.rows[17][19]= {'top': 425, 'left': 475,   'hit': false, 'pieceID': 0}; 

	/* ROW 18 */
	this.rows[18][0] = {'top': 450, 'left': 0,     'hit': false, 'pieceID': 0};  
	this.rows[18][1] = {'top': 450, 'left': 25,    'hit': false, 'pieceID': 0};  
	this.rows[18][2] = {'top': 450, 'left': 50,    'hit': false, 'pieceID': 0};  
	this.rows[18][3] = {'top': 450, 'left': 75,    'hit': false, 'pieceID': 0};  
	this.rows[18][4] = {'top': 450, 'left': 100,   'hit': false, 'pieceID': 0};  
	this.rows[18][5] = {'top': 450, 'left': 125,   'hit': false, 'pieceID': 0};  
	this.rows[18][6] = {'top': 450, 'left': 150,   'hit': false, 'pieceID': 0};  
	this.rows[18][7] = {'top': 450, 'left': 175,   'hit': false, 'pieceID': 0};  
	this.rows[18][8] = {'top': 450, 'left': 200,   'hit': false, 'pieceID': 0};  
	this.rows[18][9] = {'top': 450, 'left': 225,   'hit': false, 'pieceID': 0};  
	this.rows[18][10]= {'top': 450, 'left': 250,   'hit': false, 'pieceID': 0};  
	this.rows[18][11]= {'top': 450, 'left': 275,   'hit': false, 'pieceID': 0};  
	this.rows[18][12]= {'top': 450, 'left': 300,   'hit': false, 'pieceID': 0};  
	this.rows[18][13]= {'top': 450, 'left': 325,   'hit': false, 'pieceID': 0};  
	this.rows[18][14]= {'top': 450, 'left': 350,   'hit': false, 'pieceID': 0};  
	this.rows[18][15]= {'top': 450, 'left': 375,   'hit': false, 'pieceID': 0};  
	this.rows[18][16]= {'top': 450, 'left': 400,   'hit': false, 'pieceID': 0};  
	this.rows[18][17]= {'top': 450, 'left': 425,   'hit': false, 'pieceID': 0};  
	this.rows[18][18]= {'top': 450, 'left': 450,   'hit': false, 'pieceID': 0};  
	this.rows[18][19]= {'top': 450, 'left': 475,   'hit': false, 'pieceID': 0}; 

	/* ROW 19 */
	this.rows[19][0] = {'top': 475, 'left': 0,     'hit': true, 'pieceID': 0};  
	this.rows[19][1] = {'top': 475, 'left': 25,    'hit': true, 'pieceID': 0};  
	this.rows[19][2] = {'top': 475, 'left': 50,    'hit': true, 'pieceID': 0};  
	this.rows[19][3] = {'top': 475, 'left': 75,    'hit': true, 'pieceID': 0};  
	this.rows[19][4] = {'top': 475, 'left': 100,   'hit': true, 'pieceID': 0};  
	this.rows[19][5] = {'top': 475, 'left': 125,   'hit': true, 'pieceID': 0};  
	this.rows[19][6] = {'top': 475, 'left': 150,   'hit': true, 'pieceID': 0};  
	this.rows[19][7] = {'top': 475, 'left': 175,   'hit': true, 'pieceID': 0};  
	this.rows[19][8] = {'top': 475, 'left': 200,   'hit': true, 'pieceID': 0};  
	this.rows[19][9] = {'top': 475, 'left': 225,   'hit': true, 'pieceID': 0};  
	this.rows[19][10]= {'top': 475, 'left': 250,   'hit': true, 'pieceID': 0};  
	this.rows[19][11]= {'top': 475, 'left': 275,   'hit': true, 'pieceID': 0};  
	this.rows[19][12]= {'top': 475, 'left': 300,   'hit': true, 'pieceID': 0};  
	this.rows[19][13]= {'top': 475, 'left': 325,   'hit': true, 'pieceID': 0};  
	this.rows[19][14]= {'top': 475, 'left': 350,   'hit': true, 'pieceID': 0};  
	this.rows[19][15]= {'top': 475, 'left': 375,   'hit': true, 'pieceID': 0};  
	this.rows[19][16]= {'top': 475, 'left': 400,   'hit': true, 'pieceID': 0};  
	this.rows[19][17]= {'top': 475, 'left': 425,   'hit': true, 'pieceID': 0};  
	this.rows[19][18]= {'top': 475, 'left': 450,   'hit': true, 'pieceID': 0};  
	this.rows[19][19]= {'top': 475, 'left': 475,   'hit': true, 'pieceID': 0}; 

}
	
var gameboard = new GameBoard();
gameboard.fillRows();
//console.log(gameboard); //checks to make sure gameboard object created successfully */