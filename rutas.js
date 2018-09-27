const multer = require("multer");
const upload = multer({dest: './upload/'});
const fs = require("fs");
const dashm = require("./modulos/dash");
const clientes = require("./models/clientes");
const conf = JSON.parse(fs.readFileSync("./configuraciones/conf.json"));
const xlsx = require("./excel");
var Cliente = {};

function RGET (app,passport) {
    app.get("/", function (req, res) {
        res.redirect("/login")
    })
    app.get("/main",isLoggedIn, function (req, res) {
        res.sendfile("views/main.html")
    })
    app.get("/login",function(req,res){
        res.sendfile("views/login.html");
    })
    app.get("/dash",isLoggedIn, function (req, res) {      
        res.sendfile("views/dash.html");
    })
    app.get("/lista/*",isLoggedIn,function(req,res){
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
    app.get("/registrar",isLoggedIn,function(req,res){
        res.sendfile("views/registro.html");
    })
    app.get("/ficha",isLoggedIn,function(req,res){
        var id = req.param("clid");
        clientes.findById(id,function(err,cli){
            Cliente = cli;
            res.render("ficha_cliente.ejs",{cli,cli});
        })
    })
    app.get("/encuesta",isLoggedIn,function(req,res){
        clientes.findById(req.param("clid"),{tipo:1},function(err,cli){
            res.render("encuesta.ejs",{cli:cli});
        })
    })
    app.get("/excel",isLoggedIn,function(req,res){
        xlsx.D_tabla_comlpeta(function(nombre){
            setTimeout(function(){
                res.download("./TEMP/"+nombre+".xlsx","Reporte_completo.xlsx");
                setTimeout(function(){
                    fs.unlinkSync("./TEMP/"+nombre+".xlsx");
                },2000);
            },1000)
        })
    })
    app.get("/excel2",isLoggedIn,function(req,res){
        xlsx.D_tabla_reqguion(function(nombre){
            setTimeout(function(){
                res.download("./TEMP/"+nombre+".xlsx","Reporte_Region.xlsx");
                setTimeout(function(){
                    fs.unlinkSync("./TEMP/"+nombre+".xlsx");
                },2000);
            },1000)
        })
    })
    app.get("/excel3",isLoggedIn,function(req,res){
        xlsx.D_tabla_mes(function(nombre){
            setTimeout(function(){
                res.download("./TEMP/"+nombre+".xlsx","Reporte_Mes.xlsx");
                setTimeout(function(){
                    fs.unlinkSync("./TEMP/"+nombre+".xlsx");
                },2000);
            },1000)
        })
    })
    app.get("/mapaclu",isLoggedIn,function(req,res){
        clientes.find({ "distribuye": true },{ "GPS": 1, "tipo": 1},{sort:{"tipo":1}},function(err,cli){
            res.render("mapcluster.ejs",{cli:cli});
        })
    })
    app.get("/succes",isLoggedIn,function(req,res){res.send("/main")})
    app.get("/fail",function(req,res){res.send("error")})
}
function RPOST(app,passport) {

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
    app.post("/foto",upload.single("foto"),function(req,res,next){
        clientes.update({_id:req.file.originalname.split("$%")[0]},{$push:{fotos:{fecha:req.file.originalname.split("$%")[1],nombre:req.file.filename+".jpg"}}},function(){})
        fs.rename(req.file.path,renombre(req.file),function(){})
        res.send("asd")
    })
    app.post("/encuesta",function(req,res){
        guardar_main(req.body.datos,req.body.coolers,req.body.visib,req.body.precios);
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
        res.send(Cliente._id);
    })
    app.post("/galeriafotos",function(req,res){
        var id = req.body.id;
        clientes.findById(id,{fotos:1},function(err,cli){
            res.render("galeria.ejs",{fotos:cli.fotos});
        })
    })
    app.post("/lista/*",function(req,res){
        let parametro = req.params[0];
        let fechaI = new Date(req.body.year,req.body.mes);
        if(parametro == "mes"){
            clientes.find({ "ultima_visita": { $gte: fechaI } }, {}, { sort: { "ciudad": -1, "ultima_visita": 1}}, function (err, cli) {
                res.render("visitasmes.ejs",{cli:cli});
            })
        }
            
    })
    app.post('/login', passport.authenticate('local',{
        successRedirect: '/succes',
        failureRedirect: '/fail'
    }));
}
module.exports.RGET = RGET;
module.exports.RPOST = RPOST;

function renombre (a){
    return a.path+".jpg";
}
function guardar_main(datos,cooler,visi,precios){
    let datos2 = datos.split(",");
    let id = datos2[0];
    let fecha = datos2[1];
    let distribuye = datos2[2];
    let distribuidor = datos2[3];
    let frio = datos2[4];
    let comentarios = datos2[5];
    let lat = datos2[6];
    let lng = datos2[7];
    let acc = datos2[8];
    let pr0 = precios.split(",")[0];
    let pr1 = precios.split(",")[1];
    let pr2 = precios.split(",")[2];
    let pr3 = precios.split(",")[3];
    let pr4 = precios.split(",")[4];
    if(cooler.split(",")[0]==""){
        var col = []
    }
    else{
        var col = cooler.split(",");
    }
    if(visi.split(",")[0]==""){
        var vi = [];
    }
    else{
        var vi = visi.split(",");
    }
    clientes.update({_id:id},{
        distribuye:distribuye,
        distribuidor: distribuidor,
        comentario: comentarios,
        frio:frio,
        ultima_visita:new Date(fecha),
        "productos.0.P_nombre":"Red Bull",
        "productos.0.P_precio":pr0,
        "productos.1.P_nombre":"Rush",
        "productos.1.P_precio":pr1,
        "productos.2.P_nombre":"Ciclon 500 ML",
        "productos.2.P_precio":pr2,
        "productos.3.P_nombre":"Black",
        "productos.3.P_precio":pr3,
        "productos.4.P_nombre":"Monster",
        "productos.4.P_precio":pr4,
        "materiales.0.N_material":"Cooler",
        "materiales.0.L_material":col,
        "materiales.1.N_material":"Visibility",
        "materiales.1.L_material":vi
    },function(err){});
    clientes.update({_id:id},{$push:{
        vitacora: {
            "GPS.0": lat,
            "GPS.1": lng,
            "GPS.2": acc,
            distribuye: distribuye,
            distribuidor: distribuidor,
            comentario: comentarios,
            fecha: new Date(fecha),
            "productos.0.P_nombre": "Red Bull",
            "productos.0.P_precio": pr0,
            "productos.1.P_nombre": "Rush",
            "productos.1.P_precio": pr1,
            "productos.2.P_nombre": "Ciclon 500 ML",
            "productos.2.P_precio": pr2,
            "productos.3.P_nombre": "Black",
            "productos.3.P_precio": pr3,
            "productos.4.P_nombre": "Monster",
            "productos.4.P_precio": pr4,
            "materiales.0.N_material": "Cooler",
            "materiales.0.L_material": col,
            "materiales.1.N_material": "Visibility",
            "materiales.1.L_material": vi,
            usuario:"Usuario"
        }
    }
    },function (err){})
}
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()){
        return next();}

    // if they aren't redirect them to the home page
    res.sendfile('views/login.html');
}