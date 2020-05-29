
var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        
var router = express.Router();              

router.get('/', function(req, res) {
    res.json({ message: 'Success ' });   
});

app.use('/v1/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next(); 
});

var data=new Array();

router.route('/user')
    .post(function(req, res) {

        console.log("DATA RECIEVED");
        console.log(req.body);
        data.push(req.body);
        res.sendStatus(200);
    })
    .get(function(req,res){
        res.json(data);
     });

router.route('/user/:id')
     .get(function(req,res){

        for(var i=0;i<data.length;i++){
            if(data[i]['id']==req.params.id){
                console.log(i);
            }
        }
        res.sendStatus(200);
     })
     .put(function(req,res){

        console.log(req.body);
        for(var i=0;i<data.length;i++){
            if(data[i]['id']==req.params.id){
                data[i]['name']='CodeCave'
            }
        }
        res.sendStatus(200);
     })
     .delete(function(req,res){
        for(var i=0;i<data.length;i++){
                    if(data[i]['id']==req.params.id){
                        data.splice(i,1);
                    }
        }
        res.sendStatus(200);
     });