const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/RB2', {useNewUrlParser: true});
const clientes = require('./models/clientes');

clientes.findById("5cd98e3cfa4652bd28ef36ff",{vitacora:1},(err,cli)=>{
    let Vid = cli.vitacora[cli.vitacora.length-1]._id
    clientes.updateOne({ _id: '5cd98e3cfa4652bd28ef36ff', "vitacora._id": Vid },
        {
            $set: {
                "vitacora.$": {
                    GPS: [],
                    fecha: new Date(),
                    usuario: "Stringggggggggggg",
                    distribuye: true,
                    distribuidor: "String",
                    materiales: [{
                        N_material: "String",
                        L_material: ["String"]
                    }],
                    productos: [{
                        P_nombre: "String",
                        P_precio: "String"
                    }],
                    share: {
                        redbull: "String",
                        otro: "String"
                    },
                    comentario: "String",
                }
            }
        }, (err) => { })

})
