GPS = [];
function buscar(filtro){
    var elementos = document.getElementById("lista_clientes").getElementsByTagName("li");
    for(i=0; i<=elementos.length-1;i++){
        var filtrado = elementos[i].getElementsByTagName("span")[0].innerHTML.toUpperCase();
        if(filtrado.indexOf(filtro.toUpperCase())>-1){
            elementos[i].style.display = "";
        }
        else{
            elementos[i].style.display = "none";
        }
        
    }
}
function buscar_alrededor_fun(){
    var btn = document.getElementsByClassName("buscar_alrededor")[0].getElementsByTagName("button")[0].getElementsByTagName("i")[0];
    btn.innerHTML = "gps_fixed";
    navigator.geolocation.getCurrentPosition(function(Position){
        GPS[0] = Position.coords.latitude;
        GPS[1] = Position.coords.longitude;
        $.post("/listaGPS",{lat:GPS[0],lng:GPS[1]},function(data){
            $("#Lista_clientes").html(data);
            document.getElementsByClassName("espera")[0].style.display = "none";
        })
    })
    document.getElementsByClassName("espera")[0].style.display = "flex";
}
function vercliente(este){
    location.href = "./ficha_cliente.html"
}