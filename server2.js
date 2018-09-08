const express = require("express");
const formidable = require("formidable");
const app = express();
var form = new formidable.IncomingForm();
form.uploadDir = "./upload";
form.keepExtensions = true;
app.get("/",function(req,res){
    res.sendfile("a.html");
})
app.post("/",function(req,res){
    form.parse(req,function(err,fields, files){
        console.log(fields)
        console.log(files)
        res.status(200)
        res.send("asd")
    })
})
app.listen(3000,function(){
    console.log("inicio")
})