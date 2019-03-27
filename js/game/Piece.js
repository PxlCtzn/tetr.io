class Piece{
    
    constructor(piece_name)
    {
        this.piece_name = piece_name;
        this.matrix = this.__createMatrix();
        // Position 0,0 is the top left corner of the matrix.
        this.pos = {
            x : 0,
            y : 0,
        };
        this.width  = this.matrix[0].length; 
        this.height = this.matrix.length;
    }


    rotateClockwise()
    {
        if(this.piece_name === "o" || this.piece_name === "O")
            return;
        this.__rotate();
        this.matrix.forEach(row => row.reverse());
    }

    rotateCounterClockwise()
    {
        if(this.piece_name === "o" || this.piece_name === "O")
            return;
        this.__rotate();
        this.matrix.reverse();
    }

    /**
     * Returns the piece matrix in it's horizontal position.
     *
     * @returns {Array}
     * @memberof Piece
     */
    __createMatrix(){
        switch (this.piece_name) {
            case "z":
            case "Z":
                return [
                    [1, 1, 0],
                    [0, 1, 1],
                    [0, 0, 0],
                ];
            case "o":
            case "O":
                return [
                    [0, 2, 2, 0],
                    [0, 2, 2, 0],
                    [0, 0, 0, 0],
                ];
            case "i":
            case "I":
                return [
                    [0, 0, 0, 0],
                    [3, 3, 3, 3],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                ];
            case "s": 
            case "S":
            return [
                [0, 4, 4],
                [4, 4, 0],
                [0, 0, 0],
            ];
            case "j":
            case "J":
                return [
                    [5, 0, 0],
                    [5, 5, 5],
                    [0, 0, 0],
                ];
            case "l":
            case "L":
                return [
                    [0, 0 ,6],
                    [6, 6 ,6],
                    [0, 0 ,0],
                ];
            case "t":
            case "T":
                return [
                    [0, 7, 0],
                    [7, 7, 7],
                    [0, 0, 0],
                ];
        }
    }

    __rotate(){
        for(var y =0; y < this.matrix.length; y++)
        {
            for(var x =0; x < y; x++)
            {
                [ this.matrix[x][y], this.matrix[y][x] ] = [ this.matrix[y][x], this.matrix[x][y] ];
            }
        }
    }

    /**
     * Returns the current height (number of cell) of the piece
     */
    getHeight(){
        let max_height = 0;
        let current_height = 0;
        for(let x = 0; x < this.width; x++)
        {
            current_height = 0;
            for(let y = (this.height-1); y >= 0; y--)
            {
                if(0 !== this.matrix[y][x])
                {
                    current_height ++;
                }
            }
            if(current_height > max_height){
                max_height = current_height;
            }
        }
        return max_height;
    }

    getFirstRowIndexContainingMinos(){
        for(let y = 0; y < this.height; y++)
        {
            let sum = this.matrix[y].reduce((part, value) => part + value);
            if( sum > 0)
            {
                return y;
            }
        }
    }
}