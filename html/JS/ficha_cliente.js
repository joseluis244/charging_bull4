document.getElementsByClassName("nav_item")[0].style.borderBottomColor = "#ff1744";
$(".nav_item").click(function(){
    $(".nav_item").css("border-bottom-color","#031e3c");
    $(this).css("border-bottom-color","#ff1744");
    var selector = $(this).html();
    $("main .ventana").hide();
    $("#"+selector).show();
})
function nueva_encuesta(){
    document.location.href = "./encuesta.html"
}
$("#Galeria").load("./galeria.html")