var distribuye,nombre_distribuidor,vende_frio,V_comentario;
var b_precios=[0,0,0,0,0];
var lista_cooler = [];
var lista_visibility = [];
var siguiente = document.getElementById("boton_encuesta");
distribuye = "si"
nombre_distribuidor = "D&M"
vende_frio = "si"
V_comentario = ""
siguiente.addEventListener("click",function(e){
    document.getElementById("pagina-1").style.display = "none";
    document.getElementById("pagina-2").style.display = "flex";
    console.log(lista_visibility)
})
document.getElementById("imagen").addEventListener("change",function(e){
    document.getElementById("mensajes_foto").getElementsByTagName("span")[0].innerHTML = "Imagen Lista";
    document.getElementById("botones_foto").getElementsByTagName("button")[0].style.display = "none";
    document.getElementById("botones_foto").getElementsByTagName("button")[1].style.display = "block";
    document.getElementById("contenedor_camara").style.display = "none";
    document.getElementById("uploadok").style.display = "flex";
    var file = e.target.files[0]; 
    console.log(file);
})