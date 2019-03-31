class SoloMod extends Mod{

    constructor(){
        super(document.querySelector("canvas#playfield--canvas"));

        this.lastTime = 0;
        this.dropCounter = 0;

        const __loop = (time = 0) => {
            if(!this.pause){
                const deltaTime = time - this.lastTime;

                this.dropCounter += deltaTime;
                
                
                    this.stats.timer += deltaTime;

                if(this.dropCounter >= this.stats.speed)
                {
                    super.dropPiece();
                }

                this.lastTime = time;
                
                this.__draw();
                this.__updateScore().__updateLevel().__updateSpeed().__updateStatLine();
                this.__updateTimer();
                this.__updateGhost();
                this.__updateGoal();
            }else{
                this.__hide(); // Should be something like this.playfield.hide();
            }
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
        document.querySelector("#stats-line--value").textContent = this.stats.total_lines;
        return this;
    }

    __updateGoal(){
        document.querySelector("#stats-goal--value").textContent = this.stats.lines +" / "+this.getGoal();
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

    __updateHold()
    {
        let canvas = document.getElementById("hold");
        let context = canvas.getContext("2d");

        context.clearRect(0, 0, canvas.width, canvas.height);
        super.__drawMatrix(context, this.hold.matrix, {x:0, y:0}, false);
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
            super.__drawMatrix(canvas.getContext("2d"), piece.matrix, {x: 0, y:0}, false);
        });
        

    }
    __draw()
    {    
        super.__drawMatrix(this.context, this.playfield.matrix);
        super.__drawMatrix(this.context, this.tetromino.matrix, this.tetromino.pos, false);
        super.__drawMatrix(this.context, this.ghost.matrix, this.ghost.pos, false, 0.2);
    }

    __hide(){
        this.context.fillStyle = this.styles.backgroundColor;
        this.context.fillRect(0, 0, // (X, Y) Origin
            this.playfield.column      * this.styles.cellSize, // Width
            this.playfield.row   * this.styles.cellSize  // Height
        );
        this.context.font = '30px monospace';
        this.context.fillStyle = "white";
        this.context.fillText("PAUSE", (this.canvas.width-30*3)/2, (this.canvas.height-15)/2);
        this.context.font = '15px monospace';
        let message = "Press '"+configKeyboard.PAUSE+"' to resume the game";
        this.context.fillText(message, (this.canvas.width-30*(message.length/3.35))/2, this.canvas.height/2+30); 

    }
    getGoal(fixedGoalSystem = true)
    {
        return fixedGoalSystem ? 10 : this.level * 5;
    }
}