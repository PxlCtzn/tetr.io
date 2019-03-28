class Mod{

    constructor(canvas){
        this.stats = {
            score : 0,
            level : 1,
            speed: 0,
            lines : 0,
            timer : 0,
        };
        
        this.__computeSpeed();

        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        
        this.tetrominos_available  = ["z", "o", "i", "s", "j", "l", "t"];
        this.playfield = new Playfield(10, 20);
        this.styles = new PlayfieldStyle();
        
        this.randomizer = new BagRandomizer(this.tetrominos_available, 1);
        this.previewCount = 5;
        this.tetrominos_queue = Array(this.previewCount);
        for(let p =0; p < this.previewCount; p++)
        {
            this.tetrominos_queue[p] = this.randomizer.getPiece();
        }
    
        this.spawnNextTetromino();

        this.updateCanvasSize();

        this.scores_tab = [null, 100, 300, 500, 800];
    }

    __computeSpeed(){
        this.stats.speed = Math.pow( (0.8-((this.stats.level-1)*0.007)) , (this.stats.level-1) )*1000;
    }
    __drawMatrix(context, matrix, offset={x: 0, y: 0}, renderEmpty = true, alpha=1.0){
        let previousAlpha = context.globalAlpha;
        context.globalAlpha = alpha;
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
        context.globalAlpha = previousAlpha;
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
        this.tetromino.pos.x--;
        if(this.playfield.collide(this.tetromino))
        {
            this.tetromino.pos.x++;
        }
        this.__updateGhost();
    }
    
    movePieceRight()
    {
        this.tetromino.pos.x++;
        if(this.playfield.collide(this.tetromino))
        {
            this.tetromino.pos.x--;
        }
        this.__updateGhost();
    }

    pieceDrop(){
        var lineCleared = 0;
        this.dropCounter = 0;

        this.tetromino.pos.y++;

        if(this.playfield.collide(this.tetromino))
        {
            this.tetromino.pos.y--;
            this.playfield.merge(this.tetromino);
            this.spawnNextTetromino();
            lineCleared = this.playfield.sweep();
            this.stats.lines += lineCleared;
            if(lineCleared > 0)
            {
                this.stats.score += this.scores_tab[lineCleared]*this.stats.level;
            }
        }
        
    }
    rotatePieceClockwise()
    {
        this.tetromino.rotateClockwise();
    }

    rotatePieceCounterClockwise()
    {
        this.tetromino.rotateCounterClockwise();
    }

    /**
     * Removes the first piece of next ones
     * and push a new piece from one given by the randomizer  
     */
    spawnNextTetromino()
    {       
        this.tetromino = this.tetrominos_queue.shift();
        this.tetrominos_queue.push(this.randomizer.getPiece());
        this.centerTetromino();
        this.createGhost();
        this.__updatePreview();
    }
    
    centerTetromino()
    {
        this.tetromino.pos.x = (this.playfield.column-this.tetromino.matrix.length) % 2 === 0 ? (this.playfield.column - this.tetromino.matrix.length)/2 : (this.playfield.column - this.tetromino.matrix.length-1)/2;
    }

    updateCanvasSize(){
        this.canvas.width = this.styles.cellSize * this.playfield.column;
        this.canvas.height = this.styles.cellSize * this.playfield.row;
    }
    
    /**
     * Create a ghost piece from the given piece.
     * 
     * @param {Piece} piece 
     */
    createGhost()
    {
        this.ghost = new Piece(this.tetromino.piece_name);
    }

    /**
     * Updates the Ghost position.
     */
    __updateGhost(){
        this.ghost.pos.x = this.tetromino.pos.x;
        this.ghost.pos.y = this.tetromino.pos.y;
        
        this.ghost.matrix = this.tetromino.matrix;
        
        while(!this.playfield.collide(this.ghost)){
            this.ghost.pos.y++;
            if(this.ghost.pos.y >= this.playfield.row ) {
                break;
            }
        }
        this.ghost.pos.y--;
    }

}