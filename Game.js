// import { globalAgent } from "https";

// all animal states are GOT IT EXCEPT GOAT STATE.

// ******search how to color a word in a string ********

// blue sheep, Argali wild sheep, ibex, marmots, pikas, deer 
const GameState = Object.freeze({
    // game states : hunters, Argali SHEEP, , cliff, skunks
    WELCOMING: Symbol("welcoming"),
    NEW_GAME: Symbol("new_game"),
    HUNGARY: Symbol("hungary"),
    //WHAT: Symbol("what"),
    //DONE: Symbol("done"),
    CLIFF: Symbol("cliff"), //"You are resting and enjoying the view from the top of a cliff. Now you see " 
    //+ this.aAnimals[i-1] + " wondering under the cliff. Would you jump on it or would you stay on the cliff?";// will using variable sCliff bring same result, or need to define a function for sCliff;
    NUMBER: Symbol("number"), 
    HUNTER:  Symbol("hunter"), //  from hunting (hunting 1-4, diff. animals, 5, hunter, 6, hunting a few hours without any result. )growl to warn nearby sheep ? or hide
    // GUN: Symbol("gun"),  //use bDone to indicate Game Over!   (this one doesn't wait for your answer.)  OH NO, he has a gun! 1. Bang... Game over! 2. he missed, "lucky you. \he missed" <<go hide>>-- from farmer, or hunter
    // CREEK: Symbol("creek"), // drink water, or jump over
    ENCROACH: Symbol("encroach"), // ANOTHER snow leopard walking in your territory. Growl fiercely at him, or go up for a fight. 
    ENCROACH_NUMBER: Symbol("encroach_number"),

    HIDE: Symbol("hide"), // from hunter. You hid for some time and the danger is gone. Would you rest some more(cliff) or go hunting?

    // WILD_BOAR: Symbol("wildBoar"),   // from hunting.sneak behind then pounce, or dash 100 meters to catch it. 
    MISS_TARGET: Symbol("miss_target"), // Oh-oh, you missed it. Now what? GO huntING  or rest SOME MORE --> hunting, -->cliff  
    FARM: Symbol("farm"), 
    // - it is Dawn. You hear rooster is crowing for the first time in the morning on a nearby farm, 
    // walk away -- cliff, or go steal a goat from the pen --> branch to 1=farmer, or 2= successfully steal a goat--> FULL.
    STILL_HUNGARY: Symbol("stillHungary"), //"You got it. It's too small. You are still hungry"-- go hunting, or stay put(stay self) - You just don't feel like hunting today!
    FULL: Symbol("full"), //  Now you successfully got food in your stomach. -- come from eating a sheep or yak or farm goat. go 
    HUNTING: Symbol("hunting"),   
    YAK: Symbol("yak"), 
    //FARMER: Symbol("farmer"),  // from farm answer goat ; what do you do? 
    // run, or growl at him("growl" to gun--  random=1 ; "growl" to noGun, random =2 ; "run" to rest,  ) 
    FARMER_NO_GUN: Symbol("farmerNoGun"), // Lucky you, he has no gun! Laugh at him and then run away, or blatantly carry a goat away.  
    //FARM_GOAT: Symbol("goat"),  // from farm-answer goat. random 1-2 =1,  do you eat the goat right there or carry it back to the slope of mountain. 
    // right "there" --> farmer. 
    //SHEEP_DEER: Symbol("sheep_deer"),  // combine to FULL state. // Now you got a sheep and feel full by eating some of it. Would you guard your leftover by rest nearby or walk around in your territory(encroach)?
    SMALL_PREY:Symbol("smallPrey"),
    GRASS: Symbol("grass"),
    TIRED: Symbol("tired"),
    FARM_WALK:Symbol("farmOrWalk")
    
});

