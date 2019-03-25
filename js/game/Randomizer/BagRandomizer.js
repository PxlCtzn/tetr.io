class BagRandomizer{
    constructor(pieces_availables, pieces_occurrence = 1){
        this.pieces_availables =  pieces_availables;
        this.pieces_occurrence = pieces_occurrence;
        
        this.__bag = this.__generateBag();
    }

    getPieceName(){
        if (0 === this.__bag.length)
            this.__bag = this.__generateBag();

        return this.__bag.shift();
    }
    __generateBag(){
        let bag = [].concat(...Array.from({length: this.pieces_occurrence}, () => this.pieces_availables));
        return this.__shuffleBag(bag);
    }

    __shuffleBag(bag){
        var currentIndex = bag.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = bag[currentIndex];
          bag[currentIndex] = bag[randomIndex];
          bag[randomIndex] = temporaryValue;
        }
      
        return bag;
    }
}