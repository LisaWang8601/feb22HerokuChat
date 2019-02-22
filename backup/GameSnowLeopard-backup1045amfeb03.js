// import { globalAgent } from "https";

// all animal states are GOT IT EXCEPT GOAT STATE.

// ******search how to color a word in a string ********
const GameState = Object.freeze({
    // game states : hunters, Argali SHEEP, , cliff, skunks
    WELCOMING:   Symbol("welcoming"),
    OKAY: Symbol("okay"),
    WHAT: Symbol("what"),
    DONE: Symbol("done"),
    CLIFF: Symbol("cliff"), //"You are resting and enjoying the view from the top of a cliff. Now you see " 
    //+ this.aAnimals[i-1] + " wondering under the cliff. Would you jump on it or would you stay on the cliff?";// will using variable sCliff bring same result, or need to define a function for sCliff;
    NUMBER: Symbol("number"), 
    HUNTER:  Symbol("hunter"), //  from hunting (hunting 1-4, diff. animals, 5, hunter, 6, hunting a few hours without any result. )growl to warn nearby sheep ? or hide
    GUN: Symbol("gun"),  //use bDone to indicate Game Over!   (this one doesn't wait for your answer.)  OH NO, he has a gun! 1. Bang... Game over! 2. he missed, "lucky you. \he missed" <<go hide>>-- from farmer, or hunter
    CREEK: Symbol("creek"), // drink water, or jump over
    ENCROACH: Symbol("encroach"), // ANOTHER snow leopard walking in your territory. Growl fiercely at him, or go up for a fight. 
    HIDE: Symbol("hide"), // from hunter. You hid for some time and the danger is gone. Would you rest some more(cliff) or go hunting?

    WILD_BOAR: Symbol("wildBoar"),   // from hunting.sneak behind then pounce, or dash 100 meters to catch it. 
    MISS_TARGET: Symbol("miss_target"), // Oh-oh, you missed it. Now what? GO huntING  or rest SOME MORE --> hunting, -->cliff  
    FARM: Symbol("farm"), 
    // - it is Dawn. You hear rooster is crowing for the first time in the morning on a nearby farm, 
    // walk away -- cliff, or go steal a goat from the pen --> branch to 1=farmer, or 2= successfully steal a goat--> FULL.
    STILL_HUNGARY: Symbol("stillHungary"), //"You got it. It's too small. You are still hungry"-- go hunting, or stay put(stay self) - You just don't feel like hunting today!
    FULL: Symbol("full"), //  Now you successfully got food in your stomach. -- come from eating a sheep or yak or farm goat. go 
    HUNTING: Symbol("hunting"),   //
   //  COME from ANY  question with answer "hunting" , then branch to 2 paths randomly
    ///  go TO A FARM OR walking in your territory (ENCOUNTER A PEER)?!
    YAK: Symbol("yak"), // Yikes, the yak is too strong. You tried to bite its neck but missed.--> rest?   --> hunt more?
    FARMER: Symbol("farmer"),  // from farm answer goat ; what do you do? 
    // run, or growl at him("growl" to gun--  random=1 ; "growl" to noGun, random =2 ; "run" to rest,  ) 
    FARMER_NO_GUN: Symbol("farmerNoGun"), // Lucky you, he has no gun! Laugh at him and walk away, or blatantly carry a goat away.  
    FARM_GOAT: Symbol("goat"),  // from farm-answer goat. random 1-2 =1,  do you eat the goat right there or carried far away. 
    // right "there" --> farmer. 
    // SHEEP: Symbol("sheep"),  // combine to FULL state. // Now you got a sheep and feel full. Would you go rest(cliff) or walk around to guard your teritory(encroach)?
    SKUNK: Symbol("skunk") //    sprayed upon, game over. You need a long rest to get the smell off you. !!! 
    // MOLE: Symbol("mole"), // COMBINE TO still hungry state // hiss and scare the mole away? or pounce and fetch it. 
    // BRANCH TO STILL HUNGARY OR REST
    
});

