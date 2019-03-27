class PlayfieldStyle
{
    constructor()
    {
        this.backgroundColor = "black";
        this.cellStrokeColor = "grey";
        this.contourStack    = true;
        this.contourColor    = "white";

        this.cellSize = 40;
        
        this.piecesColors = [
            null,      // 
            "#ED2939", // red    -> Z -> 1
            "#FECB00", // yellow -> O -> 
            "#009FDA", // cyan   -> I
            "#69BE28", // green  -> S
            "#0065BD", // blue   -> J
            "#952D98", // orange -> L
            "#8A65AA", // purple -> T
        ];
    }


}