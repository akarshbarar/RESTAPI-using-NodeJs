var express = require("express");
var bodyParser=require("body-parser");
var app = express();
//?SETTING UP SERVER
app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var data=new Array();
app.get("/getAll", (req, res, next) => {
    res.json(data);
});

app.post('/sendData',function(req,res){

    console.log("DATA RECIEVED");
    console.log(req.body);
    data.push(req.body);
    res.sendStatus(200);
});

app.get("/getDataById/:id",function(req,res){
    console.log("DATA RECIEVED");

    console.log(req.params.id);
    data.forEach((item, index, arr)=>{
        console.log(item['id']==req.params.id);
    });
    res.sendStatus(200);
});
