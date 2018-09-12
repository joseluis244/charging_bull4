const multer = require("multer");
const upload = multer({dest: './upload/'});
const fs = require("fs")
var Cliente = "";
function RGET (app) {
    app.get("/", function (req, res) {
        res.sendfile("html/main.html")
    })
    app.get("/dash", function (req, res) {
        
        res.sendfile("html/dash.html");
    })
    app.get("/lista",function(req,res){
        res.sendfile("html/lista.html");
    })
}
function RPOST(app) {
    app.post("/dash", function (req, res) {
        res.send(datos(req.body.data))
    })
    app.post("/foto",upload.single("foto"),function(req,res,next){
        fs.rename(req.file.path,renombre(req.file))
        res.send("asd")
    })
    app.post("/encuesta",function(req,res){
        console.log(req.body.datos);
    })
}
module.exports.RGET = RGET;
module.exports.RPOST = RPOST;
function datos(dato){
    switch(dato){
        case "1": 
        var a = [1,2,3,4,5];
        return a;
        case "2": 
        var b = [6,7,8,9,0];
        return b;
        case "3": 
        var c = {lab:["a","b","c","d","e"],valor:[4,5,6,7,8]};
        return c;
    }
}
function renombre (a){
    return a.path+".jpg";
}