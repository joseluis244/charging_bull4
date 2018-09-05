document.getElementsByClassName("nav_item")[0].style.borderBottomColor = "#ff1744";
$(".nav_item").click(function(){
    $(".nav_item").css("border-bottom-color","#3f51b5");
    $(this).css("border-bottom-color","#ff1744");
    var selector = $(this).html();
    $("main .ventana").hide();
    $("#"+selector).show();
})