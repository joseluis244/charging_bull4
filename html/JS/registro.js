var CLI_ID = "";
var CLI_nombre = "";
var DIRECCION = "";
var CONTACTO = "";
var NUMERO_CONTACTO = "";
var ciudad = "Santa Cruz";
var tipo = "Licoreria";
var GPS = [];
function guardarciudad(este){
    ciudad = este.value;
}
function guardartipo(este){
    tipo = este.value;
}
function guardarID(este){
    CLI_ID = este.value;
}
function guardarNOMBRE(este){
    CLI_nombre = este.value;
}
function guardarDIRECCION(este){
    DIRECCION = este.value;
}
function guardarCONTACTO(este){
    CONTACTO = este.value;
}
function guardarNUMERO_CONTACTO(este){
    NUMERO_CONTACTO = este.value;
}
function guardar_servidor(){
    if (CLI_nombre != "" && DIRECCION != "" && tipo != "" && CONTACTO != "" && NUMERO_CONTACTO != "") {
        var envio = [CLI_ID, CLI_nombre, DIRECCION, ciudad, tipo, CONTACTO, NUMERO_CONTACTO, GPS];
        $.post("/registro",{datos:envio.toString()},function(data){
            window.location.href = "/encuesta?clid="+data;
        })
    }
    else{
        document.getElementById("mensaje_estado").innerHTML = "Faltan datos"
    }
}
navigator.geolocation.getCurrentPosition(function(Position){
    GPS[0] = Position.coords.latitude;
    GPS[1] = Position.coords.longitude;
    console.log(GPS);
    document.getElementById("loader").style.display = "none";
    document.getElementById("mensaje_estado").innerHTML = "Posicion GPS Guardada";
    document.getElementsByClassName("mensajes")[0].style.display ="block";
    document.getElementById("reg_cli").disabled = false;
},function(error){
    if(error.code == 1){
        document.getElementsByClassName("bloqueo")[0].style.display = "flex";
    }
})