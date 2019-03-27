class SoloMod extends Mod{

    constructor(){
        super(document.querySelector("canvas#playfield"));

        this.lastTime = 0;
        this.dropCounter = 0;

        const __loop = (time = 0) => {
            const deltaTime = time - this.lastTime;

            this.dropCounter += deltaTime;

            if(this.dropCounter >= this.speed)
            {
                super.pieceDrop();
            }

            this.lastTime = time;
            
            this.__draw();
            this.__updateScore().__updateLevel().__updateSpeed().__updatePreview()  ;
            
            this.__updateGhost();

            requestAnimationFrame(__loop);
            
        };
        __loop();
        
    }

    __updateScore(){
        document.querySelector("p#score > span.value").textContent = this.score;
        return this;
    }

    __updateLevel(){
        document.querySelector("p#level > span.value").textContent = this.level;
        return this;
    }

    __updateSpeed(){
        document.querySelector("p#speed > span.value").textContent = this.speed/1000+" G";
        return this;
    }

    __updatePreview(){
        let preview = document.getElementById("preview");
        preview.innerHTML = ""; 
        this.tetrominos_queue.forEach((piece) => {
            let canvas = document.createElement("canvas");
            canvas.height = piece.matrix.length    * this.styles.cellSize;
            canvas.width  = piece.matrix[0].length * this.styles.cellSize;
            preview.appendChild(canvas);

            super.__drawMatrix(canvas.getContext("2d"), piece.matrix);
        });
        

    }
    __draw()
    {    
        super.__drawMatrix(this.context, this.playfield.matrix);
        super.__drawMatrix(this.context, this.tetromino.matrix, this.tetromino.pos, false);
        super.__drawMatrix(this.context, this.ghost.matrix, this.ghost.pos, false, 0.2);
    }

}