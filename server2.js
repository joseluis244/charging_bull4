const express = require("express");
const multer = require("multer");
const upload = multer({dest: './upload/'});
const fs = require("fs");
const app = express();
/*var form = new formidable.IncomingForm();
form.uploadDir = "./upload";
form.keepExtensions = true;*/
app.get("/node_modules/j-i-c/src/JIC.js",function(req,res){
    res.sendfile("node_modules/j-i-c/src/JIC.js");
})
app.get("/",function(req,res){
    res.sendfile("a.html");
})
app.post("/",upload.single("ss"),function(req,res,next){
    fs.rename(req.file.path,renombre(req.file))
    res.send("asd")
})
app.listen(3000,function(){
    console.log("inicio")
})
function renombre (a){
    return a.path+".jpg";
}