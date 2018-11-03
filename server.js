const express = require("express");
const https= require("https");
const ssl = require("./ssl");
const Rutas = require("./rutas");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const favicon = require('express-favicon');
const passport = require("passport");
const AUpassport = require("./passport");
const session = require('express-session');
const fs = require("fs");
const app = express();
const mongoose = require("mongoose");
const conf = JSON.parse(fs.readFileSync("./configuraciones/conf.json"));
var mongoDB = conf.DB;
mongoose.connect(mongoDB,{ useNewUrlParser: true });
AUpassport.AUpassport(passport);

//use
app.use(favicon(__dirname+"/html/IMG/redbull-icon.png"));
app.use("/",express.static("html"));
app.use("/upload",express.static("uploads"));
app.use("/node_modules",express.static("node_modules"));
app.use("/cluster",express.static("cluster"));
app.use(session({secret: 'epistemologia'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
//app.use(function(req,res,next){console.log(req.body);next()})

//Rutas
Rutas.RGET(app,passport);
Rutas.RPOST(app,passport);

//inicia servicor
https.createServer(ssl.ssl(),app).listen(4000);
app.listen(3000,function(){
    console.log("Servidor iniciado");
})
