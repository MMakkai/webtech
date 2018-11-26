var automobiletemplate=`
<table class="cartable">
    <tr class="firstline">
        <td>$(name)</td>
    </tr>
    <tr>
        <td>Manufacturer</td>
        <td>$(manufacturer)</td>
    </tr>
    <tr>
        <td>Consumption</td>
        <td>$(consumption)</td>
    </tr>
    <tr>
        <td>Color</td>
        <td>$(color)</td>
    </tr>
    <tr>
        <td>Available</td>
        <td>$(available)</td>
    </tr>
    <tr>
        <td>Horsepower</td>
        <td>$(horsepower)</td>
    </tr>
`;

function pastetable(template,data){
    var generatedtable=template;
    for(var key in data){
        console.log(data);
        var count= template.split(key).length;
        for(var i=0;i<count;i++)
            {generatedtable = generatedtable.replace("$("+key+")",data[key])}


    }
    return generatedtable;
}
function getcars(){
    $("#cont1").empty();
    $.get('/cars',function(cardata){
        for(var car of cardata){
            $("#cont1").append(pastetable(automobiletemplate,car));
        }
    })
}
function init(){
    getcars();
    $('#carform').submit(function (eh){ //eventhandler
        eh.preventDefault();
        $.ajax({
            url:'/addCar',
            type:'post',
            data:$('#carForm').serialize(),
            success:function () {
                $("input[type=text],textarea").val("");
                $("input[type=number],textarea").val("");
                refreshCars();
            },
            error: function (e) {
                alert("Car exists already.")
            }
        })
    })
}