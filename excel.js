//const express = require("express");
const Excel = require('exceljs');
//const mongoose = require("mongoose");
//mongoose.connect("mongodb://127.0.0.1/RB2");

const clientes =require('./models/clientes');

//const app = express();


var D_tabla_comlpeta = function (callback) {
    var nombre = new Date()
    nombre = nombre.getTime();
    const workbook = new Excel.Workbook();
    const sheet = workbook.addWorksheet('Completo');
    sheet.columns = [
        { header: 'Id', key: 'id', width: 10 },
        { header: 'Nombre', key: 'nombre', width: 20 },
        { header: 'Ciudad', key: 'ciu', width: 20 },
        { header: 'Direccion', key: 'dir', width: 60 },
        { header: 'Tipo', key: 'tipo', width: 20 },
        { header: 'Distribuye', key: 'dist', width: 10 },
        { header: 'Distribuidor', key: 'distri', width: 20 },
        { header: 'Fecha', key: 'fecha', width: 20 },
        { header: 'Precios', key: 'precios', width: 10 },
        { header: 'Red Bull', key: 'pr1', width: 10 },
        { header: 'Rush', key: 'pr2', width: 10 },
        { header: 'Ciclon', key: 'pr3', width: 10 },
        { header: 'Black', key: 'pr4', width: 10 },
        { header: 'Monster', key: 'pr5', width: 10 },
        { header: 'Coolers', key: 'coolers', width: 10 },
        { header: 'Propio', key: 'coo1', width: 15 },
        { header: 'Baby Cooler', key: 'coo2', width: 15 },
        { header: 'Slim Cooler', key: 'coo3', width: 15 },
        { header: 'Can Cooler', key: 'coo4', width: 15 },
        { header: 'Equipo de la competencia', key: 'coo5', width: 20 },
        { header: 'Fast Lane Open', key: 'coo6', width: 15 },
        { header: 'Small Open Front', key: 'coo7', width: 15 },
        { header: 'Mega Glass Door', key: 'coo8', width: 15 },
        { header: 'Slim Fast Lane', key: 'coo9', width: 15 },
        { header: 'Refuel Cooler', key: 'coo10', width: 15 },
        { header: 'Visibility', key: 'visi', width: 10 },
        { header: 'Colgante', key: 'vis1', width: 15 },
        { header: 'Sticker de lata', key: 'vis2', width: 15 },
        { header: 'Marca Precio', key: 'vis3', width: 15 },
        { header: 'Cartoon', key: 'vis4', width: 15 },
        { header: 'Lata Aluminio', key: 'vis5', width: 15 },
        { header: 'Sticky shlef', key: 'vis6', width: 15 },
        { header: 'Carrileras', key: 'vis7', width: 15 },
        { header: 'Two Cans', key: 'vis8', width: 15 },
        { header: 'Parasite SC', key: 'vis9', width: 15 },
        { header: 'Parasite 4Pack', key: 'vis10', width: 15 },
        { header: 'Dispensador Lata', key: 'vis11', width: 15 },
        { header: 'Rack', key: 'vis12', width: 15 },
        { header: 'Caras', key: 'cara', width: 10 },
        { header: 'Red Bull', key: 'Crb', width: 10 },
        { header: 'Otros', key: 'Cot', width: 10 },
        { header: 'Comentarios', key: 'comen', width: 60 },
    ];
    clientes.find({ $or: [{ "distribuye": true }, { "distribuye": false }] }, { "frio": 0, "__v": 0, "contacto": 0, "GPS": 0 }, function (err, cli) {
        for (i = 0; i <= cli.length - 1; i++) {
            let id = cli[i].cli_id;
            let nombre = cli[i].nombre;
            let ciudad = cli[i].ciudad;
            let direccion = cli[i].direccion;
            let tipo = cli[i].tipo;
            //let comen = cli[i].comentario;
            for (j = 0; j <= cli[i].vitacora.length - 1; j++) {
                let distribuye = (cli[i].vitacora[j].distribuye == true ? "Si" : "No");
                let distribuidor = cli[i].vitacora[j].distribuidor;
                let fecha = cli[i].vitacora[j].fecha;
                let precios = [cli[i].vitacora[j].productos[0].P_precio, cli[i].vitacora[j].productos[1].P_precio, cli[i].vitacora[j].productos[2].P_precio, cli[i].vitacora[j].productos[3].P_precio, cli[i].vitacora[j].productos[4].P_precio]
                let cooler = cli[i].vitacora[j].materiales[0].L_material;
                let vis = cli[i].vitacora[j].materiales[1].L_material;
                let caras = [cli[i].vitacora[j].share.redbull, cli[i].vitacora[j].share.otro];
                let comen = cli[i].vitacora[j].comentario;
                //console.log(caras)
                sheet.addRow({
                    id: id,
                    nombre: nombre,
                    ciu: ciudad,
                    dir: direccion,
                    tipo: tipo,
                    dist: distribuye,
                    distri: distribuidor,
                    fecha: fecha,
                    precios: "",
                    pr1: precios[0] > 0 ? parseFloat(precios[0]) : 0,
                    pr2: precios[1] > 0 ? parseFloat(precios[1]) : 0,
                    pr3: precios[2] > 0 ? parseFloat(precios[2]) : 0,
                    pr4: precios[3] > 0 ? parseFloat(precios[3]) : 0,
                    pr5: precios[4] > 0 ? parseFloat(precios[4]) : 0,
                    coolers: "",
                    coo1: (cooler.indexOf("Propio") > -1) ? "Si" : "No",
                    coo2: (cooler.indexOf("Baby Cooler") > -1) ? "Si" : "No",
                    coo3: (cooler.indexOf("Slim Cooler") > -1) ? "Si" : "No",
                    coo4: (cooler.indexOf("Can Cooler") > -1) ? "Si" : "No",
                    coo5: (cooler.indexOf("Equipo de la competencia") > -1) ? "Si" : "No",
                    coo6: (cooler.indexOf("Fast Lane Open") > -1) ? "Si" : "No",
                    coo7: (cooler.indexOf("Small Open Front") > -1) ? "Si" : "No",
                    coo8: (cooler.indexOf("Mega Glass Door") > -1) ? "Si" : "No",
                    coo9: (cooler.indexOf("Slim Fast Lane") > -1) ? "Si" : "No",
                    coo10: (cooler.indexOf("Refuel Cooler") > -1) ? "Si" : "No",
                    visi: "",
                    vis1: (vis.indexOf("Colgante") > -1) ? "Si" : "No",
                    vis2: (vis.indexOf("Sticker de lata") > -1) ? "Si" : "No",
                    vis3: (vis.indexOf("Marca Precio") > -1) ? "Si" : "No",
                    vis4: (vis.indexOf("Cartoon") > -1) ? "Si" : "No",
                    vis5: (vis.indexOf("Lata Aluminio") > -1) ? "Si" : "No",
                    vis6: (vis.indexOf("Sticky shlef") > -1) ? "Si" : "No",
                    vis7: (vis.indexOf("Carrileras") > -1) ? "Si" : "No",
                    vis8: (vis.indexOf("Two Cans") > -1) ? "Si" : "No",
                    vis9: (vis.indexOf("Parasite SC") > -1) ? "Si" : "No",
                    vis10: (vis.indexOf("Parasite 4Pack") > -1) ? "Si" : "No",
                    vis11: (vis.indexOf("Dispensador Lata") > -1) ? "Si" : "No",
                    vis12: (vis.indexOf("Rack") > -1) ? "Si" : "No",
                    cara: "",
                    Crb: caras[0] > 0 ? parseInt(caras[0]) : "No",
                    Cot: caras[1] > 0 ? parseInt(caras[1]) : "No",
                    comen: comen
                });
            }
        }
        workbook.xlsx.writeFile("./TEMP/"+nombre+".xlsx");
        callback(nombre);
    })
}
var D_tabla_reqguion = function (callback) {
    var nombre = new Date()
    nombre = nombre.getTime();
    const workbook = new Excel.Workbook();
    const sheet = workbook.addWorksheet('Santa Cruz');
    const sheet2 = workbook.addWorksheet('La Paz');
    sheet.columns = [
        { header: 'Id', key: 'id', width: 10 },
        { header: 'Nombre', key: 'nombre', width: 20 },
        { header: 'Ciudad', key: 'ciu', width: 20 },
        { header: 'Direccion', key: 'dir', width: 60 },
        { header: 'Tipo', key: 'tipo', width: 20 },
        { header: 'Distribuye', key: 'dist', width: 10 },
        { header: 'Distribuidor', key: 'distri', width: 20 },
        { header: 'Fecha', key: 'fecha', width: 20 },
        { header: 'Precios', key: 'precios', width: 10 },
        { header: 'Red Bull', key: 'pr1', width: 10 },
        { header: 'Rush', key: 'pr2', width: 10 },
        { header: 'Ciclon', key: 'pr3', width: 10 },
        { header: 'Black', key: 'pr4', width: 10 },
        { header: 'Monster', key: 'pr5', width: 10 },
        { header: 'Coolers', key: 'coolers', width: 10 },
        { header: 'Propio', key: 'coo1', width: 15 },
        { header: 'Baby Cooler', key: 'coo2', width: 15 },
        { header: 'Slim Cooler', key: 'coo3', width: 15 },
        { header: 'Can Cooler', key: 'coo4', width: 15 },
        { header: 'Equipo de la competencia', key: 'coo5', width: 20 },
        { header: 'Fast Lane Open', key: 'coo6', width: 15 },
        { header: 'Small Open Front', key: 'coo7', width: 15 },
        { header: 'Mega Glass Door', key: 'coo8', width: 15 },
        { header: 'Slim Fast Lane', key: 'coo9', width: 15 },
        { header: 'Refuel Cooler', key: 'coo10', width: 15 },
        { header: 'Visibility', key: 'visi', width: 10 },
        { header: 'Colgante', key: 'vis1', width: 15 },
        { header: 'Sticker de lata', key: 'vis2', width: 15 },
        { header: 'Marca Precio', key: 'vis3', width: 15 },
        { header: 'Cartoon', key: 'vis4', width: 15 },
        { header: 'Lata Aluminio', key: 'vis5', width: 15 },
        { header: 'Sticky shlef', key: 'vis6', width: 15 },
        { header: 'Carrileras', key: 'vis7', width: 15 },
        { header: 'Two Cans', key: 'vis8', width: 15 },
        { header: 'Parasite SC', key: 'vis9', width: 15 },
        { header: 'Parasite 4Pack', key: 'vis10', width: 15 },
        { header: 'Dispensador Lata', key: 'vis11', width: 15 },
        { header: 'Rack', key: 'vis12', width: 15 },
        { header: 'Caras', key: 'cara', width: 10 },
        { header: 'Red Bull', key: 'Crb', width: 10 },
        { header: 'Otros', key: 'Cot', width: 10 },
        { header: 'Comentarios', key: 'comen', width: 60 },
    ];
    sheet2.columns = [
        { header: 'Id', key: 'id', width: 10 },
        { header: 'Nombre', key: 'nombre', width: 20 },
        { header: 'Ciudad', key: 'ciu', width: 20 },
        { header: 'Direccion', key: 'dir', width: 60 },
        { header: 'Tipo', key: 'tipo', width: 20 },
        { header: 'Distribuye', key: 'dist', width: 10 },
        { header: 'Distribuidor', key: 'distri', width: 20 },
        { header: 'Fecha', key: 'fecha', width: 20 },
        { header: 'Precios', key: 'precios', width: 10 },
        { header: 'Red Bull', key: 'pr1', width: 10 },
        { header: 'Rush', key: 'pr2', width: 10 },
        { header: 'Ciclon', key: 'pr3', width: 10 },
        { header: 'Black', key: 'pr4', width: 10 },
        { header: 'Monster', key: 'pr5', width: 10 },
        { header: 'Coolers', key: 'coolers', width: 10 },
        { header: 'Propio', key: 'coo1', width: 15 },
        { header: 'Baby Cooler', key: 'coo2', width: 15 },
        { header: 'Slim Cooler', key: 'coo3', width: 15 },
        { header: 'Can Cooler', key: 'coo4', width: 15 },
        { header: 'Equipo de la competencia', key: 'coo5', width: 20 },
        { header: 'Fast Lane Open', key: 'coo6', width: 15 },
        { header: 'Small Open Front', key: 'coo7', width: 15 },
        { header: 'Mega Glass Door', key: 'coo8', width: 15 },
        { header: 'Slim Fast Lane', key: 'coo9', width: 15 },
        { header: 'Refuel Cooler', key: 'coo10', width: 15 },
        { header: 'Visibility', key: 'visi', width: 10 },
        { header: 'Colgante', key: 'vis1', width: 15 },
        { header: 'Sticker de lata', key: 'vis2', width: 15 },
        { header: 'Marca Precio', key: 'vis3', width: 15 },
        { header: 'Cartoon', key: 'vis4', width: 15 },
        { header: 'Lata Aluminio', key: 'vis5', width: 15 },
        { header: 'Sticky shlef', key: 'vis6', width: 15 },
        { header: 'Carrileras', key: 'vis7', width: 15 },
        { header: 'Two Cans', key: 'vis8', width: 15 },
        { header: 'Parasite SC', key: 'vis9', width: 15 },
        { header: 'Parasite 4Pack', key: 'vis10', width: 15 },
        { header: 'Dispensador Lata', key: 'vis11', width: 15 },
        { header: 'Rack', key: 'vis12', width: 15 },
        { header: 'Caras', key: 'cara', width: 10 },
        { header: 'Red Bull', key: 'Crb', width: 10 },
        { header: 'Otros', key: 'Cot', width: 10 },
        { header: 'Comentarios', key: 'comen', width: 60 },
    ];
    clientes.find({ $or: [{ "distribuye": true }, { "distribuye": false }] }, { "frio": 0, "__v": 0, "contacto": 0, "GPS": 0 },{sort:{ "ciudad": -1}}, function (err, cli) {
        for (i = 0; i <= cli.length - 1; i++) {
            let id = cli[i].cli_id;
            let nombre = cli[i].nombre;
            let ciudad = cli[i].ciudad;
            let direccion = cli[i].direccion;
            let tipo = cli[i].tipo;
            //let comen = cli[i].comentario;
            for (j = 0; j <= cli[i].vitacora.length - 1; j++) {
                let distribuye = (cli[i].vitacora[j].distribuye == true ? "Si" : "No");
                let distribuidor = cli[i].vitacora[j].distribuidor;
                let fecha = cli[i].vitacora[j].fecha;
                let precios = [cli[i].vitacora[j].productos[0].P_precio, cli[i].vitacora[j].productos[1].P_precio, cli[i].vitacora[j].productos[2].P_precio, cli[i].vitacora[j].productos[3].P_precio, cli[i].vitacora[j].productos[4].P_precio]
                let cooler = cli[i].vitacora[j].materiales[0].L_material;
                let vis = cli[i].vitacora[j].materiales[1].L_material;
                let caras = [cli[i].vitacora[j].share.redbull, cli[i].vitacora[j].share.otro];
                let comen = cli[i].vitacora[j].comentario;
                //console.log(caras)
                if(cli[i].ciudad == "Santa Cruz"){
                    sheet.addRow({
                        id: id,
                        nombre: nombre,
                        ciu: ciudad,
                        dir: direccion,
                        tipo: tipo,
                        dist: distribuye,
                        distri: distribuidor,
                        fecha: fecha,
                        precios: "",
                        pr1: precios[0] > 0 ? parseFloat(precios[0]) : 0,
                        pr2: precios[1] > 0 ? parseFloat(precios[1]) : 0,
                        pr3: precios[2] > 0 ? parseFloat(precios[2]) : 0,
                        pr4: precios[3] > 0 ? parseFloat(precios[3]) : 0,
                        pr5: precios[4] > 0 ? parseFloat(precios[4]) : 0,
                        coolers: "",
                        coo1: (cooler.indexOf("Propio") > -1) ? "Si" : "No",
                        coo2: (cooler.indexOf("Baby Cooler") > -1) ? "Si" : "No",
                        coo3: (cooler.indexOf("Slim Cooler") > -1) ? "Si" : "No",
                        coo4: (cooler.indexOf("Can Cooler") > -1) ? "Si" : "No",
                        coo5: (cooler.indexOf("Equipo de la competencia") > -1) ? "Si" : "No",
                        coo6: (cooler.indexOf("Fast Lane Open") > -1) ? "Si" : "No",
                        coo7: (cooler.indexOf("Small Open Front") > -1) ? "Si" : "No",
                        coo8: (cooler.indexOf("Mega Glass Door") > -1) ? "Si" : "No",
                        coo9: (cooler.indexOf("Slim Fast Lane") > -1) ? "Si" : "No",
                        coo10: (cooler.indexOf("Refuel Cooler") > -1) ? "Si" : "No",
                        visi: "",
                        vis1: (vis.indexOf("Colgante") > -1) ? "Si" : "No",
                        vis2: (vis.indexOf("Sticker de lata") > -1) ? "Si" : "No",
                        vis3: (vis.indexOf("Marca Precio") > -1) ? "Si" : "No",
                        vis4: (vis.indexOf("Cartoon") > -1) ? "Si" : "No",
                        vis5: (vis.indexOf("Lata Aluminio") > -1) ? "Si" : "No",
                        vis6: (vis.indexOf("Sticky shlef") > -1) ? "Si" : "No",
                        vis7: (vis.indexOf("Carrileras") > -1) ? "Si" : "No",
                        vis8: (vis.indexOf("Two Cans") > -1) ? "Si" : "No",
                        vis9: (vis.indexOf("Parasite SC") > -1) ? "Si" : "No",
                        vis10: (vis.indexOf("Parasite 4Pack") > -1) ? "Si" : "No",
                        vis11: (vis.indexOf("Dispensador Lata") > -1) ? "Si" : "No",
                        vis12: (vis.indexOf("Rack") > -1) ? "Si" : "No",
                        cara: "",
                        Crb: caras[0] > 0 ? parseInt(caras[0]) : "No",
                        Cot: caras[1] > 0 ? parseInt(caras[1]) : "No",
                        comen: comen
                    });
                }
                else{
                    sheet2.addRow({
                        id: id,
                        nombre: nombre,
                        ciu: ciudad,
                        dir: direccion,
                        tipo: tipo,
                        dist: distribuye,
                        distri: distribuidor,
                        fecha: fecha,
                        precios: "",
                        pr1: precios[0] > 0 ? parseFloat(precios[0]) : 0,
                        pr2: precios[1] > 0 ? parseFloat(precios[1]) : 0,
                        pr3: precios[2] > 0 ? parseFloat(precios[2]) : 0,
                        pr4: precios[3] > 0 ? parseFloat(precios[3]) : 0,
                        pr5: precios[4] > 0 ? parseFloat(precios[4]) : 0,
                        coolers: "",
                        coo1: (cooler.indexOf("Propio") > -1) ? "Si" : "No",
                        coo2: (cooler.indexOf("Baby Cooler") > -1) ? "Si" : "No",
                        coo3: (cooler.indexOf("Slim Cooler") > -1) ? "Si" : "No",
                        coo4: (cooler.indexOf("Can Cooler") > -1) ? "Si" : "No",
                        coo5: (cooler.indexOf("Equipo de la competencia") > -1) ? "Si" : "No",
                        coo6: (cooler.indexOf("Fast Lane Open") > -1) ? "Si" : "No",
                        coo7: (cooler.indexOf("Small Open Front") > -1) ? "Si" : "No",
                        coo8: (cooler.indexOf("Mega Glass Door") > -1) ? "Si" : "No",
                        coo9: (cooler.indexOf("Slim Fast Lane") > -1) ? "Si" : "No",
                        coo10: (cooler.indexOf("Refuel Cooler") > -1) ? "Si" : "No",
                        visi: "",
                        vis1: (vis.indexOf("Colgante") > -1) ? "Si" : "No",
                        vis2: (vis.indexOf("Sticker de lata") > -1) ? "Si" : "No",
                        vis3: (vis.indexOf("Marca Precio") > -1) ? "Si" : "No",
                        vis4: (vis.indexOf("Cartoon") > -1) ? "Si" : "No",
                        vis5: (vis.indexOf("Lata Aluminio") > -1) ? "Si" : "No",
                        vis6: (vis.indexOf("Sticky shlef") > -1) ? "Si" : "No",
                        vis7: (vis.indexOf("Carrileras") > -1) ? "Si" : "No",
                        vis8: (vis.indexOf("Two Cans") > -1) ? "Si" : "No",
                        vis9: (vis.indexOf("Parasite SC") > -1) ? "Si" : "No",
                        vis10: (vis.indexOf("Parasite 4Pack") > -1) ? "Si" : "No",
                        vis11: (vis.indexOf("Dispensador Lata") > -1) ? "Si" : "No",
                        vis12: (vis.indexOf("Rack") > -1) ? "Si" : "No",
                        cara: "",
                        Crb: caras[0] > 0 ? parseInt(caras[0]) : "No",
                        Cot: caras[1] > 0 ? parseInt(caras[1]) : "No",
                        comen: comen
                    });
                }
            }
        }
        workbook.xlsx.writeFile("./TEMP/"+nombre+".xlsx");
        callback(nombre);
    })
}
var D_tabla_mes = function (callback) {
    var nombre = new Date()
    nombre = nombre.getTime();
    const workbook = new Excel.Workbook();
    const sheet = workbook.addWorksheet('Santa Cruz');
    const sheet2 = workbook.addWorksheet('La Paz');
    sheet.columns = [
        { header: 'Id', key: 'id', width: 10 },
        { header: 'Nombre', key: 'nombre', width: 20 },
        { header: 'Ciudad', key: 'ciu', width: 20 },
        { header: 'Direccion', key: 'dir', width: 60 },
        { header: 'Tipo', key: 'tipo', width: 20 },
        { header: 'Distribuye', key: 'dist', width: 10 },
        { header: 'Distribuidor', key: 'distri', width: 20 },
        { header: 'Fecha', key: 'fecha', width: 20 },
        { header: 'Precios', key: 'precios', width: 10 },
        { header: 'Red Bull', key: 'pr1', width: 10 },
        { header: 'Rush', key: 'pr2', width: 10 },
        { header: 'Ciclon', key: 'pr3', width: 10 },
        { header: 'Black', key: 'pr4', width: 10 },
        { header: 'Monster', key: 'pr5', width: 10 },
        { header: 'Coolers', key: 'coolers', width: 10 },
        { header: 'Propio', key: 'coo1', width: 15 },
        { header: 'Baby Cooler', key: 'coo2', width: 15 },
        { header: 'Slim Cooler', key: 'coo3', width: 15 },
        { header: 'Can Cooler', key: 'coo4', width: 15 },
        { header: 'Equipo de la competencia', key: 'coo5', width: 20 },
        { header: 'Fast Lane Open', key: 'coo6', width: 15 },
        { header: 'Small Open Front', key: 'coo7', width: 15 },
        { header: 'Mega Glass Door', key: 'coo8', width: 15 },
        { header: 'Slim Fast Lane', key: 'coo9', width: 15 },
        { header: 'Refuel Cooler', key: 'coo10', width: 15 },
        { header: 'Visibility', key: 'visi', width: 10 },
        { header: 'Colgante', key: 'vis1', width: 15 },
        { header: 'Sticker de lata', key: 'vis2', width: 15 },
        { header: 'Marca Precio', key: 'vis3', width: 15 },
        { header: 'Cartoon', key: 'vis4', width: 15 },
        { header: 'Lata Aluminio', key: 'vis5', width: 15 },
        { header: 'Sticky shlef', key: 'vis6', width: 15 },
        { header: 'Carrileras', key: 'vis7', width: 15 },
        { header: 'Two Cans', key: 'vis8', width: 15 },
        { header: 'Parasite SC', key: 'vis9', width: 15 },
        { header: 'Parasite 4Pack', key: 'vis10', width: 15 },
        { header: 'Dispensador Lata', key: 'vis11', width: 15 },
        { header: 'Rack', key: 'vis12', width: 15 },
        { header: 'Caras', key: 'cara', width: 10 },
        { header: 'Red Bull', key: 'Crb', width: 10 },
        { header: 'Otros', key: 'Cot', width: 10 },
        { header: 'Comentarios', key: 'comen', width: 60 },
    ];
    sheet2.columns = [
        { header: 'Id', key: 'id', width: 10 },
        { header: 'Nombre', key: 'nombre', width: 20 },
        { header: 'Ciudad', key: 'ciu', width: 20 },
        { header: 'Direccion', key: 'dir', width: 60 },
        { header: 'Tipo', key: 'tipo', width: 20 },
        { header: 'Distribuye', key: 'dist', width: 10 },
        { header: 'Distribuidor', key: 'distri', width: 20 },
        { header: 'Fecha', key: 'fecha', width: 20 },
        { header: 'Precios', key: 'precios', width: 10 },
        { header: 'Red Bull', key: 'pr1', width: 10 },
        { header: 'Rush', key: 'pr2', width: 10 },
        { header: 'Ciclon', key: 'pr3', width: 10 },
        { header: 'Black', key: 'pr4', width: 10 },
        { header: 'Monster', key: 'pr5', width: 10 },
        { header: 'Coolers', key: 'coolers', width: 10 },
        { header: 'Propio', key: 'coo1', width: 15 },
        { header: 'Baby Cooler', key: 'coo2', width: 15 },
        { header: 'Slim Cooler', key: 'coo3', width: 15 },
        { header: 'Can Cooler', key: 'coo4', width: 15 },
        { header: 'Equipo de la competencia', key: 'coo5', width: 20 },
        { header: 'Fast Lane Open', key: 'coo6', width: 15 },
        { header: 'Small Open Front', key: 'coo7', width: 15 },
        { header: 'Mega Glass Door', key: 'coo8', width: 15 },
        { header: 'Slim Fast Lane', key: 'coo9', width: 15 },
        { header: 'Refuel Cooler', key: 'coo10', width: 15 },
        { header: 'Visibility', key: 'visi', width: 10 },
        { header: 'Colgante', key: 'vis1', width: 15 },
        { header: 'Sticker de lata', key: 'vis2', width: 15 },
        { header: 'Marca Precio', key: 'vis3', width: 15 },
        { header: 'Cartoon', key: 'vis4', width: 15 },
        { header: 'Lata Aluminio', key: 'vis5', width: 15 },
        { header: 'Sticky shlef', key: 'vis6', width: 15 },
        { header: 'Carrileras', key: 'vis7', width: 15 },
        { header: 'Two Cans', key: 'vis8', width: 15 },
        { header: 'Parasite SC', key: 'vis9', width: 15 },
        { header: 'Parasite 4Pack', key: 'vis10', width: 15 },
        { header: 'Dispensador Lata', key: 'vis11', width: 15 },
        { header: 'Rack', key: 'vis12', width: 15 },
        { header: 'Caras', key: 'cara', width: 10 },
        { header: 'Red Bull', key: 'Crb', width: 10 },
        { header: 'Otros', key: 'Cot', width: 10 },
        { header: 'Comentarios', key: 'comen', width: 60 },
    ];
    let fecha1 = new Date();
    let year = fecha1.getFullYear();
    let mes = fecha1.getMonth();
    let fechaI = new Date(year,mes,1);
    let fechaF = new Date(year,mes,31);
    clientes.find({ $or: [ { "distribuye": true }, { "distribuye": false } ], "ultima_visita": { $gte: fechaI, $lte: fechaF } }, { "frio": 0, "__v": 0, "contacto": 0, "GPS": 0 },{sort:{ "ciudad": -1, "ultima_visita": 1}}, function (err, cli) {
        for (i = 0; i <= cli.length - 1; i++) {
            let id = cli[i].cli_id;
            let nombre = cli[i].nombre;
            let ciudad = cli[i].ciudad;
            let direccion = cli[i].direccion;
            let tipo = cli[i].tipo;
            let comen = cli[i].comentario;
            //
            let distribuye = (cli[i].distribuye == true ? "Si" : "No");
            let distribuidor = cli[i].distribuidor;
            let fecha = cli[i].ultima_visita;
            let precios = [cli[i].productos[0].P_precio, cli[i].productos[1].P_precio, cli[i].productos[2].P_precio, cli[i].productos[3].P_precio, cli[i].productos[4].P_precio]
            let cooler = cli[i].materiales[0].L_material;
            let vis = cli[i].materiales[1].L_material;
            let caras = [cli[i].share.redbull, cli[i].share.otro];
            if(cli[i].ciudad == "Santa Cruz"){
                sheet.addRow({
                    id: id,
                    nombre: nombre,
                    ciu: ciudad,
                    dir: direccion,
                    tipo: tipo,
                    dist: distribuye,
                    distri: distribuidor,
                    fecha: fecha,
                    precios: "",
                    pr1: precios[0] > 0 ? parseFloat(precios[0]) : 0,
                    pr2: precios[1] > 0 ? parseFloat(precios[1]) : 0,
                    pr3: precios[2] > 0 ? parseFloat(precios[2]) : 0,
                    pr4: precios[3] > 0 ? parseFloat(precios[3]) : 0,
                    pr5: precios[4] > 0 ? parseFloat(precios[4]) : 0,
                    coolers: "",
                    coo1: (cooler.indexOf("Propio") > -1) ? "Si" : "No",
                    coo2: (cooler.indexOf("Baby Cooler") > -1) ? "Si" : "No",
                    coo3: (cooler.indexOf("Slim Cooler") > -1) ? "Si" : "No",
                    coo4: (cooler.indexOf("Can Cooler") > -1) ? "Si" : "No",
                    coo5: (cooler.indexOf("Equipo de la competencia") > -1) ? "Si" : "No",
                    coo6: (cooler.indexOf("Fast Lane Open") > -1) ? "Si" : "No",
                    coo7: (cooler.indexOf("Small Open Front") > -1) ? "Si" : "No",
                    coo8: (cooler.indexOf("Mega Glass Door") > -1) ? "Si" : "No",
                    coo9: (cooler.indexOf("Slim Fast Lane") > -1) ? "Si" : "No",
                    coo10: (cooler.indexOf("Refuel Cooler") > -1) ? "Si" : "No",
                    visi: "",
                    vis1: (vis.indexOf("Colgante") > -1) ? "Si" : "No",
                    vis2: (vis.indexOf("Sticker de lata") > -1) ? "Si" : "No",
                    vis3: (vis.indexOf("Marca Precio") > -1) ? "Si" : "No",
                    vis4: (vis.indexOf("Cartoon") > -1) ? "Si" : "No",
                    vis5: (vis.indexOf("Lata Aluminio") > -1) ? "Si" : "No",
                    vis6: (vis.indexOf("Sticky shlef") > -1) ? "Si" : "No",
                    vis7: (vis.indexOf("Carrileras") > -1) ? "Si" : "No",
                    vis8: (vis.indexOf("Two Cans") > -1) ? "Si" : "No",
                    vis9: (vis.indexOf("Parasite SC") > -1) ? "Si" : "No",
                    vis10: (vis.indexOf("Parasite 4Pack") > -1) ? "Si" : "No",
                    vis11: (vis.indexOf("Dispensador Lata") > -1) ? "Si" : "No",
                    vis12: (vis.indexOf("Rack") > -1) ? "Si" : "No",
                    cara: "",
                    Crb: caras[0] > 0 ? parseInt(caras[0]) : "No",
                    Cot: caras[1] > 0 ? parseInt(caras[1]) : "No",
                    comen: comen
                });
            }
            else{
                sheet2.addRow({
                    id: id,
                    nombre: nombre,
                    ciu: ciudad,
                    dir: direccion,
                    tipo: tipo,
                    dist: distribuye,
                    distri: distribuidor,
                    fecha: fecha,
                    precios: "",
                    pr1: precios[0] > 0 ? parseFloat(precios[0]) : 0,
                    pr2: precios[1] > 0 ? parseFloat(precios[1]) : 0,
                    pr3: precios[2] > 0 ? parseFloat(precios[2]) : 0,
                    pr4: precios[3] > 0 ? parseFloat(precios[3]) : 0,
                    pr5: precios[4] > 0 ? parseFloat(precios[4]) : 0,
                    coolers: "",
                    coo1: (cooler.indexOf("Propio") > -1) ? "Si" : "No",
                    coo2: (cooler.indexOf("Baby Cooler") > -1) ? "Si" : "No",
                    coo3: (cooler.indexOf("Slim Cooler") > -1) ? "Si" : "No",
                    coo4: (cooler.indexOf("Can Cooler") > -1) ? "Si" : "No",
                    coo5: (cooler.indexOf("Equipo de la competencia") > -1) ? "Si" : "No",
                    coo6: (cooler.indexOf("Fast Lane Open") > -1) ? "Si" : "No",
                    coo7: (cooler.indexOf("Small Open Front") > -1) ? "Si" : "No",
                    coo8: (cooler.indexOf("Mega Glass Door") > -1) ? "Si" : "No",
                    coo9: (cooler.indexOf("Slim Fast Lane") > -1) ? "Si" : "No",
                    coo10: (cooler.indexOf("Refuel Cooler") > -1) ? "Si" : "No",
                    visi: "",
                    vis1: (vis.indexOf("Colgante") > -1) ? "Si" : "No",
                    vis2: (vis.indexOf("Sticker de lata") > -1) ? "Si" : "No",
                    vis3: (vis.indexOf("Marca Precio") > -1) ? "Si" : "No",
                    vis4: (vis.indexOf("Cartoon") > -1) ? "Si" : "No",
                    vis5: (vis.indexOf("Lata Aluminio") > -1) ? "Si" : "No",
                    vis6: (vis.indexOf("Sticky shlef") > -1) ? "Si" : "No",
                    vis7: (vis.indexOf("Carrileras") > -1) ? "Si" : "No",
                    vis8: (vis.indexOf("Two Cans") > -1) ? "Si" : "No",
                    vis9: (vis.indexOf("Parasite SC") > -1) ? "Si" : "No",
                    vis10: (vis.indexOf("Parasite 4Pack") > -1) ? "Si" : "No",
                    vis11: (vis.indexOf("Dispensador Lata") > -1) ? "Si" : "No",
                    vis12: (vis.indexOf("Rack") > -1) ? "Si" : "No",
                    cara: "",
                    Crb: caras[0] > 0 ? parseInt(caras[0]) : "No",
                    Cot: caras[1] > 0 ? parseInt(caras[1]) : "No",
                    comen: comen
                });
            }
            //
        }
        workbook.xlsx.writeFile("./TEMP/"+nombre+".xlsx");
        callback(nombre);
    })
}
module.exports.D_tabla_comlpeta = D_tabla_comlpeta;
module.exports.D_tabla_reqguion = D_tabla_reqguion;
module.exports.D_tabla_mes = D_tabla_mes;

/*app.get("/a",function(req,res){
    D_tabla(function(e){
        setTimeout(function(){
            res.download("./TEMP/"+e+".xlsx")
        },1000);
        
    })
})
app.listen(4000);*/