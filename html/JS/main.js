if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i)){
    document.getElementsByClassName("mainheadermenu")[0].style.display = "none"
}
$("main").load("dash.html",function(){
    console.log("Cargado")
})

function cargar(carga){
    $("main").load(carga)
    document.getElementsByClassName("espera")[0].style.display = "flex";
    setTimeout(function(){
        document.getElementsByClassName("espera")[0].style.display = "none";
    },1000)
}