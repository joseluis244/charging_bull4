const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const multer = require('multer');
const leerclientes = require('./funciones/leerclientes');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const usuario = require('./models/usuarios');
const cookieParser =require('cookie-parser');
const session = require('express-session');
const xls = require('./xlsx3');
const json2xls      = require('json2xls');
const clientes = require('./models/clientes');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../charging_bull3/uploads')
    }
  })
const upload = multer({storage:storage});
const fs = require('fs');
const nuevocliente = require('./nuevocliente');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(json2xls.middleware);






mongoose.connect('mongodb://localhost:27017/RB2', {useNewUrlParser: true});



passport.use('local',new LocalStrategy(
    (username, password, done)=>{
        usuario.findOne({ "username":username, "password":password,"estado":{ $gte: 2.0 } },(err,usuario)=>{
            if(!usuario){
                return done(null,false)
            }
            return done(null,usuario)
        })
    }
))

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    console.log(id)
    User.findById(id, function(err, user) {
        done(err, user);
    });
});





var dashboard;
const das = require('./dashboard');
das.precios((e)=>{
    dashboard = e;
})

app.get('/app/lista/completa',(req,res)=>{
    let busqueda;
    if(user!='adm'){
        busqueda = { "ciudad": "Santa Cruz", "ultima_visita": { $exists: true }, $or: [ { "distribuye": true }, { "distribuye": false } ] }
    }
    else{
        busqueda = { "ultima_visita": { $exists: true }, $or: [ { "distribuye": true }, { "distribuye": false } ] }
    }
    clientes.find(busqueda,{ "nombre": 1, "direccion": 1, "ultima_visita": 1},{sort:{ "ultima_visita": -1}})
    .then((cli)=>{
        res.send(cli);
    })
});

app.get('/app/listacompleta', async (req, res) => {
    let usr = req.user
    if (usr.tipo === 'adm') {
        let clientes = await leerclientes.leercompleta();
        res.send(clientes);
    }
    else {
        let clientes = await leerclientes.leercompletausr(usr.ciudad);
        res.send(clientes);
    }
})

app.get('/app/lista/parcial',(req,res)=>{
    let busqueda;
    if(user!='adm'){
        busqueda = { "ciudad": "Santa Cruz", "ultima_visita": { $exists: true }, $or: [ { "distribuye": true }, { "distribuye": false } ] }
    }
    else{
        busqueda = { "ultima_visita": { $exists: true }, $or: [ { "distribuye": true }, { "distribuye": false } ]}
    }
    clientes.find(busqueda,{ "nombre": 1, "direccion": 1, "ultima_visita": 1},{sort:{ "ultima_visita": -1},limit:30})
    .then((cli)=>{
        res.send(cli);
    })
});

app.get('/app/dasboard',(req,res)=>{
    res.send(dashboard);
});

app.get('/app/cliente/:id',async (req,res)=>{
    let id = req.param('id');
    let cli = await clientes.findById(id)
    res.send(cli)
})

app.get('/app/listafotos/:id',async (req,res)=>{
    console.log(req.params)
})
app.get('/app/isauth',(req,res)=>{
    if(req.user===undefined){
        res.send({estatus:false,usuario:null})
    }
    else{
        res.send({estatus:true,usuario:req.user})
    }
    //res.send(req.user)
})
app.get('/app/correcto',(req,res)=>{
    res.send({estatus:true,usuario:req.user})
})
app.get('/app/incorrecto',(req,res)=>{
    res.send({estatus:false,usuario:null})
})
app.get('/app/logout',(req,res)=>{
    req.session.destroy();
    res.send(true)
})

app.get("/app/download",(req,res)=>{
    xls.crearxls(function(xls){
        var date = new Date();
        var date2 = date.toLocaleDateString("en-US").toString();
        date2 = date2.split("/");
        date2 = date2[2]+date2[1]+date2[0];
        res.xls(date2+".xlsx",xls);
    });
})


app.post('/app/login',passport.authenticate('local',{
        successRedirect: '/app/correcto',
        failureRedirect: '/app/incorrecto',
    }
    )
)


app.post('/app/registro',async (req,res)=>{
    let id_ncli = nuevocliente.nuevocliente(req.body)
    das.precios((e)=>{
        dashboard = e;
    })
    res.send(id_ncli)
})
app.post('/app/upload',upload.any(),(req,res)=>{
    let estado = JSON.parse(req.body.data);
    fs.renameSync(req.files[0].path,req.files[0].path+'.jpg');
    estado.fotofinal = req.files[0].filename+'.jpg';
    nuevocliente.agregarvisita(estado,req.user.nombre,true);
    res.send('listo')
})
app.post('/app/sinfoto',upload.any(),(req,res)=>{
    nuevocliente.agregarvisita(req.body,req.user.nombre,false);
    res.send('listo')
})
app.post('/app/guardarcorreccion',async (req,res)=>{
    //console.log(req.body)
    nuevocliente.corregirvisita(req.body,req.user.nombre)
    res.send('listo')
})
app.listen(PORT, function(){
    console.log('Server is running on Port: ',PORT);
  });