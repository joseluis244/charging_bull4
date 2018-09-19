const multer = require("multer");
const upload = multer({dest: './upload/'});
const fs = require("fs");
const dashm = require("./modulos/dash");
const clientes = require("./models/clientes");
const conf = JSON.parse(fs.readFileSync("./configuraciones/conf.json"));
var Cliente = {};

function RGET (app) {
    app.get("/", function (req, res) {
        res.sendfile("views/main.html")
    })
    app.get("/dash", function (req, res) {      
        res.sendfile("views/dash.html");
    })
    app.get("/lista/*",function(req,res){
        var parametro = req.params[0];
        if (parametro == "completa") {
            clientes.find({}, {}, { sort: { _id: -1 } }, function (err, cli) {
                res.render("lista.ejs", { cli: cli });
            })
        }
        if (parametro == "region") {
            clientes.find({ "ciudad": "Santa Cruz" }, {}, { sort: { _id: -1 },limit:30}, function (err, cli) {
                res.render("lista.ejs", { cli: cli });
            })
        }
        if (parametro == "reg_completa") {
            clientes.find({ "ciudad": "Santa Cruz" }, {}, { sort: { _id: -1 }}, function (err, cli) {
                res.render("lista.ejs", { cli: cli });
            })
        }
    })
    app.get("/registrar",function(req,res){
        res.sendfile("views/registro.html");
    })
    app.get("/ficha",function(req,res){
        var id = req.param("clid");
        clientes.findById(id,function(err,cli){
            Cliente = cli;
            res.render("ficha_cliente.ejs",{cli,cli});
            console.log(Cliente)
        })
    })
    app.get("/encuesta",function(req,res){
        res.sendfile("views/encuesta.html");
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
        if (req.body.data == "5") {
            dashm.cant_cooler(function(e){
                res.send(e)
            })
        }
        if (req.body.data == "6") {
            dashm.cant_visi(function(e){
                res.send(e)
            })
        }
    })
    app.get("/mapaclu",function(req,res){
        clientes.find({ "distribuye": true },{ "GPS": 1, "tipo": 1},{sort:{"tipo":1}},function(err,cli){
            res.render("mapcluster.ejs",{cli:cli});
        })
    })
    app.post("/foto",upload.single("foto"),function(req,res,next){
        fs.rename(req.file.path,renombre(req.file))
        res.send("asd")
    })
    app.post("/encuesta",function(req,res){
        console.log(req.body.datos);
        console.log(req.body.coolers);
        console.log(req.body.visib);
        console.log(req.body.precios);
        //guardar_main();
        //guardar_vitacora();
    })
    app.post("/listaGPS",function(req,res){
        var lat_I = parseFloat(req.body.lat)-conf.factor;
        var lat_F = parseFloat(req.body.lat)+conf.factor;
        var lng_I = parseFloat(req.body.lng)-conf.factor;
        var lng_F = parseFloat(req.body.lng)+conf.factor;
        clientes.find({ $and: [ { "GPS.0": { $gte: lat_I, $lte: lat_F } }, { "GPS.1": { $gte: lng_I, $lte: lng_F } } ] },function(err,cli){
            res.render("listaGPS.ejs",{cli:cli})
        })
    })
    app.post("/registro",function(req,res){
        var reeq = req.body.datos.split(",");
        var N_cleinte = new clientes({
            cli_id:reeq[0],
            nombre:reeq[1],
            direccion:reeq[2],
            ciudad:reeq[3],
            tipo:reeq[4],
            contacto:[{
                C_nombre:reeq[5],
                C_dato:reeq[6]
            }],
            GPS:[reeq[7],reeq[8]]
        })
        //N_cleinte.save(function(err){});
        Cliente = N_cleinte;
        console.log(Cliente);
        res.send(Cliente._id);
    })
}
module.exports.RGET = RGET;
module.exports.RPOST = RPOST;

function renombre (a){
    return a.path+".jpg";
}
