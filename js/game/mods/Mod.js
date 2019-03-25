class Mod{

    constructor(canvas){
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");

        this.pieces_available  = ["z", "o", "i", "s", "j", "l", "t"];
        this.playfield = new Playfield(12, 20);
        this.styles = new PlayfieldStyle();
        this.score = 0;
        this.level = 1;
        this.speed = Math.pow( (0.8-((this.level-1)*0.007)) , (this.level-1) )*1500;
        this.randomizer = new BagRandomizer(this.pieces_available, 1);
        this.piece = this.__getNewPiece();
        this.updateCanvasSize();

    }

    __drawMatrix(matrix, offset){
        matrix.forEach((row, y) => { // Foreach row
            row.forEach((value, x) => { // and Foreach column
                this.__drawCell(
                    (x+ offset.x), // x
                    (y+offset.y),  // y
                    matrix[y][x]
                );
            });
        });
    }
    
    __drawCell(x, y, value) {
        this.context.fillStyle = (0 === value) ? this.styles.backgroundColor: this.styles.piecesColors[value];
        this.context.fillRect(
                x*this.styles.cellSize, y*this.styles.cellSize, // (X, Y) Origin
                this.styles.cellSize, // Height
                this.styles.cellSize  // Width
        );
        this.context.strokeStyle = this.styles.cellStrokeColor;
        this.context.strokeRect(x*this.styles.cellSize, y*this.styles.cellSize,
            this.styles.cellSize,
            this.styles.cellSize);
    }

    movePieceLeft()
    {
        this.piece.pos.x--;
    }
    
    movePieceRight()
    {
        this.piece.pos.x++;
    }

    pieceDrop(){
        this.piece.pos.y++;
        if(this.playfield.collide(this.piece))
        {
            this.piece.pos.y--;
            this.playfield.merge(this.piece);
            this.piece = this.__getNewPiece();
        }
        this.dropCounter = 0;

    }
    rotatePieceClockwise()
    {
        this.piece.rotateClockwise();
    }

    rotatePieceCounterClockwise()
    {
        this.piece.rotateCounterClockwise();
    }

    __getNewPiece()
    {
        console.log("Getting new piece.");
        let piece = new Piece(this.randomizer.getPieceName(), this.playfield.cellSize);
        piece.pos.x = (this.playfield.column / 2 | 0) - (piece.matrix[0].length / 2 | 0);
        console.log(piece);
        return piece;
    }

    updateCanvasSize(){
        this.canvas.width = this.styles.cellSize * this.playfield.column;
        this.canvas.height = this.styles.cellSize * this.playfield.row;
    }
}