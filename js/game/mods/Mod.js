class Mod{

    constructor(canvas){
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");

        this.pieces_available  = ["z", "o", "i", "s", "j", "l", "t"];
        this.playfield = new Playfield(10, 20);
        this.styles = new PlayfieldStyle();
        this.score = 0;
        this.level = 1;
        this.speed = Math.pow( (0.8-((this.level-1)*0.007)) , (this.level-1) )*1500;
        
        this.randomizer = new BagRandomizer(this.pieces_available, 1);
        this.previewCount = 3;
        this.nextPieces = Array(this.previewCount);
        for(let p =0; p < this.previewCount; p++)
        {
            this.nextPieces[p] = this.randomizer.getPiece();
        }
        this.piece = this.__getNextPiece();

        this.updateCanvasSize();

    }

    __drawMatrix(context, matrix, offset={x: 0, y: 0}, renderEmpty = true){
        matrix.forEach((row, y) => { // Foreach row
            row.forEach((value, x) => { // and Foreach column
                if( (0 !== value) ||
                    (0 === value && renderEmpty)
                )
                {
                    this.__drawCell(
                        context,
                        (x+ offset.x), // x
                        (y+offset.y),  // y
                        value
                    );
                }
            });
        });
    }
    
    __drawCell(context, x, y, value) {
        context.fillStyle = value === 0 ? this.styles.backgroundColor : this.styles.piecesColors[value];
        context.fillRect(
                x*this.styles.cellSize, y*this.styles.cellSize, // (X, Y) Origin
                this.styles.cellSize, // Height
                this.styles.cellSize  // Width
        );
        context.strokeStyle = this.styles.cellStrokeColor;
        context.strokeRect(x*this.styles.cellSize, y*this.styles.cellSize,
            this.styles.cellSize,
            this.styles.cellSize);
    }

    movePieceLeft()
    {
        this.piece.pos.x--;
        if(this.playfield.collide(this.piece))
        {
            this.piece.pos.x++;
        }
    }
    
    movePieceRight()
    {
        this.piece.pos.x++;
        if(this.playfield.collide(this.piece))
        {
            this.piece.pos.x--;
        }
    }

    pieceDrop(){
        this.dropCounter = 0;

        this.piece.pos.y++;

        if(this.playfield.collide(this.piece))
        {
            this.piece.pos.y--;
            this.playfield.merge(this.piece);
            this.piece = this.__getNextPiece();
            this.score += this.playfield.sweep();
            this.__updateScore();
        }

    }
    rotatePieceClockwise()
    {
        this.piece.rotateClockwise();
    }

    rotatePieceCounterClockwise()
    {
        this.piece.rotateCounterClockwise();
    }

    /**
     * Removes the first piece of next ones
     * and push a new piece from one given by the randomizer  
     */
    __getNextPiece()
    {       
        let piece = this.nextPieces.shift();
        this.nextPieces.push(this.randomizer.getPiece());
        piece.pos.x = (this.playfield.column-piece.matrix.length) % 2 === 0 ? (this.playfield.column-piece.matrix.length)/2 : (this.playfield.column-piece.matrix.length-1)/2;
        return piece;
    }

    updateCanvasSize(){
        this.canvas.width = this.styles.cellSize * this.playfield.column;
        this.canvas.height = this.styles.cellSize * this.playfield.row;
    }
    
}