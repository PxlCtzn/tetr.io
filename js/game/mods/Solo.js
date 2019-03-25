class SoloMod extends Mod{

    constructor(){
        super(document.querySelector("canvas#playfield"));

        this.lastTime = 0;
        this.dropCounter = 0;
        
        this.__draw();

        const __loop = (time = 0) => {
            const deltaTime = time - this.lastTime;
            this.lastTime = time;

            this.dropCounter += deltaTime;

            if(this.dropCounter > this.speed)
            {
                this.pieceDrop();
            }

            this.__draw();
            this.__updateScore().__updateLevel().__updateSpeed().__updatePreview()  ;
            
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
        this.nextPieces.forEach((piece) => {
            let canvas = document.createElement("canvas");
            canvas.height = piece.matrix.length    * this.styles.cellSize;
            canvas.width  = piece.matrix[0].length * this.styles.cellSize;
            preview.appendChild(canvas);

            super.__drawMatrix(canvas.getContext("2d"), piece.matrix);
        });
        

    }
    __draw(){
        
        super.__drawMatrix(this.context, this.playfield.matrix);
        super.__drawMatrix(this.context, this.piece.matrix, this.piece.pos, false);
    }

}