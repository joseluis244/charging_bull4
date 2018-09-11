if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i)){
    document.getElementsByClassName("mainheadermenu")[0].style.display = "none"
}
$("main").load("dash.html",function(){
    console.log("Cargado")
})