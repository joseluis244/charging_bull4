if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i)){
    document.getElementsByClassName("mainheadermenu")[0].style.display = "none"
}
inicio();
function inicio() {
    document.getElementsByTagName("main")[0].style.display = "none";
    $("main").load("dash.html", function () {
        console.log("Cargado")
    })
    setTimeout(function () {
        document.getElementsByTagName("main")[0].style.display = "inline-block";
        document.getElementsByClassName("espera")[0].style.display = "none";
    }, 2000)
}
function cargar(carga){
    $("main").load(carga)
    document.getElementsByClassName("espera")[0].style.display = "flex";
    setTimeout(function(){
        document.getElementsByClassName("espera")[0].style.display = "none";
    },1000)
}
