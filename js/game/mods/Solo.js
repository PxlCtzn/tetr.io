class SoloMod extends Mod{

    constructor(){
        super(document.querySelector("canvas#playfield--canvas"));

        this.lastTime = 0;
        this.dropCounter = 0;

        const __loop = (time = 0) => {
            const deltaTime = time - this.lastTime;

            this.dropCounter += deltaTime;
            
            this.stats.timer += deltaTime;

            if(this.dropCounter >= this.stats.speed)
            {
                
                super.pieceDrop();
            }

            this.lastTime = time;
            
            this.__draw();
            this.__updateScore().__updateLevel().__updateSpeed().__updateStatLine();
            this.__updateTimer();
            this.__updateGhost();

            requestAnimationFrame(__loop);
            
        };
        __loop();
        
    }

    __updateScore(){
        document.querySelector("#stats-score--value").textContent = this.stats.score;
        return this;
    }

    __updateLevel(){
        document.querySelector("#stats-level--value").textContent = this.stats.level;
        return this;
    }

    __updateSpeed(){
        document.querySelector("#stats-speed--value").textContent = this.stats.speed/1000+" G";
        return this;
    }
    
    __updateStatLine(){
        document.querySelector("#stats-line--value").textContent = this.stats.lines;
        return this;
    }

    __updateTimer()
    {
        var ms = parseInt((this.stats.timer % 1000) / 100);
        var sec = Math.floor((this.stats.timer / 1000) % 60);
        var min = Math.floor((this.stats.timer / (1000 * 60)) % 60);
        var hrs = Math.floor((this.stats.timer / (1000 * 60 * 60)) % 24);
          
        hrs = (hrs < 10) ? "0" + hrs : hrs;
        min = (min < 10) ? "0" + min : min;
        sec = (sec < 10) ? "0" + sec : sec;

        document.getElementById("stats-timer--value").textContent = hrs + ":" + min + ":" + sec + "." + ms;
        return this;
    }

    __clearPreviewNext()
    {
        document.getElementById("preview-next").innerHTML = "";
    }

    __clearPreviewQueue()
    {
        document.getElementById("preview-queue").innerHTML = "";
    }

    

    __updatePreview(){
        this.__clearPreviewNext();
        this.__clearPreviewQueue();

        this.tetrominos_queue.forEach((piece, index) => {
            var preview = (0 !== index) ? document.getElementById("preview-queue") : document.getElementById("preview-next");
            var canvas = document.createElement("canvas");
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