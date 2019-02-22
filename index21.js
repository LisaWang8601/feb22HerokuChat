import express from 'express';
import bodyParser  from "body-parser";
import Game21  from "./game21";




// Create a new express application instance
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("www"));

app.get("/users/:uname", (req, res) => {
    res.end("Hello " + req.params.uname);
});

let oGames = {};
app.post("/sms", (req, res) =>{
    let sFrom = req.body.From;
    if(!oGames.hasOwnProperty(sFrom)){
        oGames[sFrom] = new Game21();
    }
    let sMessage = req.body.Body|| req.body.body;
    let aReply = [oGames[sFrom].takeTurn(sMessage)];  // originally takeTurn in game21 returns a string. now using square brakets put the string as the only element in the array.
    res.setHeader('content-type', 'text/xml');
    let sResponse = "<Response>";
    for(let n = 0; n < aReply.length; n++){
        sResponse += "<Message>";
        sResponse += aReply[n];
        sResponse += "</Message>";
    }
    res.end(sResponse + "</Response>");
    if(oGames[sFrom].done()){
        delete oGames[sFrom];
    }

});

var port = process.env.PORT || parseInt(process.argv.pop()) || 3000;

app.listen(port, () => console.log('Example app listening on port ' + port + '!'));
