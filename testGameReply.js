// import { globalAgent } from "https";

// all animal states are GOT IT EXCEPT GOAT STATE.

// ******search how to color a word in a string ********

// blue sheep, Argali wild sheep, ibex, marmots, pikas, deer 
const GameState = Object.freeze({
    // game states : hunters, Argali SHEEP, , cliff, skunks
    WELCOMING: Symbol("welcoming"),
    NEW_GAME: Symbol("welcoming"),
    HUNGARY: Symbol("new_game"),
    WHAT: Symbol("what"),
    DONE: Symbol("done"),
    CLIFF: Symbol("cliff"), //"You are resting and enjoying the view from the top of a cliff. Now you see " 
    //+ this.aAnimals[i-1] + " wondering under the cliff. Would you jump on it or would you stay on the cliff?";// will using variable sCliff bring same result, or need to define a function for sCliff;
    NUMBER: Symbol("number"), 
    HUNTER:  Symbol("hunter"), //  from hunting (hunting 1-4, diff. animals, 5, hunter, 6, hunting a few hours without any result. )growl to warn nearby sheep ? or hide
    GUN: Symbol("gun"),  //use bDone to indicate Game Over!   (this one doesn't wait for your answer.)  OH NO, he has a gun! 1. Bang... Game over! 2. he missed, "lucky you. \he missed" <<go hide>>-- from farmer, or hunter
    CREEK: Symbol("creek"), // drink water, or jump over
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
    HUNTING: Symbol("hunting"),   //
   //  COME from ANY  question with answer "hunting" , then branch to 2 paths randomly
    ///  go TO A FARM OR walking in your territory (ENCOUNTER another snow leopard)?!
    YAK: Symbol("yak"), // Yikes, the yak is too strong. You tried to bite its neck but missed. You got kicked by the yak. Game over. You need a long rest to get better from the injury. !!! --> rest?   --> hunt more?
    FARMER: Symbol("farmer"),  // from farm answer goat ; what do you do? 
    // run, or growl at him("growl" to gun--  random=1 ; "growl" to noGun, random =2 ; "run" to rest,  ) 
    FARMER_NO_GUN: Symbol("farmerNoGun"), // Lucky you, he has no gun! Laugh at him and walk away, or blatantly carry a goat away.  
    FARM_GOAT: Symbol("goat"),  // from farm-answer goat. random 1-2 =1,  do you eat the goat right there or carry it back to the slope of mountain. 
    // right "there" --> farmer. 
    SHEEP_DEER: Symbol("sheep_deer"),  // combine to FULL state. // Now you got a sheep and feel full by eating some of it. Would you guard your leftover by rest nearby or walk around in your territory(encroach)?
    SMALL_PREY:Symbol("smallPrey")
    
});

