class BagRandomizer{

    /**
     * Create a new Bag Randomizer
     * @param {Array} pieces_availables 
     * @param {Number} pieces_occurrence 
     */
    constructor(pieces_availables, pieces_occurrence = 1){
        if(pieces_occurrence <= 0)
        {
            pieces_occurrence = 1;
        }
        else if(pieces_occurrence === +pieces_occurrence && pieces_occurrence !== (pieces_occurrence|0)) // Testing if the number is a float
        {
            pieces_occurrence = Math.round(pieces_occurrence);
        }

        this.bag = [];
        this.pieces_availables = pieces_availables;
        this.pieces_occurrence = pieces_occurrence;

        this.__generateBag();
    }

    /**
     * Retrieves a piece from the bag
     */
    getPiece(){
        if (0 === this.bag.length)
            this.__generateBag();

        let piece_name = this.bag.shift();
        return new Piece(piece_name);
    }

    /**
     * Generate a new Bag
     */
    __generateBag(){
        let bag = Array();
        let occurenceIndex = 0;
        while(occurenceIndex < this.pieces_occurrence){
            bag = bag.concat(this.pieces_availables);
            occurenceIndex++;
        }
        
        for (let i = bag.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [bag[i], bag[j]] = [bag[j], bag[i]];
        }

        this.bag = bag;
    }
}