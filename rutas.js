const multer = require("multer");
const upload = multer({dest: './upload/'});
const fs = require("fs");
const dashm = require("./modulos/dash");
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
        if (req.body.data == "1") {
            dashm.moda(function (moda,cantidad) {
                
                res.send(moda);
            })
        }
        if (req.body.data == "2") {
            dashm.moda(function (moda,cantidad) {
                
                res.send(cantidad);
            })
        }
        if (req.body.data == "3") {
            dashm.distribuidor(function (obj) {
                res.send(obj);
            })
        }
        if (req.body.data == "4") {
            dashm.datos(function (e) {
                res.send(e);
            })
        }
        
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

function renombre (a){
    return a.path+".jpg";
}