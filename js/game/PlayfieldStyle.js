class PlayfieldStyle
{
    constructor()
    {
        this.backgroundColor = "black";
        this.cellStrokeColor = "grey";
        this.contourStack    = true;
        this.contourColor    = "white";

        this.cellSize = 30;
        
        this.piecesColors = [
            null,      // 
            "#EE4141", // red    -> Z -> 1
            "#F5BF24", // yellow -> O -> 
            "#00a6d6", // cyan   -> I
            "#78AF9F", // green  -> S
            "#659CC8", // blue   -> J
            "#F34F29", // orange -> L
            "#8A65AA", // purple -> T
        ];
    }


}