export default class GameSnowLeopard{
    constructor(){
        this.stateCur = GameState.WELCOMING;
        //this.statePast = GameState.CLIFF;
        this.aAnimals = ["a wild yak", "an Argali wild sheep", "a blue sheep", "a marmot", "a pika", "a deer"];
        this.bDone = false;
        this.this.thisthis.iPreserve = 0;
        }

// Function GameSnowLeopard.
//getReply(i){
 //  let sReplyI = "You are resting and enjoying the view from the top of a cliff which is 3 meters high. Now you see " 
 //                   + this.aAnimals[i-1] + " wondering under the cliff. Would you jump off the cliff to catch it or would you rather stay put?";
 ////   return sReplyI;
        
makeAMove(sInput){
        // CLIFF STATE: random 1-6 --> 6 strings with 6 different animals. uSING random number for array index. 
          // this line should be in the CLIFF state.!!!
        // !!! string contains aAnimal[i-1] can be a function with variable i as input, reply string as return value. 
        let sReply = "Would you like to play Snow Leopard Adventure? Answer yes or play to step forward!";   // highlight "cliff"  and hunting
        let i = Math.ceil(Math.random()*6);   // need to preserve i value for some states. How?
        switch(this.stateCur){
            case GameState.WELCOMING:
                 this.stateCur = GameState.NEW_GAME;
                 break;
            case GameState.NEW_GAME:
                if((sInput.toLowerCase().match("yes"))||(sInput.toLowerCase().match("play"))){
                    this.stateCur = GameState.HUNGARY;
                    sReply = "Welcome to the adventure. Imagine you are a Snow Leopard in the Himalayas. You are hungary. Would you go hunting or wait for prey on top of a cliff?";   // highlight "cliff"  and hunting
                    break;
                }
                else {
                    sReply = "Please enter yes or play to start.";
                    this.stateCur = GameState.NEW_GAME;
                    break;
                }
            case GameState.HUNGARY:
                if(sInput.toLowerCase().match("wait")){
                    this.stateCur = GameState.CLIFF;
                    //i = Math.ceil(Math.random()*6); 
                    this.thisthis.iPreserve = i;
                    sReply  =  "You are resting and enjoying the view from the top of a cliff which is 3 meters high. Now you see " 
                            + this.aAnimals[thisthis.iPreserve-1] + " wondering under the cliff. Would you jump off the cliff to catch it or would you rather stay put?";
                    break;
                }
                else if (sInput.toLowerCase().match("go")) {
                    this.stateCur = GameState.HUNTING;
                    sReply  = "You are walking in the forest. There is a man walking alone. Would you growl to scare him away or you rather hide and be quiet.";   // need complete scripts for choices here!!!
                    break;
                }
                else {
                    sReply  = "Your answer needs to contain the word go or wait."; 
                    this.stateCur = GameState.HUNGARY;
                    //this.statePast = GameState.WELCOMING;
                    break;
                }
            case GameState.CLIFF:
                if(sInput.toLowerCase().match("stay")){
                    this.stateCur = GameState.CLIFF;
                    sReply  =  "You are resting and enjoying the view from the top of a cliff which is 3 meters high. Now you see " 
                    + this.aAnimals[thisthis.iPreserve-1] + " wondering under the cliff. Would you jump off the cliff to catch it or would you rather stay put?";
                    break;
                }
                else if(sInput.toLowerCase().match("jump")){
                    sReply  = "You choose to jump on it. Please give me a number between 1 and 10 then a lottery system will decide if you can get it."; 
                    this.stateCur = GameState.NUMBER;
                    break;
                }
                else {
                    sReply ="What did you say? Your answer needs to contain stay or jump."
                    this.stateCur = GameState.CLIFF;
                    break;
                }
            case GameState.HUNTING:
                if(sInput.toLowerCase().match("growl")){
                    this.stateCur = GameState.NEW_GAME;
                    sReply = "Too bad he has a gun. Bang! Game over. ...... Would you like to start over?";
                    this.bDone = true;
                    break;
                }
                else if (sInput.toLowerCase().match("hide")){
                    sReply = "You hid for a little while and the man was gone. Would you continue hunting or you rest and wait for prey on the cliff?";
                    this.stateCur = GameState.HIDE;
                    break;
                }    
                else {
                    this.stateCur = GameState.HUNTING;
                    sReply = "Your answer needs to contain either growl or hide.";
                    break;
                }
            case GameState.HIDE:
                if(sInput.toLowerCase().match("continue") || sInput.toLowerCase().match("hunting")){
                    sReply = "You see another snow leopard walking in your territory. Would you growl at it to threaten it away or you ignore it?"; 
                    this.stateCur = GameState.ENCROACH;
                    break;
                }
                else if((sInput.toLowerCase().match("rest")) || sInput.toLowerCase().match("wait")){
                    //i = Math.ceil(Math.random()*6); 
                    sReply ="You are resting and enjoying the view from the top of a cliff. Now you see. " 
                            +   this.aAnimals[i-1] + " wondering under the cliff. Would you jump on it or would you stay on the cliff?";
                    this.iPreserve = i;
                    this.stateCur = GameState.CLIFF;
                    break;
                } 
                else {
                    sReply = "Your answer needs to contain continue/hunting or rest/wait, please.";
                    this.stateCur = GameState.HIDE;
                    break;
                }    
            case GameState.ENCROACH:
                if(sInput.toLowerCase().match("growl")){
                    sReply = "The other snow leopard picked a fight! Now give me a number between 0-10 for the lottery system to decide if you win."
                    this.stateCur = GameState.ENCROACH_NUMBER;
                    break;
                }
                else {
                    this.stateCur = GameState.ENCROACH;
                    sReply = "Please pick a number between 0-10 for the lottery system to decide if you win."
                    break;
                }
            case GameState.ENCROACH_NUMBER:
                let nInput = parseInt(sInput);
                let j = - Math.ceil(Math.random()*10);  // Use negative number squared by 1 or 2 randomly to make it harder for the user to figure out the algorithm behind the branching.
                let k = Math.ceil(Math.random()*2); 
                if ((nInput > 10)||(nInput < 1)) {     // input validation
                    this.stateCur = GameState.ENCROACH_NUMBER;
                    sReply = "Please pick a number between 1 and 10."
                    break;
                } 
                else if (Math.pow((-nInput), k) > Math.pow(j, k)){      
                    // the number given by user is  compared with a random number to decide the users wins or loses.  
                        sReply = "Wow! You successfully defended your territory! Your opponent lost the fight and ran away. Now would you go hunting or rest on top of the cliff?"
                        this.stateCur = GameState.HUNGARY;   // if case 1 n 2 go to same state, delete one break?
                        break;
                }
                else {
                    sReply = "Too bad you lost! Game over! Would you want to start over? "
                    this.bDone = true;
                    this.stateCur = GameState.NEW_GAME;
                    break;
                }
            case GameState.NUMBER:
                nInput = parseInt(sInput);
                j = - Math.ceil(Math.random()*10);  // Use negative number squared by 1 or 2 randomly to make it harder for the user to figure out the algorithm behind the branching.
                k = Math.ceil(Math.random()*2); 
                if ((nInput >= 10)||(nInput <= 0)) {     // input validation
                    this.stateCur = GameState.NUMBER;
                    sReply = "Please enter a number between 1 and 10.";
                    break;
                    } 
                else if (Math.pow((-nInput), k) > Math.pow(j, k)){      
                    // the number given by user is compared with a random number to decide which state is next.  
                    if(this.thisthis.iPreserve == 1){
                        sReply = "Wow! You took down a yak! Now you are full. Would you rest near your left over or walk around to guard your territory."
                        this.stateCur = GameState.FULL;   // if - == 1, it's the yak 
                        break;
                    }
                    else if ((this.iPreserve==2)||(this.thisthis.iPreserve==3)){
                        sReply = "Great you got the " + aAnimals[this.thisthis.iPreserve-1] + "! Now you are full. Would you rest near your leftover or walk around to guard your territory."
                        this.stateCur = GameState.FULL;
                        break;
                    }
                    else {
                        sReply = "You got it! But it's too small. You are still hungry. Would you go hunting, or stay put waiting?"
                        this.stateCur = GameState.STILL_HUNGARY;
                        break;
                    }
                }
                // miss-the-animal scenarios:
                else if (this.thisthis.iPreserve == 1){
                    sReply ="Too bad! You got kicked by the yak. Game over! Start a new game when you feel better.";
                    this.bDone = true;
                    this.stateCur = GameState.NEW_GAME; //? how to deal with the bDone = true scenario?
                    break;
                    }
                else {
                    this.stateCur = GameState.MISS_TARGET;
                    sReply = "Too bad you missed it. There is a farm at the foot of the mountain. Would you go to a farm or would you wait for prey?" ;
                    break;
                    }
                case GameState.FULL:
                    if((sInput.toLowerCase().match("walk")) || (sInput.toLowerCase().match("guard"))){
                        this.stateCur = GameState.ENCROACH;
                        sReply = "You see another snow leopard walking in your territory. Would you growl at it to threaten it away or you ignore it?"; 
                        break;
                    }
                    else if (sInput.toLowerCase().match("rest")) { 
                        //i = Math.ceil(Math.random()*6); 
                        sReply = "You are resting and enjoying the view from the top of a cliff. Now you see. " 
                                +   this.aAnimals[i-1] + " wondering under the cliff. Would you jump on it or would you stay on the cliff?";
                        this.thisthis.iPreserve = i;
                        this.stateCur = GameState.CLIFF;
                    break;
                    }
                    else {
                        sReply = "Your answer needs to contain walk or rest." ;
                        this.stateCur =  GameState.FULL;
                        break;
                    }
                case GameState.MISS_TARGET: 
                    if(sInput.toLowerCase().match("go") || sInput.toLowerCase().match("farm")){
                        sReply = "You got a goat! But the farmer is up and running toward you. Would you go attack him, carry the goat and run, or abandon the goat and run?"; 
                        this.stateCur = GameState.FARM;
                        break;
                    }
                    else if(sInput.toLowerCase().match("walk")){
                        sReply ="You see another snow leopard walking in your territory. Would you growl at it to threaten it away or you ignore it?";
                        this.stateCur = GameState.ENCROACH;
                        break;
                    } 
                    else {
                        sReply = "Your answer needs to contain go or walk, please.";
                        this.stateCur = GameState.MISS_TARGET;
                        break;
                    }
                        
                case GameState.STILL_HUNGARY:
                    if(sInput.toLowerCase().match("go") || sInput.toLowerCase().match("hunt")){
                        sReply = "There is a farm nearby. Would you go to the farm or would you walk around in your territory?";  
                        this.stateCur = GameState.FARM_WALK;
                        break;
                        //+ this.aAnimals[i-1] + " wondering under the cliff. Would you pounce on it or would you stay on the cliff?";// will using variable sCliff bring same result, or need to define a function for sCliff;
                    }
                    else if(sInput.toLowerCase().match("wait")){
                        //i = Math.ceil(Math.random()*6); 
                        sReply ="You are resting and enjoying the view from the top of a cliff. Now you see. " 
                                + this.aAnimals[i-1] + " wondering under the cliff. Would you jump on it or would you stay on the cliff?";
                        this.thisthis.iPreserve = i;
                        this.stateCur = GameState.CLIFF;
                        break;
                    } 
                    else if (sInput.toLowerCase().match("find") || sInput.toLowerCase().match("grass")){
                        sReply = "The grass is refreshing. You feel less hungry now. Would you rest on the cliff or you would rather go hunting?"
                        this.stateCur = GameState.GRASS;
                        break;
                    }
                    else {
                        sReply = "Your answer needs to contain a verb in above text, please.";
                        this.stateCur = GameState.STILL_HUNGARY;
                        break;
                    }
                case GameState.FARM:
                    if(sInput.toLowerCase().match("go") || sInput.toLowerCase().match("attack")){
                        sReply = "Too bad he has a gun! Bang!...... Game over. Would you like to play again?"; 
                        this.stateCur = GameState.NEW_GAME;
                        this.bDone = true;
                        break;
                    }
                    else if(sInput.toLowerCase().match("abandon")){
                        sReply ="The farmer was after you with a gun. Fortunately you still got away. Now would you rest and wait for prey or find some edible grass?";
                        this.stateCur = GameState.STILL_HUNGARY;
                        break;
                    } 
                    else if (sInput.toLowerCase().match("carry")){
                        this.stateCur = GameState.FARMER_NO_GUN;
                        sReply = "Luckily the farmer has no gun. Would you laugh at him and then run away, or you would blatantly carry a goat away?";
                        break;
                    }
                    else{
                        sReply = "Your answer needs to contain go, carry, or abandon, please.";
                        this.stateCur = GameState.FARM;
                        break;
                    }
                case GameState.FARMER_NO_GUN:
                    if (sInput.toLowerCase().match("laugh") || sInput.toLowerCase().match("run")){    
                        sReply = "Now you are tired. Would you go back to rest on the cliff waiting for prey, or you would wait for another chance near the farm?"
                        this.stateCur = GameState.TIRED;
                        break;
                    }   
                    else if (sInput.toLowerCase().match("carry")){
                        this.stateCur = GameState.FULL;
                        sReply = "Now you are full. Would you walk around in your territory or rest beside your leftover?";
                        break;
                    }
                    else { 
                        this.stateCur = GameState.FARMER_NO_GUN;
                        sReply = "Your answer needs to contain laugh or carry."
                        break;
                    }
                case GameState.GRASS:
                    if(sInput.toLowerCase().match("go") || sInput.toLowerCase().match("hunting")){
                        sReply  = "You are walking in the forest. There is a man walking alone. Would you growl to scare him away or you rather hide and be quiet."; 
                        this.stateCur = GameState.HUNTING;
                        break;
                    }
                    else if(sInput.toLowerCase().match("rest")){
                        //i = Math.ceil(Math.random()*6); 
                        sReply ="You are resting and enjoying the view from the top of a cliff. Now you see. " 
                                +   this.aAnimals[i-1] + " wondering under the cliff. Would you jump on it or would you stay on the cliff?";
                        this.thisthis.iPreserve = i;
                        this.stateCur = GameState.CLIFF;
                        break;
                    } 
                    else {
                        sReply = "Your answer needs to contain go or rest, please.";
                        this.stateCur = GameState.GRASS;
                        break;
                    }
                case GameState.TIRED:
                    if (sInput.toLowerCase().match("go") || sInput.toLowerCase().match("back")){
                        //i = Math.ceil(Math.random()*6); 
                        sReply ="You are resting and enjoying the view from the top of a cliff. Now you see. " 
                                +   this.aAnimals[i-1] + " wondering under the cliff. Would you jump on it or would you stay on the cliff?";
                        this.thisthis.iPreserve = i;
                        this.stateCur = GameState.CLIFF;
                        break;
                    }
                    else if  (sInput.toLowerCase().match("wait")){
                        sReply = "You are back on the farm. You got a goat! But the farmer is up and running toward you again. Would you go attack him, carry the goat and run, or abandon the goat and run?";
                        this.stateCur = GameState.FARM;
                        break;
                    }
                    else {
                        sReply = "Your answer need to contain go, back, or wait."
                        this.stateCur = GameState.TIRED;
                        break;
                    }
                case GameState.FARM_WALK:
                    if(sInput.toLowerCase().match("farm") || sInput.toLowerCase().match("go")){
                        sReply = "You got a goat! But the farmer is up and running toward you again. Would you go attack him, carry the goat and run, or abandon the goat and run?"; 
                        this.stateCur = GameState.FARM;
                        break;
                    }
                    else if(sInput.toLowerCase().match("walk")){
                        sReply  = "You are walking in the forest. There is a man walking alone. Would you growl to scare him away or you rather hide and be quiet."; 
                        this.stateCur = GameState.HUNTING;
                        break;
                    } 
                    else {
                        sReply = "Your answer needs to contain go, farm, or walk, please.";
                        this.stateCur = GameState.FARM_WALK;
                        break;
                    }

            }     
            return([sReply]);
        } 
            
        done(){
                return this.bDone;
        }
    }

    /*
    case GameState.
    if(sInput.toLowerCase().match(" ") || sInput.toLowerCase().match("")){
        sReply = ""; 
        this.stateCur = GameState.;
        break;
    }
    else if(sInput.toLowerCase().match("...")){
        i = Math.ceil(Math.random()*6); 
        sReply =//"You are resting and enjoying the view from the top of a cliff. Now you see. " 
                //+   this.aAnimals[i-1] + " wondering under the cliff. Would you jump on it or would you stay on the cliff?";
        this.stateCur = GameState.;
        break;
    } 
    else {
        sReply = "Your answer needs to contain ... or ..., please.";
        this.stateCur = GameState.;
        break;
    }

    */