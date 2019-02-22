export default class Game21{    
    
    constructor(){
        //this is called when a new instance is created so not done
        this.bDone = false;
        //programmers start counting at 0
        this.nComputer = 0;
    }
    takeTurn(sInput){
        // we get the player's input and split it into an array [1,2,3,4] for example
        let aNumbers = sInput.split(",");
        // the last number in the player's sequence 4 for example
        let nCurrent = aNumbers[aNumbers.length - 1];
        if(nCurrent <= this.nComputer){
            // the player didn't continue from where the computer left off
            return("Please enter a sequence starting at "  + (this.nComputer + 1));
        }else if(aNumbers.length > 4){
            // the player had too many numbers in their sequence
            return("Please enter 4 or fewer numbers starting at "  + (this.nComputer + 1))
        }
        
        // now go through the sequence a number at a time
        for(let n = 0; n < aNumbers.length; n++){
            if(isNaN(aNumbers[n])){
                if (this.nComputer == 0) {
                    return("Welcome to a new Game of 21! The object is counting by 1 with 1 to 4 steps each turn but not finish at 21.");
                }
                // something that couldn't be converted to a number
                
                return("Please enter only numbers in a sequence starting at "  + (this.nComputer + 1))
            }else if(n == 0 && aNumbers[n] != this.nComputer + 1){
                // the player didn't continue from where the computer left off
                return("Please enter a sequence starting at "  + (this.nComputer + 1));
            }else if( n != 0 && aNumbers[n] - aNumbers[n-1] != 1){
                // the number isn't 1 greater than the previous
                return("Please enter a sequence starting at "  + (this.nComputer + 1));
            }
        }
        if(nCurrent >= 21){
            return("I win!")
        }
        // start the sequence with the next number
        let sSequence = "" + ++nCurrent;
        if(nCurrent == 21){
            this.bDone = true;
            return("You win");
        }
        // figure out the remaining length of the sequence
        let nNumbers = Math.ceil(Math.random() * 3);
        for(let n = 0; n < nNumbers; n++){
            if(nCurrent == 20){
                break;
            }
            this.nComputer = ++nCurrent
            sSequence += "," + this.nComputer;
        }
        return(sSequence);
        
    }
    done(){
        return this.bDone;
    }
}
