jQuery(document).ready(function () {
    $("#content").load("html/front.html");
    $("#homebutton").click(function () {
        $("#content").load("html/front.html");
    });
    $("#automobilebutton").click(function () {
        $("#content").load("html/car.html",function(){init();});
    });
    $("#companybutton").click(function () {
        $("#content").load("html/manuf.html",function(){initm();});
    });
});