export default class testGameReply{
    constructor(){
        this.stateCur = GameState.WELCOMING;
        //this.statePast = GameState.CLIFF;
        this.aAnimals = ["a wild yak", "an Argali wild sheep", "a blue sheep", "a marmot", "a pika", "a deer"];
        this.bDone = false;
        }

// Function GameSnowLeopard.

        
makeAMove(sInput){
        // CLIFF STATE: random 1-6 --> 6 strings with 6 different animals. uSING random number for array index. 
          // this line should be in the CLIFF state.!!!
        // !!! string contains aAnimal[i-1] can be a function with variable i as input, reply string as return value. 
        let sReply = "Would you like a new game of Snow Leopard Adventure? Answer yes or new to step forward!";   // highlight "cliff"  and hunting
        let i = 0;   
        switch(this.stateCur){
            case GameState.WELCOMING:
                 this.stateCur = GameState.NEW_GAME;
                 break;
            case GameState.NEW_GAME:
                if((sInput.toLowerCase().match("yes"))||(sInput.toLowerCase().match("new"))){
                this.stateCur = GameState.HUNGARY;
                sReply = "Welcome to a new game. Imagine you are a Snow Leopard in the Himalayas. You are hungary. Would you go hunting or wait for prey on top of a cliff?";   // highlight "cliff"  and hunting
                break;
                }
                else {this.stateCur = GameState.NEW_GAME;
                sReply = "Please enter yes or new to start a new game.";
                }
            case GameState.HUNGARY:
                if(sInput.toLowerCase().match("wait")){
                    this.stateCur = GameState.CLIFF;
                    i = Math.ceil(Math.random()*6); 
                    sReply  =  getReply(i); //"You are resting and enjoying the view from the top of a cliff which is 3 meters high. Now you see " 
                                //+ this.aAnimals[i-1] + " wondering under the cliff. Would you jump off the cliff to catch it or would you rather stay put?";
                    break;
                    }
                else if (sInput.toLowerCase().match("go")) {
                    this.stateCur = GameState.HUNTING;
                    sReply  = "You are walking in the forest. There is a man walking alone. Would you growl to threaten him or you rather hide and be quiet."   ;   // need complete scripts for choices here!!!
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
                    + this.aAnimals[i-1] + " wondering under the cliff. Would you jump off the cliff to catch it or would you rather stay put?";
                    //break;
                    }
                    else if(sInput.toLowerCase().match("jump")){
                    sReply  = "You choose to jump on it. Now give me a number between 1 and 10 for the lottery system to decide if you can get it."; 
                    this.stateCur = GameState.NUMBER;
                    //break;
                     }
                     else {
                        sReply ="What did you say? Your answer needs to contain stay or jump."
                        this.stateCur = GameState.CLIFF;
                       // this.statePast = GameState.CLIFF;  
                        //break;
                     }
                    break;
            case GameState.HUNTING:
                if(sInput.toLowerCase().match("growl")){
                this.stateCur = GameState.NEW_GAME;
                sReply = "Too bad he has a gun. Bang! Game over. ... Would you like to start over?";
                this.bDone = true;
                break;
                }
                else if (sInput.toLowerCase().match("hide")){
                    sReply = "You hid for a little while and the man was gone. You are walking around in your territory and see another snow leopard walking. Would you growl at it to threaten it away or you ignore it?"
                    this.stateCur = GameState.ENCROACH;
                }    
                else {
                    this.stateCur = GameState.HUNTING;
                    sReply = "Your answer needs to contain either growl or hide.";
                }
            case GameState.ENCROACH:
                if(sInput.toLowerCase().match("growl")){
                    sReply = "The other snow leopard picked a fight! Now give me a number between 0-10 to bet if you win."
                    this.stateCur = GameState.ENCROACH_NUMBER;
                }
            case GameState.ENCROACH_NUMBER:
                let nInput = - parseInt(sInput);
                let j = - Math.ceil(Math.random()*10);  // Use negative number squared by 1 or 2 randomly to make it harder for the user to figure out the algorithm behind the branching.
                let k = Math.ceil(Math.random()*2); 
                if (((-nInput) >= 10)||((-nInput) <= 0)) {     // input validation
                    this.stateCur = GameState.ENCROACH_NUMBER;
                    sReply = "Please give a number between 0 and 10."
                    break;
                    } 
                else if (Math.pow(nInput, k) > Math.pow(j, k)){      
                    // the number given by user is compared with a random number to decide the users wins or loses.  
                        sReply = "Wow! You successfully defended your territory! Your opponent lost the fight and ran away. Now would you go hunting or rest on top of the cliff?"
                        this.stateCur = GameState.HUNGARY;   // if case 1 n 2 go to same state, delete one break?
                        break;
                        }
                else {
                    sReply = "Too bad you lost! Game over! Would you want to start a new game? "
                    this.bDone = true;
                    this.stateCur = GameState.WELCOMING;
                    break;
                }
            case GameState.NUMBER:
                nInput = - parseInt(sInput);
                j = - Math.ceil(Math.random()*10);  // Use negative number squared by 1 or 2 randomly to make it harder for the user to figure out the algorithm behind the branching.
                k = Math.ceil(Math.random()*2); 
                if (((-nInput) >= 10)||((-nInput) <= 0)) {     // input validation
                    this.stateCur = GameState.NUMBER;
                    break;
                    } 
                else if (Math.pow(nInput, k) > Math.pow(j, k)){      
                    // the number given by user is compared with a random number to decide which state is next.  
                        if(i==1){
                        sReply = "Wow! You took down a yak! Now you are full. Would you rest near your left over or walk around to guard your territory."
                        this.stateCur = GameState.YAK;   // if case 1 n 2 go to same state, delete one break?
                        break;
                        }
                        else if ((i==2)||(i==3)){
                        this.stateCur = GameState.SHEEP_DEER;
                        break;
                        }
                        else {
                            sReply = "You got it! But it's too small. You are still hungry. Would you go hunting, or stay put waiting?"
                            this.stateCur = GameState.SMALL_PREY;
                            break;}
                    }
                else if (i == 1){
                    sReply ="Too bad! You got kicked by the yak. Game over! Start a new game when you feel better.";
                    this.bDone = true;
                    this.stateCur = GameState.WELCOMING; //? how to deal with the bDone = true scenario?
                    break;
                    }
                else {
                    this.stateCur = GameState.MISS_TARGET;
                    sReply = "Too bad you missed it. There is a farm at the foot of the mountain. Would you go to a farm or would you wait for prey?" ;
                    break;
                    }
                case GameState.MISS_TARGET:
                        if((sInput.toLowerCase().match("go")) || (sInput.toLowerCase().match("farm"))){
                            this.stateCur = GameState.Farm;
                            sReply = "You got into the goat pen, and the farmer heard you. Would you growl to threaten him or just run away "; 
                            break;
                        }
                        else if (sInput.toLowerCase().match("wait")) { 
                            i = Math.ceil(Math.random()*6); 
                            sReply = "You are resting and enjoying the view from the top of a cliff. Now you see. " 
                                    +   this.aAnimals[i-1] + " wondering under the cliff. Would you jump on it or would you stay on the cliff?";
                            this.stateCur = GameState.CLIFF;
                            //this.statePast = MISS_TARGET; 
                            break;
                        }
                        else {
                            sReply = "Too bad you missed it. There is a farm at the foot of the mountain. Would you go to a farm or would you wait for prey? Please say go or wait." ;
                            this.stateCur =  GameState.MISS_TARGET;
                        }
                        
                    case GameState.SMALL_PREY:
                        if(sInput.toLowerCase().match("go") || sInput.toLowerCase().match("hunt")){
                            sReply = "There is a farm nearby. Would you go to the farm or would you walk around in your territory?"; //"You are resting and enjoying the view from the top of a cliff. Now you see " 
                            this.stateCur = GameState.FARM;
                            break;
                            //+ this.aAnimals[i-1] + " wondering under the cliff. Would you pounce on it or would you stay on the cliff?";// will using variable sCliff bring same result, or need to define a function for sCliff;
                        }else if(sInput.toLowerCase().match("wait")){
                        i = Math.ceil(Math.random()*6); 
                        sReply ="You are resting and enjoying the view from the top of a cliff. Now you see. " 
                                +   this.aAnimals[i-1] + " wondering under the cliff. Would you jump on it or would you stay on the cliff?";
                        this.stateCur = GameState.CLIFF;
                        break;
                        } else {
                            sReply = "Your answer needs to contain go or wait, please.";
                            this.stateCur = GameState.SMALL_PREY;
                            break;
                        }


                    //case GameState.YAK: 
                      //   sReply = "yak....."    ; 
                       //  break; 

                    }
                    return([sReply]);
            }
            getReply(i){
                let sReplyI = "You are resting and enjoying the view from the top of a cliff which is 3 meters high. Now you see " 
                  + this.aAnimals[i-1] + " wondering under the cliff. Would you jump off the cliff to catch it or would you rather stay put?";
                return sReplyI;
            }
            // getReply(i){
            //    sCalReply = ;
            // }
            done(){
                return this.bDone;
            }
    }