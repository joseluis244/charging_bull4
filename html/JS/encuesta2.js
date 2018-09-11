var distribuye,nombre_distribuidor,vende_frio,V_comentario;
var b_precios=[0,0,0,0,0];
var lista_cooler = [];
var lista_visibility = [];
var siguiente = document.getElementById("boton_encuesta");
var img = new Image();
var img_tar = new Image();
var fr = new FileReader();
var GPS = [];
distribuye = "si"
nombre_distribuidor = "D&M"
vende_frio = "si"
V_comentario = ""
siguiente.addEventListener("click",function(e){
    document.getElementById("pagina-1").style.display = "none";
    document.getElementById("pagina-2").style.display = "flex";
})
document.getElementById("imagen").addEventListener("change",function(e){
    document.getElementById("mensajes_foto").getElementsByTagName("span")[0].innerHTML = "Imagen Lista";
    document.getElementById("botones_foto").getElementsByTagName("button")[0].style.display = "none";
    document.getElementById("botones_foto").getElementsByTagName("button")[1].style.display = "block";
    document.getElementById("contenedor_camara").style.display = "none";
    document.getElementById("uploadok").style.display = "flex";
    var file = e.target.files[0];
    fr.readAsDataURL(file);
    fr.onload = function () {
        img.src = fr.result;
        setTimeout(function () {
            //img_tar.src = jic.compress(img, calidad, formato).src;
        }, 1000)
    }
})
navigator.geolocation.getCurrentPosition(function(Position){
    GPS[0] = Position.coords.latitude;
    GPS[1] = Position.coords.longitude;
    GPS[2] = Position.coords.accuracy;
})