export default class GameSnowLeopard{
    constructor(){
        this.stateCur = GameState.WELCOMING;
        this.statePast = GameState.CLIFF;
        this.aAnimals = ["a wild yak", "an Argali sheep", "a wild boar", "a marmot", "a mole", "a skunk"];
        }

// Function GameSnowLeopard.
//getReply(i){
 //  let sReplyI = "You are resting and enjoying the view from the top of a cliff which is 3 meters high. Now you see " 
 //                   + this.aAnimals[i-1] + " wondering under the cliff. Would you jump off the cliff to catch it or would you rather stay put?";
 ////   return sReplyI;
}        
makeAMove(sInput){
        // CLIFF STATE: random 1-6 --> 6 strings with 6 different animals. uSING random number for array index. 
        let i = Math.ceil(Math.random()*6);   // this line should be in the CLIFF state.!!!
        // !!! string contains aAnimal[i-1] can be a function with variable i as input, reply string as return value. 
        let sReply = "Welcome to a new game. Imagine you are a Snow Leopard in the Himalayas. Would you walk to a cliff or you go hunting?";   // highlight "cliff"  and hunting
        //let i = 1;   
        // let aAnimals = ["a wild yak", "several Argali sheep", "a marmot",  "a mole", "a skunk", "a wild boar"]; //var aAnimals: string[]; 
        switch(this.stateCur){
            case GameState.WELCOMING:
                if(sInput.toLowerCase().match("cliff")){
                this.stateCur = GameState.CLIFF;
                
                sReply  =  "You are resting and enjoying the view from the top of a cliff which is 3 meters high. Now you see " 
                    + this.aAnimals[i-1] + " wondering under the cliff. Would you jump off the cliff to catch it or would you rather stay put?";
                break;
                }
                else if (sInput.toLowerCase().match("hunt")) {
                    this.stateCur = GameState.HUNTING;
                    sReply  = "hunting"   ;   // need complete scripts for choices here!!!
                    break;
                    }
                else {
                    sReply  = "what?"; 
                    this.stateCur = GameState.WHAT;
                    this.statePast = GameState.WELCOMING;
                    break;}
                //this.statePast = GameState.WELCOMING;  //  first time no need. when start a new game, it's needed.
                break;
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
                        sReply ="What did you say? Please answer with one of the highlighted words."
                        this.stateCur = GameState.WHAT;
                        this.statePast = GameState.CLIFF;  
                        //break;
                     }
                    break;
            case GameState.WHAT:
                this.stateCur = this.statePast;
                break;

                    // now this message below should be in another state?! yes, NUMBER state
            case GameState.NUMBER:
                sReply ="You choose to jump on it. Now give me a number between 1 and 10 for the lottery system to decide if you can get it."; // this reply should go to the number state.
                let nInput = - parseInt(sInput);
                let j = - Math.ceil(Math.random()*10);  // Use negative number squared by 1 or 2 randomly to make it harder for the user to figure out the algorithm behind the branching.
                let k = Math.ceil(Math.random()*2); 
                if (((-nInput) >= 10)||((-nInput) <= 0)) {     // input validation
                    this.stateCur = GameState.NUMBER;
                    break;
                    } 
                else if (Math.pow(nInput, k) > Math.pow(j, k)){      
                    // the number given by user is compared with a random number to decide which state is next.  
                        switch(i){
                        case 1:
                        this.stateCur = GameState.YAK;   // if case 1 n 2 go to same state, delete one break?
                        break;
                        case 2:
                        this.stateCur = GameState.SHEEP;
                        break;
                        case 3:
                        this.stateCur = GameState.BOAR;
                        break;
                        case 4:
                        this.stateCur = GameState.MARMOT;
                        break;
                        case 5:
                        this.stateCur = GameState.SKUNK;
                        break;
                        case 6:
                        this.stateCur = GameState.MOLE;
                        break;
                        }
                        
                        //break;
                    }
                    else {
                            this.stateCur = GameState.MISS_TARGET;
                            sReply = "Too bad you missed it. Would you go hunting or rest some more?" ;
                            //break;
                        }
                    break;

                case GameState.MISS_TARGET:
                        if((sInput.toLowerCase().match("go") || sInput.toLowerCase().match("hunt")) && i != 5){
                            this.stateCur = GameState.Farm
                            sReply = "There is a farm nearby. Would you go to the farm or would you walk around in your territory?"; //"You are resting and enjoying the view from the top of a cliff. Now you see " 
                                //+ this.aAnimals[i-1] + " wondering under the cliff. Would you pounce on it or would you stay on the cliff?";// will using variable sCliff bring same result, or need to define a function for ;
                            break;
                        }else if (i == 5){
                            sReply ="Too bad! You got sprayed upon by the skunk. Game over! Start a new game when you smell better.";
                            this.bDone = True;
                            break;
                        }
                        else { sReply = "You are resting and enjoying the view from the top of a cliff. Now you see. " 
                        + this.aAnimals[i-1] + " wondering under the cliff. Would you jump on it or would you stay on the cliff?";
                    
                            this.stateCur = GameState.CLIFF;
                            this.statePast = MISS_TARGET; 
                            break;
                        }
                        
                    case GameState.SKUNK:
                            // Reply below is not for this state
                        if(sInput.toLowerCase().match("go") || sInput.toLowerCase().match("hunt")){
                            sReply = "There is a farm nearby. Would you go to the farm or would you walk around in your territory?"; //"You are resting and enjoying the view from the top of a cliff. Now you see " 
                            this.stateCur = GameState.FARM;
                            break;
                            //+ this.aAnimals[i-1] + " wondering under the cliff. Would you pounce on it or would you stay on the cliff?";// will using variable sCliff bring same result, or need to define a function for sCliff;
                        }else{
                        sReply ="You choose to pounce on it. Now give me a number between 1 and 10 to bet if you can get it.";
                        this.stateCur = GameState.NUMBER;
                        this.statePast = GameState.SKUNK;
                        break;
                        }

                    case GameState.YAK: 
                         sReply = "yak....."    ; 
                         break;

                    }
                    return([sReply]);
        } 
          


    
