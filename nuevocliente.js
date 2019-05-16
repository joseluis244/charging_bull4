const clientes = require('./models/clientes.js');

function nuevocliente(cli) {
    let cliente = {}
    cliente.GPS = [cli.posicion.lat,cli.posicion.lng]
    cliente.tipo = cli.tipocl
    cliente.nombre = cli.Nomcliente
    cliente.cli_id = cli.IDcliente
    cliente.direccion = cli.Direccion
    cliente.ciudad = cli.ciudad
    cliente.contacto = [{C_nombre:cli.Connombre,C_dato:cli.contelefono}]
    let nuevo = new clientes(cliente);
    nuevo.save((err,nuevo)=>{})
    return (nuevo['_id']);
}
function agregarvisita(estado,usuario,foto){
    let db = {materiales:[],productos:[]}
    let id = estado.clid;
    db.distribuye = estado.distribuye[1];
    db.distribuidor = estado.distribuidor!=="Otro"?estado.distribuidor:estado.otrodistribuidor;
    db.comentario = estado.comentarios;
    db.frio = estado.frio[1];
    db.ultima_visita = estado.fecha;
    db.materiales[0] = {N_material:'Cooler',L_material:estado.cooler};
    db.materiales[1] = {N_material:'Visibility',L_material:estado.visibility};
    db.productos[0] = {P_nombre:'Red Bull',P_precio:estado.precios[0]>-1?estado.precios[0]:parseFloat(estado.otroprecio[0])};
    db.productos[1] = {P_nombre:'Rush',P_precio:estado.precios[1]>-1?estado.precios[1]:parseFloat(estado.otroprecio[1])};
    db.productos[2] = {P_nombre:'Ciclon 500 ML',P_precio:estado.precios[2]>-1?estado.precios[2]:parseFloat(estado.otroprecio[2])};
    db.productos[3] = {P_nombre:'Black',P_precio:estado.precios[3]>-1?estado.precios[3]:parseFloat(estado.otroprecio[3])};
    db.productos[4] = {P_nombre:'Monster',P_precio:estado.precios[4]>-1?estado.precios[4]:parseFloat(estado.otroprecio[4])};
    db.productos[5] = {P_nombre:'',P_precio:null};
    db.share = {redbull:estado.share[0],otro:estado.share[1]}
    let bitacora = {
        GPS:estado.GPS,
        fecha:estado.fecha,
        distribuye:estado.distribuye[1],
        distribuidor:db.distribuidor,
        materiales:db.materiales,
        productos:db.productos,
        comentario:db.comentario,
        share:db.share,
        usuario:usuario
    }
    clientes.updateOne({_id:id},db,(err)=>{})
    if(foto===true){
        let fotos = {fecha:estado.fecha,nombre:estado.fotofinal}
        clientes.updateOne({_id:id},{$push:{fotos:fotos}},(err)=>{})
    }
    clientes.updateOne({_id:id},{$push:{vitacora:bitacora}},(err)=>{})
}

function corregirvisita(estado,usuario){
    let db = {materiales:[],productos:[]}
    let id = estado.clid;
    db.distribuye = estado.distribuye[1];
    db.distribuidor = estado.distribuidor!=="Otro"?estado.distribuidor:estado.otrodistribuidor;
    db.comentario = estado.comentarios;
    db.frio = estado.frio[1];
    db.ultima_visita = estado.fecha;
    db.materiales[0] = {N_material:'Cooler',L_material:estado.cooler};
    db.materiales[1] = {N_material:'Visibility',L_material:estado.visibility};
    db.productos[0] = {P_nombre:'Red Bull',P_precio:estado.precios[0]>-1?estado.precios[0]:parseFloat(estado.otroprecio[0])};
    db.productos[1] = {P_nombre:'Rush',P_precio:estado.precios[1]>-1?estado.precios[1]:parseFloat(estado.otroprecio[1])};
    db.productos[2] = {P_nombre:'Ciclon 500 ML',P_precio:estado.precios[2]>-1?estado.precios[2]:parseFloat(estado.otroprecio[2])};
    db.productos[3] = {P_nombre:'Black',P_precio:estado.precios[3]>-1?estado.precios[3]:parseFloat(estado.otroprecio[3])};
    db.productos[4] = {P_nombre:'Monster',P_precio:estado.precios[4]>-1?estado.precios[4]:parseFloat(estado.otroprecio[4])};
    db.productos[5] = {P_nombre:'',P_precio:null};
    db.share = {redbull:estado.share[0],otro:estado.share[1]}
    let bitacora = {
        GPS:estado.GPS,
        fecha:estado.fecha,
        distribuye:estado.distribuye[1],
        distribuidor:db.distribuidor,
        materiales:db.materiales,
        productos:db.productos,
        comentario:db.comentario,
        share:db.share,
        usuario:usuario
    }
    
    clientes.updateOne({_id:id},db,(err)=>{})
    clientes.findById(id,{vitacora:1},(err,cli)=>{
        let Vid = cli.vitacora[cli.vitacora.length-1]._id
        clientes.updateOne({_id:id,"vitacora._id":Vid},{$set:{"vitacora.$":bitacora}},(err)=>{})
    })
    
}
module.exports.nuevocliente = nuevocliente;
module.exports.agregarvisita = agregarvisita;
module.exports.corregirvisita = corregirvisita;