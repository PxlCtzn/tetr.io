class Playfield {

    /**
     * Creates an instance of Playfield.
     * @param {number} [column=12]
     * @param {number} [row=20]
     * @memberof Playfield
     */
    constructor(column = 10, row = 20)
    {
        this.column = column;
        this.row = row;
        this.matrix = Array(this.row).fill(Array(this.column).fill(0));
    }

    collide(piece){
        const [m, o] = [piece.matrix, piece.pos];
        for (let y = 0; y < m.length; ++y) {
            for (let x = 0; x < m[y].length; ++x) {
                if (m[y][x] !== 0 &&
                    (this.matrix[y + o.y] &&
                    this.matrix[y + o.y][x + o.x]) !== 0) {
                    return true;
                }
            }
        }
        return false;
    }
    
    merge(piece) {
        piece.matrix.forEach((row, y) => {
            console.log("Row#"+y+" : "+row);
            row.forEach((value, x) => {
                console.log("Row#"+y+" Column#"+x+" : "+value);
                if(value !== 0){
                    console.log("Cell y:"+(y + piece.pos.y)+" x:"+(x + piece.pos.x)+" mise à jour");
                    this.matrix[(y + piece.pos.y)][(x + piece.pos.x)] = value;
                }
            });
        });
    }
}